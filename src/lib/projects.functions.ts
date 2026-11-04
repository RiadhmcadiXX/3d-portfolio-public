import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { isCategory, slugify, type Project, type ProjectInput } from "./project-types";

const BUCKET = "project-images";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type Row = Database["public"]["Tables"]["projects"]["Row"];
const toProject = (r: Row) => r as unknown as Project;

// Images are stored as paths in a private bucket; swap them for signed URLs on read.
async function withImageUrls(client: SupabaseClient<Database>, list: Project[]) {
  const paths = new Set<string>();
  const add = (v?: string | null) => { if (v && !/^https?:/.test(v)) paths.add(v); };
  for (const p of list) {
    add(p.cover_image_url);
    p.features.forEach((f) => add(f.image));
    add(p.mobile_app?.image);
    p.gallery.forEach((g) => add(g.image));
  }
  if (!paths.size) return list;
  const { data } = await client.storage.from(BUCKET).createSignedUrls([...paths], 60 * 60 * 24);
  const map = new Map((data ?? []).map((d) => [d.path ?? "", d.signedUrl]));
  const url = (v?: string | null) => (v && map.get(v)) || v || null;
  return list.map((p) => ({
    ...p,
    cover_image_url: url(p.cover_image_url),
    features: p.features.map((f) => ({ ...f, image: url(f.image) })),
    mobile_app: p.mobile_app ? { ...p.mobile_app, image: url(p.mobile_app.image) } : null,
    gallery: p.gallery.map((g) => ({ ...g, image: url(g.image) ?? g.image })),
  }));
}

/* ---------- Public (only rows marked public are ever returned) ---------- */

export const listPublicProjects = createServerFn({ method: "GET" })
  .inputValidator((d: { category?: string } | undefined) => d ?? {})
  .handler(async ({ data }) => {
    const sb = publicClient();
    let q = sb.from("projects").select("*").eq("is_public", true).order("sort_order").order("year", { ascending: false });
    if (data.category) q = q.eq("category", data.category);
    const { data: rows, error } = await q;
    if (error) throw new Error("Could not load projects");
    return withImageUrls(sb, rows.map(toProject));
  });

export const getPublicProject = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: rows, error } = await sb.from("projects").select("*").eq("is_public", true).order("sort_order");
    if (error) throw new Error("Could not load project");
    const list = rows.map(toProject);
    const idx = list.findIndex((p) => p.slug === data.slug);
    if (idx < 0) return null;
    const [project] = await withImageUrls(sb, [list[idx]!]);
    const next = list.length > 1 ? list[(idx + 1) % list.length]! : null;
    return { project: project!, next: next ? { slug: next.slug, name: next.name } : null };
  });

/* ---------- Admin (row security only lets admins write or see private rows) ---------- */

export const getMyRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isAdmin: !!data };
  });

export const adminListProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("projects").select("*").order("sort_order").order("year", { ascending: false });
    if (error) throw new Error(error.message);
    return withImageUrls(context.supabase, data.map(toProject));
  });

export const adminGetProject = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase.from("projects").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    const raw = toProject(row);
    const [signed] = await withImageUrls(context.supabase, [raw]);
    return { raw, signed: signed! };
  });

function clean(p: ProjectInput): ProjectInput {
  if (!p.name.trim()) throw new Error("Name is required");
  if (!isCategory(p.category)) throw new Error("Unknown category");
  const slug = slugify(p.slug || p.name);
  if (!slug) throw new Error("Slug is required");
  const list = (a: string[]) => a.map((s) => s.trim()).filter(Boolean);
  return {
    ...p,
    slug,
    name: p.name.trim(),
    link: p.link?.trim() || null,
    tags: list(p.tags),
    tech_stack: list(p.tech_stack),
    stats: p.stats.filter((s) => s.label.trim() || s.value.trim()),
    features: p.features.filter((f) => f.title.trim()),
    gallery: p.gallery.filter((g) => g.image),
    mobile_app: p.mobile_app ? { ...p.mobile_app, platforms: list(p.mobile_app.platforms) } : null,
    sort_order: Number(p.sort_order) || 0,
  };
}

export const adminSaveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id?: string; project: ProjectInput }) => d)
  .handler(async ({ data, context }) => {
    const row = clean(data.project) as unknown as Database["public"]["Tables"]["projects"]["Insert"];
    const q = data.id
      ? context.supabase.from("projects").update(row).eq("id", data.id).select("id").single()
      : context.supabase.from("projects").insert(row).select("id").single();
    const { data: saved, error } = await q;
    if (error) throw new Error(error.code === "23505" ? "Another project already uses this slug" : error.message);
    return { id: saved.id };
  });

export const adminSetVisibility = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; is_public: boolean }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").update({ is_public: data.is_public }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
