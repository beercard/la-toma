create table if not exists public.site_settings (
  setting_key text primary key,
  value_boolean boolean not null default false,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings" on public.site_settings
  for select using (true);

drop policy if exists "auth full site settings" on public.site_settings;
create policy "auth full site settings" on public.site_settings
  for all to authenticated using (true) with check (true);

insert into public.site_settings (setting_key, value_boolean)
values ('gallery_coming_soon_enabled', true)
on conflict (setting_key) do nothing;
