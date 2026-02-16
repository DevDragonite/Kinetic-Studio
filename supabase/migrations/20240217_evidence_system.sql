-- Add evidence columns to job_cards
alter table job_cards 
add column before_photos text[] default '{}'::text[],
add column after_photos text[] default '{}'::text[];

-- Create Storage Bucket (if not exists - handled by Supabase Dashboard usually, but good to document)
insert into storage.buckets (id, name, public)
values ('evidence', 'evidence', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'evidence' );

create policy "Authenticated Upload"
on storage.objects for insert
with check ( bucket_id = 'evidence' and auth.role() = 'authenticated' );

create policy "Authenticated Update"
on storage.objects for update
using ( bucket_id = 'evidence' and auth.role() = 'authenticated' );
