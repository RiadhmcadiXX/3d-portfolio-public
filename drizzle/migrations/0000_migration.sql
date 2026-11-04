create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- The very first account created becomes the site admin.
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_first_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'software' check (category in ('software','apps','technical')),
  summary text not null default '',
  overview text not null default '',
  problem text not null default '',
  solution text not null default '',
  architecture text not null default '',
  year text not null default '',
  role text not null default '',
  status text not null default '',
  link text,
  cover_image_url text,
  tags text[] not null default '{}',
  tech_stack text[] not null default '{}',
  stats jsonb not null default '[]',
  features jsonb not null default '[]',
  mobile_app jsonb,
  gallery jsonb not null default '[]',
  is_public boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Anyone reads public projects" on public.projects for select to anon, authenticated using (is_public);
create policy "Admins read all projects" on public.projects for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert projects" on public.projects for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update projects" on public.projects for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete projects" on public.projects for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();

insert into public.projects (slug, name, category, summary, overview, year, role, status, link, tags, tech_stack, stats, features, mobile_app, is_public, sort_order) values
('allodoc','AlloDoc','software','Practice management software for medical and dental clinics.','AlloDoc brings patients, consultations, prescriptions, payments and inventory together in one calm workspace for clinics.','2024','Founder & lead developer','Live','https://www.allodoc-logiciel.com/', array['SaaS','Healthcare'], array['React','TypeScript','Node'],
 '[{"label":"Modules","value":"8"}]',
 '[{"title":"Patient records","description":"Full history for every patient in one place."},{"title":"Consultation workflow","description":"Guided steps from check-in to prescription."},{"title":"Prescriptions","description":"Printable prescriptions in seconds."},{"title":"Payments","description":"Track invoices and balances."}]',
 '{"title":"Mobile companion app","description":"Check appointments and patient info on the go.","platforms":["iOS","Android"]}', true, 0),
('atlas','Atlas','software','A real-time map dashboard for city transit teams.','Atlas turns thousands of live vehicle pings into a calm, readable map that dispatchers can act on in seconds.','2026','Lead front-end','Live',null, array['React','WebGL'], array['React','WebGL','TypeScript'], '[{"label":"Vehicles tracked","value":"4,200"},{"label":"Faster decisions","value":"38%"}]','[]',null,true,1),
('lumen','Lumen','software','An interactive 3D product configurator for a lighting brand.','Lumen lets shoppers place lamps in a room, change finishes and see the light fall in real time.','2025','Design & 3D','Live',null, array['Three.js','Blender'], array['Three.js','Blender','Shaders'], '[{"label":"Products","value":"60+"}]','[]',null,true,2),
('fieldnotes','Fieldnotes','apps','A writing app that keeps research, quotes and drafts together.','Fieldnotes is a quiet writing space with linked notes, offline sync and a focus mode.','2024','Full-stack','Live',null, array['Mobile','Writing'], array['React Native','Node'], '[{"label":"Writers","value":"12k"}]','[]',null,true,3),
('relay','Relay','technical','A self-hosted build and deploy cluster for a small studio.','Relay replaced a pile of scripts with a reliable, monitored deploy pipeline running on in-house servers.','2023','Infrastructure','Running',null, array['DevOps'], array['Linux','Docker','CI/CD'], '[{"label":"Deploys / week","value":"300+"}]','[]',null,true,4);

create policy "Public reads project images" on storage.objects for select using (bucket_id = 'project-images');
create policy "Admins upload project images" on storage.objects for insert to authenticated with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update project images" on storage.objects for update to authenticated using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete project images" on storage.objects for delete to authenticated using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));