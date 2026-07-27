insert into public.site_settings (setting_key, value_boolean)
values ('events_coming_soon_enabled', true)
on conflict (setting_key) do nothing;
