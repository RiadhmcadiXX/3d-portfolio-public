import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { adminGetProject, adminSaveProject } from "@/lib/projects.functions";
import { CATEGORIES, emptyProject, slugify, type Category, type ProjectInput } from "@/lib/project-types";

export const Route = createFileRoute("/_authenticated/admin/$id")({
  head: () => ({ meta: [{ title: "Edit project — Alex Morgan Studio" }, { name: "robots", content: "noindex" }] }),
  component: EditorPage,
});

type Previews = Record<string, string>;

function EditorPage() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const q = useQuery({ queryKey: ["admin-project", id], queryFn: () => adminGetProject({ data: { id } }), enabled: !isNew });

  return (
    <AdminShell title={isNew ? "New project" : q.data?.raw.name ?? "Edit project"}>
      {isNew ? (
        <Editor initial={emptyProject()} previews={{}} />
      ) : q.isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : !q.data ? (
        <p>Project not found. <Link to="/admin" className="underline">Back</Link></p>
      ) : (
        <Editor id={id} initial={q.data.raw} previews={buildPreviews(q.data.raw, q.data.signed)} />
      )}
    </AdminShell>
  );
}

function buildPreviews(raw: ProjectInput, signed: ProjectInput): Previews {
  const m: Previews = {};
  const pair = (a?: string | null, b?: string | null) => { if (a && b) m[a] = b; };
  pair(raw.cover_image_url, signed.cover_image_url);
  raw.features.forEach((f, i) => pair(f.image, signed.features[i]?.image));
  pair(raw.mobile_app?.image, signed.mobile_app?.image);
  raw.gallery.forEach((g, i) => pair(g.image, signed.gallery[i]?.image));
  return m;
}

function Editor({ id, initial, previews: initialPreviews }: { id?: string; initial: ProjectInput; previews: Previews }) {
  const [p, setP] = useState<ProjectInput>(initial);
  const [previews, setPreviews] = useState<Previews>(initialPreviews);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) => setP((s) => ({ ...s, [k]: v }));
  const ctx = { previews, addPreview: (path: string, url: string) => setPreviews((s) => ({ ...s, [path]: url })) };

  async function save() {
    setSaving(true);
    try {
      const res = await adminSaveProject({ data: { id, project: p } });
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["admin-project", res.id] });
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
      if (!id) navigate({ to: "/admin/$id", params: { id: res.id }, replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="admin-savebar">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Switch checked={p.is_public} onCheckedChange={(v) => set("is_public", v)} />
          {p.is_public ? "Public — visible to everyone" : "Private — only you can see it"}
        </label>
        <div className="flex gap-2">
          {id && p.is_public && <Button variant="outline" asChild><a href={`/projects/${p.slug}`} target="_blank" rel="noreferrer">View page ↗</a></Button>}
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </div>
      </div>

      <Card title="Basics">
        <Grid>
          <Field label="Name"><Input value={p.name} onChange={(e) => { set("name", e.target.value); if (!slugTouched) set("slug", slugify(e.target.value)); }} /></Field>
          <Field label="Web address (slug)" hint={`/projects/${p.slug || "…"}`}><Input value={p.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} /></Field>
          <Field label="Category">
            <Select value={p.category} onValueChange={(v) => set("category", v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{Object.entries(CATEGORIES).map(([k, c]) => <SelectItem key={k} value={k}>{c.title}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Year"><Input value={p.year} onChange={(e) => set("year", e.target.value)} /></Field>
          <Field label="Your role"><Input value={p.role} onChange={(e) => set("role", e.target.value)} /></Field>
          <Field label="Status" hint="e.g. Live, In development"><Input value={p.status} onChange={(e) => set("status", e.target.value)} /></Field>
          <Field label="Website link"><Input type="url" placeholder="https://" value={p.link ?? ""} onChange={(e) => set("link", e.target.value)} /></Field>
          <Field label="Order" hint="Lower numbers show first"><Input type="number" value={p.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} /></Field>
        </Grid>
        <Field label="Tags" hint="Comma separated"><ListInput value={p.tags} onChange={(v) => set("tags", v)} /></Field>
        <Field label="Short summary" hint="Shown on project cards"><Textarea rows={2} value={p.summary} onChange={(e) => set("summary", e.target.value)} /></Field>
        <Field label="Cover image"><ImageField value={p.cover_image_url} onChange={(v) => set("cover_image_url", v)} {...ctx} /></Field>
      </Card>

      <Card title="Story">
        <Field label="Overview"><Textarea rows={4} value={p.overview} onChange={(e) => set("overview", e.target.value)} /></Field>
        <Grid>
          <Field label="The problem"><Textarea rows={4} value={p.problem} onChange={(e) => set("problem", e.target.value)} /></Field>
          <Field label="The solution"><Textarea rows={4} value={p.solution} onChange={(e) => set("solution", e.target.value)} /></Field>
        </Grid>
        <Field label="How it works (architecture)"><Textarea rows={4} value={p.architecture} onChange={(e) => set("architecture", e.target.value)} /></Field>
        <Field label="Tech stack" hint="Comma separated"><ListInput value={p.tech_stack} onChange={(v) => set("tech_stack", v)} /></Field>
      </Card>

      <Card title="Key numbers">
        {p.stats.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input placeholder="Value (e.g. 12k)" value={s.value} onChange={(e) => set("stats", p.stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} />
            <Input placeholder="Label (e.g. Users)" value={s.label} onChange={(e) => set("stats", p.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
            <Button variant="ghost" onClick={() => set("stats", p.stats.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => set("stats", [...p.stats, { label: "", value: "" }])}>+ Add number</Button>
      </Card>

      <Card title="Features">
        {p.features.map((f, i) => (
          <div key={i} className="admin-sub">
            <Grid>
              <div className="grid gap-2">
                <Input placeholder="Feature title" value={f.title} onChange={(e) => set("features", p.features.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                <Textarea rows={3} placeholder="Description" value={f.description} onChange={(e) => set("features", p.features.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} />
              </div>
              <ImageField value={f.image ?? null} onChange={(v) => set("features", p.features.map((x, j) => j === i ? { ...x, image: v } : x))} {...ctx} />
            </Grid>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => set("features", move(p.features, i, -1))}>↑</Button>
              <Button size="sm" variant="ghost" disabled={i === p.features.length - 1} onClick={() => set("features", move(p.features, i, 1))}>↓</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => set("features", p.features.filter((_, j) => j !== i))}>Remove</Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => set("features", [...p.features, { title: "", description: "", image: null }])}>+ Add feature</Button>
      </Card>

      <Card title="Mobile companion app">
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={!!p.mobile_app} onCheckedChange={(v) => set("mobile_app", v ? { title: "Mobile companion app", description: "", platforms: ["iOS", "Android"], image: null } : null)} />
          This project has a mobile app
        </label>
        {p.mobile_app && (
          <Grid>
            <div className="grid gap-2">
              <Input placeholder="Title" value={p.mobile_app.title} onChange={(e) => set("mobile_app", { ...p.mobile_app!, title: e.target.value })} />
              <Textarea rows={3} placeholder="Description" value={p.mobile_app.description} onChange={(e) => set("mobile_app", { ...p.mobile_app!, description: e.target.value })} />
              <ListInput placeholder="Platforms, e.g. iOS, Android" value={p.mobile_app.platforms} onChange={(v) => set("mobile_app", { ...p.mobile_app!, platforms: v })} />
            </div>
            <ImageField value={p.mobile_app.image ?? null} onChange={(v) => set("mobile_app", { ...p.mobile_app!, image: v })} {...ctx} />
          </Grid>
        )}
      </Card>

      <Card title="Gallery">
        <div className="admin-gallery">
          {p.gallery.map((g, i) => (
            <div key={i} className="grid gap-2">
              <ImageField value={g.image} onChange={(v) => set("gallery", v ? p.gallery.map((x, j) => j === i ? { ...x, image: v } : x) : p.gallery.filter((_, j) => j !== i))} {...ctx} />
              <Input placeholder="Caption" value={g.caption ?? ""} onChange={(e) => set("gallery", p.gallery.map((x, j) => j === i ? { ...x, caption: e.target.value } : x))} />
            </div>
          ))}
        </div>
        <UploadButton label="+ Add images" multiple onUploaded={(items) => { items.forEach((it) => ctx.addPreview(it.path, it.url)); set("gallery", [...p.gallery, ...items.map((it) => ({ image: it.path }))]); }} />
      </Card>

      <div className="flex justify-end"><Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save project"}</Button></div>
    </div>
  );
}

function move<T>(a: T[], i: number, d: number) {
  const b = [...a];
  const [x] = b.splice(i, 1);
  b.splice(i + d, 0, x!);
  return b;
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return <section className="admin-card grid gap-4"><h2 className="font-semibold text-lg">{title}</h2>{children}</section>;
}
function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}
function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}{hint && <span className="ml-2 font-normal text-muted-foreground">{hint}</span>}</Label>
      {children}
    </div>
  );
}
function ListInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [text, setText] = useState(value.join(", "));
  useEffect(() => { setText(value.join(", ")); }, [value.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps
  return <Input placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} onBlur={() => onChange(text.split(",").map((s) => s.trim()).filter(Boolean))} />;
}

async function uploadFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-images").upload(path, file, { contentType: file.type });
  if (error) throw error;
  return { path, url: URL.createObjectURL(file) };
}

function UploadButton({ label, multiple, onUploaded }: { label: string; multiple?: boolean; onUploaded: (items: { path: string; url: string }[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" multiple={multiple} hidden onChange={async (e) => {
        const files = [...(e.target.files ?? [])];
        e.target.value = "";
        if (!files.length) return;
        setBusy(true);
        try { onUploaded(await Promise.all(files.map(uploadFile))); }
        catch (err) { toast.error(err instanceof Error ? err.message : "Upload failed"); }
        finally { setBusy(false); }
      }} />
      <Button type="button" variant="outline" disabled={busy} onClick={() => ref.current?.click()}>{busy ? "Uploading…" : label}</Button>
    </>
  );
}

function ImageField({ value, onChange, previews, addPreview }: { value: string | null; onChange: (v: string | null) => void; previews: Previews; addPreview: (p: string, u: string) => void }) {
  const src = value ? previews[value] ?? (/^https?:/.test(value) ? value : null) : null;
  return (
    <div className="grid gap-2">
      <div className="admin-image">{src ? <img src={src} alt="" /> : <span className="text-sm text-muted-foreground">No image</span>}</div>
      <div className="flex gap-2">
        <UploadButton label={value ? "Replace" : "Upload image"} onUploaded={([it]) => { if (it) { addPreview(it.path, it.url); onChange(it.path); } }} />
        {value && <Button type="button" variant="ghost" onClick={() => onChange(null)}>Remove</Button>}
      </div>
    </div>
  );
}
