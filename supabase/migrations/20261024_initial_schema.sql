-- ==============================================================================
-- SAHKARSATHI SUPABASE POSTGRESQL DATABASE SCHEMA (MIGRATION v2.0 - REVISED)
-- Smart India Hackathon 2026 | Cooperative Gig-Services Platform
-- Clean, Idempotent, Production-Grade Migration with Strict Role-Level RLS
-- NOTE: Prepared for review. NOT YET EXECUTED.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. REUSABLE TRIGGER FUNCTIONS
-- ==============================================================================

-- Trigger Function: Automatic updated_at timestamp management
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function: Prevent non-administrative users from tampering with their role
CREATE OR REPLACE FUNCTION public.prevent_role_tampering()
RETURNS TRIGGER AS $$
BEGIN
  IF (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Users are not permitted to change their own role';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function: Protect sensitive administrative fields on workers table
CREATE OR REPLACE FUNCTION public.protect_worker_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role' THEN
    IF (NEW.verification_status IS DISTINCT FROM OLD.verification_status) OR
       (NEW.police_verification_status IS DISTINCT FROM OLD.police_verification_status) OR
       (NEW.police_verification_ref IS DISTINCT FROM OLD.police_verification_ref) OR
       (NEW.rating IS DISTINCT FROM OLD.rating) OR
       (NEW.total_jobs IS DISTINCT FROM OLD.total_jobs) OR
       (NEW.safety_compliance_score IS DISTINCT FROM OLD.safety_compliance_score) OR
       (NEW.worker_code IS DISTINCT FROM OLD.worker_code) OR
       (NEW.coop_id IS DISTINCT FROM OLD.coop_id) THEN
      RAISE EXCEPTION 'Workers cannot modify administrative verification status, police verification, ratings, or identity codes';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function: Prevent self-verification or unauthorized elevation of worker skills
CREATE OR REPLACE FUNCTION public.protect_worker_skill_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role' THEN
    IF TG_OP = 'INSERT' THEN
      -- Newly added self-claimed skills must start unverified
      NEW.is_verified := false;
      NEW.verified_by := NULL;
      NEW.verified_at := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
      -- If any verification attribute changed, verify that updater is an authorized supervisor
      IF (NEW.is_verified IS DISTINCT FROM OLD.is_verified) OR
         (NEW.certification_level IS DISTINCT FROM OLD.certification_level) OR
         (NEW.verified_by IS DISTINCT FROM OLD.verified_by) OR
         (NEW.verified_at IS DISTINCT FROM OLD.verified_at) THEN
        IF NOT EXISTS (
          SELECT 1 FROM public.supervisors s
          WHERE s.profile_id = auth.uid() AND s.is_verified = true
        ) THEN
          RAISE EXCEPTION 'Only verified supervisors or platform administrators can verify skills or certify levels';
        END IF;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function: Protect supervisor verification status
CREATE OR REPLACE FUNCTION public.protect_supervisor_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role' THEN
    IF (NEW.is_verified IS DISTINCT FROM OLD.is_verified) OR
       (NEW.supervisor_code IS DISTINCT FROM OLD.supervisor_code) THEN
      RAISE EXCEPTION 'Supervisors cannot modify their verification status or identification code directly';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 3. TABLE DEFINITIONS
-- ==============================================================================

-- 3.1 PROFILES (Shared core user identity linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('customer', 'worker', 'supervisor')),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2 CUSTOMERS (Customer-specific metadata; no hardcoded Delhi NCR default)
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  address TEXT,
  city TEXT,
  state TEXT, -- Nullable, explicitly configured by user
  pincode TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.3 WORKERS (Accredited worker-owners; verified metrics protected by triggers)
CREATE TABLE IF NOT EXISTS public.workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  worker_code TEXT NOT NULL UNIQUE,
  coop_id TEXT NOT NULL UNIQUE,
  primary_trade TEXT NOT NULL,
  experience_years INT NOT NULL DEFAULT 0 CHECK (experience_years >= 0),
  daily_wage NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (daily_wage >= 0),
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  total_jobs INT NOT NULL DEFAULT 0 CHECK (total_jobs >= 0),
  safety_compliance_score INT NOT NULL DEFAULT 100 CHECK (safety_compliance_score >= 0 AND safety_compliance_score <= 100),
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_review', 'verified', 'rejected', 'suspended')),
  police_verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (police_verification_status IN ('pending', 'verified', 'failed')),
  police_verification_ref TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  availability_status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (availability_status IN ('ACTIVE', 'ON_DUTY', 'BUSY', 'OFFLINE')),
  cluster_hub TEXT,
  upi_id TEXT,
  bank_account_no TEXT,
  ifsc_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.4 SUPERVISORS (Project supervisors; is_verified defaults to FALSE)
CREATE TABLE IF NOT EXISTS public.supervisors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  supervisor_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT 'Project Supervisor',
  society_name TEXT NOT NULL,
  society_id TEXT NOT NULL,
  jurisdiction_area TEXT,
  license_no TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false, -- Set to false per User Correction #4
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.5 SKILLS (Master standardized cooperative skills directory)
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.6 WORKER_SKILLS (Worker-claimed competencies and supervisor-verified accreditations)
CREATE TABLE IF NOT EXISTS public.worker_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES public.workers(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  experience_months INT DEFAULT 0 CHECK (experience_months >= 0),
  certification_level TEXT DEFAULT 'Standard',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verified_by UUID REFERENCES public.supervisors(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  portfolio_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_worker_skill UNIQUE(worker_id, skill_id)
);

-- 3.7 PROJECTS (Cooperative projects managed by customers and assigned supervisors)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  supervisor_id UUID REFERENCES public.supervisors(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  budget NUMERIC(12,2) NOT NULL DEFAULT 0.00 CHECK (budget >= 0),
  required_skills TEXT[] DEFAULT '{}', -- Retained for backward frontend compatibility
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'in_progress', 'under_review', 'completed', 'cancelled')),
  assigned_worker_id UUID REFERENCES public.workers(id) ON DELETE SET NULL,
  assigned_team_id UUID, -- References teams(id) created below
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.8 PROJECT_SKILLS (Normalized relational table for AI skill matching)
CREATE TABLE IF NOT EXISTS public.project_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  required_level TEXT DEFAULT 'Standard',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_project_skill UNIQUE(project_id, skill_id)
);

-- 3.9 TEAMS (Cooperative work units assembled and supervised by supervisors)
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  supervisor_id UUID NOT NULL REFERENCES public.supervisors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  trade_category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add foreign key constraint for projects.assigned_team_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_projects_assigned_team'
  ) THEN
    ALTER TABLE public.projects 
    ADD CONSTRAINT fk_projects_assigned_team 
    FOREIGN KEY (assigned_team_id) REFERENCES public.teams(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3.10 TEAM_MEMBERS (Workers grouped into operational cooperative teams)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.workers(id) ON DELETE CASCADE,
  role_in_team TEXT DEFAULT 'Member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_team_worker UNIQUE(team_id, worker_id)
);

-- 3.11 APPLICATIONS (Worker proposals for open projects)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.workers(id) ON DELETE CASCADE,
  cover_note TEXT,
  proposed_wage NUMERIC(10,2) CHECK (proposed_wage >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn')),
  reviewed_by UUID REFERENCES public.supervisors(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_worker_project_application UNIQUE(project_id, worker_id)
);

-- 3.12 BOOKINGS (Direct gig visits, escrow disbursements, and OTP tracking)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.workers(id) ON DELETE RESTRICT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  trade_category TEXT NOT NULL,
  title TEXT NOT NULL,
  scope_of_work TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('pending', 'scheduled', 'worker_en_route', 'in_progress', 'service_completed', 'cancelled')),
  scheduled_date TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  total_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
  upi_id TEXT,
  utr_number TEXT,
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'processing', 'escrowed', 'disbursed', 'refunded')),
  otp_code TEXT,
  otp_expires_at TIMESTAMPTZ, -- Per User Correction #9
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.13 NOTIFICATIONS (Secure, recipient-isolated in-app communication)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system' CHECK (type IN ('system', 'booking', 'application', 'payment', 'verification', 'alert')),
  link_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 4. ATTACH AUTOMATED TRIGGERS
-- ==============================================================================

-- 4.1 updated_at triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_customers_updated_at ON public.customers;
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON public.customers
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_workers_updated_at ON public.workers;
CREATE TRIGGER trg_workers_updated_at BEFORE UPDATE ON public.workers
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_supervisors_updated_at ON public.supervisors;
CREATE TRIGGER trg_supervisors_updated_at BEFORE UPDATE ON public.supervisors
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_skills_updated_at ON public.skills;
CREATE TRIGGER trg_skills_updated_at BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_worker_skills_updated_at ON public.worker_skills;
CREATE TRIGGER trg_worker_skills_updated_at BEFORE UPDATE ON public.worker_skills
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_projects_updated_at ON public.projects;
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_teams_updated_at ON public.teams;
CREATE TRIGGER trg_teams_updated_at BEFORE UPDATE ON public.teams
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_applications_updated_at ON public.applications;
CREATE TRIGGER trg_applications_updated_at BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.bookings;
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4.2 Security & Protection triggers
DROP TRIGGER IF EXISTS trg_prevent_role_tampering ON public.profiles;
CREATE TRIGGER trg_prevent_role_tampering BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_role_tampering();

DROP TRIGGER IF EXISTS trg_protect_worker_fields ON public.workers;
CREATE TRIGGER trg_protect_worker_fields BEFORE UPDATE ON public.workers
FOR EACH ROW EXECUTE FUNCTION public.protect_worker_fields();

DROP TRIGGER IF EXISTS trg_protect_worker_skill_verification ON public.worker_skills;
CREATE TRIGGER trg_protect_worker_skill_verification BEFORE INSERT OR UPDATE ON public.worker_skills
FOR EACH ROW EXECUTE FUNCTION public.protect_worker_skill_verification();

DROP TRIGGER IF EXISTS trg_protect_supervisor_fields ON public.supervisors;
CREATE TRIGGER trg_protect_supervisor_fields BEFORE UPDATE ON public.supervisors
FOR EACH ROW EXECUTE FUNCTION public.protect_supervisor_fields();

-- ==============================================================================
-- 5. PERFORMANCE & LOOKUP INDEXES
-- ==============================================================================

-- Workers discovery & availability
CREATE INDEX IF NOT EXISTS idx_workers_verified_available ON public.workers(verification_status, is_available);
CREATE INDEX IF NOT EXISTS idx_workers_cluster ON public.workers(cluster_hub);
CREATE INDEX IF NOT EXISTS idx_workers_trade ON public.workers(primary_trade);

-- Skills & AI matching
CREATE INDEX IF NOT EXISTS idx_worker_skills_worker ON public.worker_skills(worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_skills_skill ON public.worker_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_project_skills_project ON public.project_skills(project_id);
CREATE INDEX IF NOT EXISTS idx_project_skills_skill ON public.project_skills(skill_id);

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_customer ON public.projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_supervisor ON public.projects(supervisor_id);

-- Applications
CREATE INDEX IF NOT EXISTS idx_applications_project ON public.applications(project_id);
CREATE INDEX IF NOT EXISTS idx_applications_worker ON public.applications(worker_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- Teams
CREATE INDEX IF NOT EXISTS idx_teams_supervisor ON public.teams(supervisor_id);
CREATE INDEX IF NOT EXISTS idx_teams_project ON public.teams(project_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_worker ON public.team_members(worker_id);

-- Bookings
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_worker ON public.bookings(worker_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all 13 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supervisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 6.1 PROFILES POLICIES
-- ------------------------------------------------------------------------------
-- Users can view their own profile, or verified workers/supervisors in the directory
CREATE POLICY "profiles_select_policy" ON public.profiles
FOR SELECT USING (
  auth.uid() = id
  OR id IN (SELECT profile_id FROM public.workers WHERE verification_status = 'verified')
  OR id IN (SELECT profile_id FROM public.supervisors WHERE is_verified = true)
);

CREATE POLICY "profiles_insert_policy" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON public.profiles
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 6.2 CUSTOMERS POLICIES (Strict Private Access - User Correction #1)
-- ------------------------------------------------------------------------------
CREATE POLICY "customers_select_policy" ON public.customers
FOR SELECT USING (
  profile_id = auth.uid()
  OR id IN (
    SELECT customer_id FROM public.bookings 
    WHERE worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  )
  OR id IN (
    SELECT customer_id FROM public.projects 
    WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid())
  )
);

CREATE POLICY "customers_insert_policy" ON public.customers
FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "customers_update_policy" ON public.customers
FOR UPDATE USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 6.3 WORKERS POLICIES (Verified Discoverability & Self-Access - User Correction #2)
-- ------------------------------------------------------------------------------
CREATE POLICY "workers_select_policy" ON public.workers
FOR SELECT USING (
  profile_id = auth.uid()
  OR verification_status = 'verified'
);

CREATE POLICY "workers_insert_policy" ON public.workers
FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "workers_update_policy" ON public.workers
FOR UPDATE USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 6.4 SUPERVISORS POLICIES (Verified Discoverability & Self-Access - User Correction #4)
-- ------------------------------------------------------------------------------
CREATE POLICY "supervisors_select_policy" ON public.supervisors
FOR SELECT USING (
  profile_id = auth.uid()
  OR is_verified = true
);

CREATE POLICY "supervisors_insert_policy" ON public.supervisors
FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "supervisors_update_policy" ON public.supervisors
FOR UPDATE USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 6.5 SKILLS POLICIES (Public Standardized Directory)
-- ------------------------------------------------------------------------------
CREATE POLICY "skills_select_policy" ON public.skills
FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- 6.6 WORKER_SKILLS POLICIES (Self-Claiming without Self-Verification - User Correction #3)
-- ------------------------------------------------------------------------------
CREATE POLICY "worker_skills_select_policy" ON public.worker_skills
FOR SELECT USING (
  worker_id IN (
    SELECT id FROM public.workers 
    WHERE verification_status = 'verified' OR profile_id = auth.uid()
  )
);

CREATE POLICY "worker_skills_insert_policy" ON public.worker_skills
FOR INSERT WITH CHECK (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  AND is_verified = false
);

CREATE POLICY "worker_skills_update_policy" ON public.worker_skills
FOR UPDATE USING (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR EXISTS (
    SELECT 1 FROM public.supervisors s 
    WHERE s.profile_id = auth.uid() AND s.is_verified = true
  )
);

CREATE POLICY "worker_skills_delete_policy" ON public.worker_skills
FOR DELETE USING (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
);

-- ------------------------------------------------------------------------------
-- 6.7 PROJECTS POLICIES (Role-Governed Project Management - User Correction #6)
-- ------------------------------------------------------------------------------
CREATE POLICY "projects_select_policy" ON public.projects
FOR SELECT USING (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
  OR supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid())
  OR assigned_worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR status IN ('open', 'published', 'recruiting')
);

CREATE POLICY "projects_insert_policy" ON public.projects
FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
);

CREATE POLICY "projects_update_policy" ON public.projects
FOR UPDATE USING (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
  OR supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid())
);

CREATE POLICY "projects_delete_policy" ON public.projects
FOR DELETE USING (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
  AND status IN ('draft', 'open')
);

-- ------------------------------------------------------------------------------
-- 6.8 PROJECT_SKILLS POLICIES (AI Skill Matching Requirements - User Correction #10)
-- ------------------------------------------------------------------------------
CREATE POLICY "project_skills_select_policy" ON public.project_skills
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_skills.project_id)
);

CREATE POLICY "project_skills_manage_policy" ON public.project_skills
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.projects p 
    WHERE p.id = project_skills.project_id 
    AND (
      p.customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
      OR p.supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid())
    )
  )
);

-- ------------------------------------------------------------------------------
-- 6.9 TEAMS POLICIES (Supervisor Managed & Worker Visibility)
-- ------------------------------------------------------------------------------
CREATE POLICY "teams_select_policy" ON public.teams
FOR SELECT USING (
  supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid())
  OR id IN (SELECT team_id FROM public.team_members WHERE worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid()))
  OR project_id IN (SELECT id FROM public.projects WHERE customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid()))
);

CREATE POLICY "teams_manage_policy" ON public.teams
FOR ALL USING (
  supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid() AND is_verified = true)
);

-- ------------------------------------------------------------------------------
-- 6.10 TEAM_MEMBERS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "team_members_select_policy" ON public.team_members
FOR SELECT USING (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR team_id IN (SELECT id FROM public.teams WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid()))
);

CREATE POLICY "team_members_manage_policy" ON public.team_members
FOR ALL USING (
  team_id IN (SELECT id FROM public.teams WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid() AND is_verified = true))
);

-- ------------------------------------------------------------------------------
-- 6.11 APPLICATIONS POLICIES (Isolated Proposals & Authorized Review - User Correction #5)
-- ------------------------------------------------------------------------------
CREATE POLICY "applications_select_policy" ON public.applications
FOR SELECT USING (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR project_id IN (SELECT id FROM public.projects WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid()))
);

CREATE POLICY "applications_insert_policy" ON public.applications
FOR INSERT WITH CHECK (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  AND status = 'pending'
);

CREATE POLICY "applications_update_policy" ON public.applications
FOR UPDATE USING (
  worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR project_id IN (SELECT id FROM public.projects WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid()))
);

-- ------------------------------------------------------------------------------
-- 6.12 BOOKINGS POLICIES (Direct Visit Workflow & Secure OTP - User Correction #9)
-- ------------------------------------------------------------------------------
CREATE POLICY "bookings_select_policy" ON public.bookings
FOR SELECT USING (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
  OR worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR project_id IN (SELECT id FROM public.projects WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid()))
);

CREATE POLICY "bookings_insert_policy" ON public.bookings
FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
);

CREATE POLICY "bookings_update_policy" ON public.bookings
FOR UPDATE USING (
  customer_id IN (SELECT id FROM public.customers WHERE profile_id = auth.uid())
  OR worker_id IN (SELECT id FROM public.workers WHERE profile_id = auth.uid())
  OR project_id IN (SELECT id FROM public.projects WHERE supervisor_id IN (SELECT id FROM public.supervisors WHERE profile_id = auth.uid()))
);

-- ------------------------------------------------------------------------------
-- 6.13 NOTIFICATIONS POLICIES (Strict Recipient Isolation - User Correction #7)
-- ------------------------------------------------------------------------------
CREATE POLICY "notifications_select_policy" ON public.notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notifications_update_policy" ON public.notifications
FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Note: INSERT & DELETE for notifications default to service_role / system triggers only.
-- End of SahkarSathi Migration Script v2.0
