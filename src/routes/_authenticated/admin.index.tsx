import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminGate";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { adminDeleteProject, adminListProjects, adminSetVisibility } from "@/lib/projects.functions";
import { CATEGORIES } from "@/lib/project-types";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Projects admin — Riadh M Cadi Studio" }, { name: "robots", content: "noindex" }] }),
  component: AdminList,
});

function AdminList() {
  const qc = useQueryClient();
  const list = useQuery({ queryKey: ["admin-projects"], queryFn: () => adminListProjects() });
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-projects"] }); qc.invalidateQueries({ queryKey: ["projects"] }); };
  const vis = useMutation({
    mutationFn: (v: { id: string; is_public: boolean }) => adminSetVisibility({ data: v }),
    onSuccess: (_, v) => { toast.success(v.is_public ? "Now public" : "Now private"); refresh(); },
    onError: (e) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => adminDeleteProject({ data: { id } }),
    onSuccess: () => { toast.success("Project deleted"); refresh(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminShell title="Projects">
      <div className="flex justify-end mb-4">
        <Button asChild><Link to="/admin/$id" params={{ id: "new" }}>+ New project</Link></Button>
      </div>
      {list.isLoading && <p className="text-muted-foreground">Loading…</p>}
      {list.error && <p className="text-destructive">{list.error.message}</p>}
      <div className="grid gap-3">
        {list.data?.map((p) => (
          <div key={p.id} className="admin-row">
            <div className="admin-row__thumb">{p.cover_image_url ? <img src={p.cover_image_url} alt="" /> : p.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.name}</p>
              <p className="text-sm text-muted-foreground truncate">{CATEGORIES[p.category]?.title} · {p.year} · /{p.slug}</p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={p.is_public} onCheckedChange={(v) => vis.mutate({ id: p.id, is_public: v })} />
              {p.is_public ? "Public" : "Private"}
            </label>
            <Button size="sm" variant="outline" asChild><Link to="/admin/$id" params={{ id: p.id }}>Edit</Link></Button>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button size="sm" variant="ghost" className="text-destructive">Delete</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {p.name}?</AlertDialogTitle>
                  <AlertDialogDescription>This removes the project for good. Make it private instead if you may want it back.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => del.mutate(p.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
