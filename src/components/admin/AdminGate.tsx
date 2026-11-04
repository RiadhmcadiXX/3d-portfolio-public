import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getMyRole } from "@/lib/projects.functions";
import { Button } from "@/components/ui/button";

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const role = useQuery({ queryKey: ["my-role"], queryFn: () => getMyRole() });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <main className="page">
      <nav className="page-nav">
        <Link to="/admin" className="back-link">Studio admin</Link>
        <div className="flex items-center gap-3">
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">View public projects</Link>
          <Button size="sm" variant="outline" onClick={signOut}>Sign out</Button>
        </div>
      </nav>
      <div className="admin-wrap">
        <h1 className="pd-h2" style={{ fontSize: "2.6rem", marginBottom: "1.5rem" }}>{title}</h1>
        {role.isLoading ? (
          <p className="text-muted-foreground">Checking access…</p>
        ) : !role.data?.isAdmin ? (
          <div className="admin-card">
            <p>This account isn't an admin, so it can't edit projects.</p>
          </div>
        ) : (
          children
        )}
      </div>
    </main>
  );
}
