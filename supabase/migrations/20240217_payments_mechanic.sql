-- Create Payment Enums
create type payment_method as enum ('Pago_Movil', 'Zelle', 'Cash', 'Binance', 'Cashea');
create type payment_status as enum ('Pending', 'Verified', 'Rejected');
create type job_payment_status as enum ('Unpaid', 'Partial', 'Paid');

-- Create Payments Table
create table payments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  job_id uuid references job_cards(id) not null,
  amount numeric not null,
  currency text not null default 'USD', -- 'USD' or 'VES'
  method payment_method not null,
  reference text, -- Bank reference code
  status payment_status default 'Pending'::payment_status not null,
  proof_url text -- Screenshot of transfer
);

-- Update Job Cards with Payment Info
alter table job_cards 
add column total_amount numeric default 0,
add column paid_amount numeric default 0,
add column payment_status job_payment_status default 'Unpaid'::job_payment_status;

-- RLS for Payments
alter table payments enable row level security;

create policy "Enable read access for all users" on payments for select using (true);
create policy "Enable insert access for authenticated users" on payments for insert with check (auth.role() = 'authenticated');
create policy "Enable update access for authenticated users" on payments for update using (auth.role() = 'authenticated');
