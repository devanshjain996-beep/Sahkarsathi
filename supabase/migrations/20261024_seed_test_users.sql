-- ==============================================================================
-- SAHKARSATHI TEST USERS & SKILLS SEED SCRIPT
-- Smart India Hackathon 2026 | Prototype Authentication & End-to-End Testing
-- ==============================================================================

-- 1. Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Clean up any previous test demo users if they exist
DELETE FROM auth.users WHERE email IN ('customer@sahkar.in', 'worker@sahkar.in', 'supervisor@sahkar.in');

-- 3. Insert confirmed test users into auth.users with standard passwords:
-- Customer:   customer@sahkar.in   / Customer@123 (UUID: 11111111-1111-1111-1111-111111111111)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, 
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'customer@sahkar.in',
  crypt('Customer@123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Rahul Sharma","role":"customer"}',
  now(), now()
);

-- Worker:     worker@sahkar.in     / Worker@123   (UUID: 22222222-2222-2222-2222-222222222222)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, 
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'worker@sahkar.in',
  crypt('Worker@123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Ramesh Kumar","role":"worker"}',
  now(), now()
);

-- Supervisor: supervisor@sahkar.in / Supervisor@123 (UUID: 33333333-3333-3333-3333-333333333333)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, 
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'supervisor@sahkar.in',
  crypt('Supervisor@123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Rohit Sharma","role":"supervisor"}',
  now(), now()
);

-- 4. Insert corresponding profiles
INSERT INTO public.profiles (id, full_name, role, phone, avatar_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Rahul Sharma', 'customer', '+91 98765 43210', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'),
  ('22222222-2222-2222-2222-222222222222', 'Ramesh Kumar', 'worker', '+91 98112 34567', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'),
  ('33333333-3333-3333-3333-333333333333', 'Rohit Sharma', 'supervisor', '+91 99200 87654', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- 5. Insert corresponding role records
INSERT INTO public.customers (id, city, state, pincode)
VALUES ('11111111-1111-1111-1111-111111111111', 'New Delhi', 'Delhi', '110085')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.workers (id, worker_code, experience_years, daily_wage, rating, total_jobs, safety_compliance_score, verification_status, police_verification_status, police_verification_ref, is_available, cluster_hub)
VALUES ('22222222-2222-2222-2222-222222222222', 'SK-4482', 5, 850.00, 4.95, 28, 96, 'verified', 'verified', 'PV-89214', true, 'North Bengaluru Hub')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.supervisors (id, society_name, jurisdiction_area, is_verified)
VALUES ('33333333-3333-3333-3333-333333333333', 'Shramik Kalyan Co-op Society #4102', 'Delhi NCR Sector-9', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert standardized skills catalog
INSERT INTO public.skills (name, category)
VALUES 
  ('Electrical Wiring', 'Electrical'),
  ('Solar Panel Installation', 'Electrical'),
  ('Pipeline Leak Repair', 'Plumbing'),
  ('Sanitary Ware Fitting', 'Plumbing'),
  ('Waterproofing & Damp Proofing', 'Painting'),
  ('Wood Framing & Cabinetry', 'Carpentry')
ON CONFLICT (name) DO NOTHING;
