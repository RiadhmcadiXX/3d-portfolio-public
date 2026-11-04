import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const safePath = (p: unknown) => (typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/admin");

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined }),
  head: () => ({
    meta: [
      { title: "Sign in — Alex Morgan Studio" },
      { name: "description", content: "Sign in to manage portfolio projects." },
      { property: "og:title", content: "Sign in — Alex Morgan Studio" },
      { property: "og:description", content: "Sign in to manage portfolio projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const target = safePath(redirect);
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (data.user) navigate({ to: target, replace: true }); });
    const { data } = supabase.auth.onAuthStateChange((e) => { if (e === "SIGNED_IN") navigate({ to: target, replace: true }); });
    return () => data.subscription.unsubscribe();
  }, [navigate, target]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/auth" } });
    setBusy(false);
    if (res.error) { toast.error(res.error.message); return; }
    if (mode === "up" && !res.data.session) toast.success("Check your email to confirm your account.");
  }

  async function google() {
    sessionStorage.setItem("after-auth", target);
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error(r.error.message);
  }

  return (
    <main className="page" style={{ display: "grid", placeItems: "center" }}>
      <form onSubmit={submit} className="admin-card" style={{ width: "min(26rem, 92vw)" }}>
        <p className="eyebrow">Studio admin</p>
        <h1 className="pd-h2" style={{ margin: "0.3rem 0 1.5rem" }}>{mode === "in" ? "Sign in" : "Create account"}</h1>
        <div className="grid gap-3">
          <div className="grid gap-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="grid gap-1.5"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button type="submit" disabled={busy}>{mode === "in" ? "Sign in" : "Sign up"}</Button>
          <Button type="button" variant="outline" onClick={google}>Continue with Google</Button>
          <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
            {mode === "in" ? "No account yet? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}
