-- Create Staff Table
create type staff_role as enum ('Owner', 'Admin', 'Mechanic');

create table staff (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text unique not null,
  phone text,
  role staff_role not null,
  active boolean default true
);

-- Create Inventory Table
create table inventory (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  brand text not null, -- Toyota, JAC, Generic
  sku text unique,
  description text,
  quantity integer default 0 not null,
  price numeric(10, 2) not null,
  min_stock integer default 5
);

-- Create Job Materials (Parts used in a job)
create table job_materials (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references job_cards(id) not null,
  inventory_id uuid references inventory(id) not null,
  quantity integer default 1 not null,
  price_at_moment numeric(10, 2) not null, -- Snapshot of price
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table staff enable row level security;
alter table inventory enable row level security;
alter table job_materials enable row level security;

create policy "Public Read Staff" on staff for select using (true); -- For "Meet the Team" sections if needed
create policy "Admin Manage Staff" on staff for all using (auth.role() = 'authenticated'); -- Simplified

create policy "Public Read Inventory" on inventory for select using (true);
create policy "Admin Manage Inventory" on inventory for all using (auth.role() = 'authenticated');

create policy "Read Job Materials" on job_materials for select using (true);
create policy "Manage Job Materials" on job_materials for all using (auth.role() = 'authenticated');
