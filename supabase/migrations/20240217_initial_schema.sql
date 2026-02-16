-- Create Enums
create type job_status as enum ('reception', 'diagnosis', 'approval', 'in_progress', 'quality_control', 'ready', 'delivered');
create type job_priority as enum ('Normal', 'High', 'Urgent');

-- Create Job Cards Table
create table job_cards (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  vehicle_brand text not null,
  vehicle_model text not null,
  license_plate text not null,
  client_name text not null,
  status job_status default 'reception'::job_status not null,
  priority job_priority default 'Normal'::job_priority not null
);

-- Enable RLS (Row Level Security)
alter table job_cards enable row level security;

-- Policies (Open for now, will secure later with Auth)
create policy "Enable read access for all users" on job_cards for select using (true);
create policy "Enable insert access for all users" on job_cards for insert with check (true);
create policy "Enable update access for all users" on job_cards for update using (true);
create policy "Enable delete access for all users" on job_cards for delete using (true);
