import { supabase } from "../lib/supabase";

/**
 * SahkarSathi Supabase Service Layer
 * Clean, production-ready Supabase database integration adhering strictly to RLS policies.
 */

// ==============================================================================
// 1. AUTHENTICATION SERVICES
// ==============================================================================

/**
 * Sign in existing user with email & password
 */
export async function signInUser(email, password) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    const user = authData.user;
    if (!user) {
      return { success: false, error: "Authentication failed. No user returned." };
    }

    // Retrieve profile from profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.warn("Could not load profile:", profileError.message);
    }

    const role = profile?.role || user.user_metadata?.role || "customer";
    
    // Retrieve role-specific details
    let roleDetails = null;
    if (role === "customer") {
      const { data } = await supabase.from("customers").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    } else if (role === "worker") {
      const { data } = await supabase.from("workers").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    } else if (role === "supervisor") {
      const { data } = await supabase.from("supervisors").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    }

    const fullUser = {
      id: user.id,
      email: user.email,
      name: profile?.full_name || user.user_metadata?.full_name || email.split("@")[0],
      phone: profile?.phone || user.user_metadata?.phone || "",
      avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      role: role,
      roleLabel: role === "worker" ? "Accredited Worker-Owner" : role === "supervisor" ? "Senior Project Supervisor" : "Household Customer",
      dashboardPath: `/${role}/dashboard`,
      profile,
      roleDetails,
      isSupabaseUser: true,
    };

    return { success: true, user: fullUser, session: authData.session };
  } catch (err) {
    return { success: false, error: err.message || "An unexpected sign-in error occurred." };
  }
}

/**
 * Sign up a new user and create corresponding profiles & role rows
 */
export async function signUpUser({ email, password, fullName, role = "customer", phone = "", roleData = {} }) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
          phone: phone,
        },
      },
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    const user = authData.user;
    if (!user) {
      return { success: false, error: "Registration failed. User was not created." };
    }

    // If session is active (email confirmation disabled or auto-confirmed)
    if (authData.session) {
      // 1. Insert into profiles
      await supabase.from("profiles").upsert({
        id: user.id,
        role: role,
        full_name: fullName,
        phone: phone,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
      });

      // 2. Insert into role-specific table
      if (role === "customer") {
        await supabase.from("customers").upsert({
          id: user.id,
          city: roleData.city || "Delhi",
          state: roleData.state || "Delhi",
          pincode: roleData.pincode || "110001",
        });
      } else if (role === "worker") {
        await supabase.from("workers").upsert({
          id: user.id,
          worker_code: `SK-${Math.floor(1000 + Math.random() * 9000)}`,
          experience_years: parseInt(roleData.experienceYears || 2, 10),
          daily_wage: parseFloat(roleData.dailyWage || 650),
          rating: 5.0,
          total_jobs: 0,
          safety_compliance_score: 100,
          verification_status: "verified",
          police_verification_status: "verified",
          police_verification_ref: `PV-${Math.floor(100000 + Math.random() * 900000)}`,
          is_available: true,
          cluster_hub: roleData.clusterHub || "North Hub",
        });
      } else if (role === "supervisor") {
        await supabase.from("supervisors").upsert({
          id: user.id,
          society_name: roleData.societyName || "Shramik Kalyan Co-op Society #4102",
          jurisdiction_area: roleData.jurisdictionArea || "Sector-9, North Zone",
          is_verified: true,
        });
      }
    }

    const fullUser = {
      id: user.id,
      email: user.email,
      name: fullName,
      phone: phone,
      role: role,
      roleLabel: role === "worker" ? "Accredited Worker-Owner" : role === "supervisor" ? "Senior Project Supervisor" : "Household Customer",
      dashboardPath: `/${role}/dashboard`,
      isSupabaseUser: true,
      emailConfirmed: !!authData.session,
    };

    return {
      success: true,
      user: fullUser,
      session: authData.session,
      requiresEmailConfirmation: !authData.session,
    };
  } catch (err) {
    return { success: false, error: err.message || "An unexpected registration error occurred." };
  }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Get current authenticated user session and profile
 */
export async function getCurrentUserProfile() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const user = session.user;
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role || user.user_metadata?.role || "customer";

    let roleDetails = null;
    if (role === "customer") {
      const { data } = await supabase.from("customers").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    } else if (role === "worker") {
      const { data } = await supabase.from("workers").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    } else if (role === "supervisor") {
      const { data } = await supabase.from("supervisors").select("*").eq("id", user.id).maybeSingle();
      roleDetails = data;
    }

    return {
      id: user.id,
      email: user.email,
      name: profile?.full_name || user.user_metadata?.full_name || user.email.split("@")[0],
      phone: profile?.phone || user.user_metadata?.phone || "",
      avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      role: role,
      roleLabel: role === "worker" ? "Accredited Worker-Owner" : role === "supervisor" ? "Senior Project Supervisor" : "Household Customer",
      dashboardPath: `/${role}/dashboard`,
      profile,
      roleDetails,
      isSupabaseUser: true,
    };
  } catch (err) {
    console.error("Error retrieving user profile:", err);
    return null;
  }
}

// ==============================================================================
// 2. PROJECT MANAGEMENT SERVICES
// ==============================================================================

/**
 * Create a new cooperative project (Customer)
 */
export async function createProject({ customerId, title, description, location, budget, requiredSkills = [] }) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        customer_id: customerId,
        title,
        description,
        location,
        budget: parseFloat(budget || 0),
        required_skills: requiredSkills,
        status: "open",
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, project: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch projects created by a customer
 */
export async function fetchCustomerProjects(customerId) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, assigned_worker:workers(id, worker_code)")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, projects: [] };
    return { success: true, projects: data || [] };
  } catch (err) {
    return { success: false, error: err.message, projects: [] };
  }
}

/**
 * Fetch open projects available for workers to browse and apply
 */
export async function fetchOpenProjects() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, customer:customers(id, city, state)")
      .in("status", ["open", "published", "recruiting"])
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, projects: [] };
    return { success: true, projects: data || [] };
  } catch (err) {
    return { success: false, error: err.message, projects: [] };
  }
}

/**
 * Fetch projects supervised by a supervisor or in cluster
 */
export async function fetchSupervisorProjects(supervisorId) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, customer:customers(id, city, state), assigned_worker:workers(id, worker_code)")
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, projects: [] };
    return { success: true, projects: data || [] };
  } catch (err) {
    return { success: false, error: err.message, projects: [] };
  }
}

/**
 * Update project status (e.g. 'completed', 'in_progress')
 */
export async function updateProjectStatus({ projectId, status }) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", projectId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, project: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ==============================================================================
// 3. APPLICATION WORKFLOW SERVICES
// ==============================================================================

/**
 * Worker applies to an open project
 */
export async function applyToProject({ projectId, workerId }) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        project_id: projectId,
        worker_id: workerId,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "You have already applied to this project." };
      }
      return { success: false, error: error.message };
    }

    return { success: true, application: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch applications submitted by a worker
 */
export async function fetchWorkerApplications(workerId) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, project:projects(id, title, location, budget, status)")
      .eq("worker_id", workerId)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, applications: [] };
    return { success: true, applications: data || [] };
  } catch (err) {
    return { success: false, error: err.message, applications: [] };
  }
}

/**
 * Fetch all applications for projects
 */
export async function fetchAllApplications() {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, project:projects(id, title, location, budget), worker:workers(id, worker_code, rating, experience_years)")
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, applications: [] };
    return { success: true, applications: data || [] };
  } catch (err) {
    return { success: false, error: err.message, applications: [] };
  }
}

/**
 * Supervisor reviews and accepts an application
 */
export async function acceptApplication({ applicationId, projectId, workerId, supervisorId }) {
  try {
    // 1. Update application status
    const { error: appError } = await supabase
      .from("applications")
      .update({ status: "accepted" })
      .eq("id", applicationId);

    if (appError) return { success: false, error: appError.message };

    // 2. Assign worker to project
    const updatePayload = {
      assigned_worker_id: workerId,
      status: "in_progress",
    };
    if (supervisorId) {
      updatePayload.supervisor_id = supervisorId;
    }

    const { error: projError } = await supabase
      .from("projects")
      .update(updatePayload)
      .eq("id", projectId);

    if (projError) return { success: false, error: projError.message };

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Supervisor rejects an application
 */
export async function rejectApplication({ applicationId }) {
  try {
    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", applicationId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ==============================================================================
// 4. TEAMS & TEAM MEMBERSHIP SERVICES
// ==============================================================================

/**
 * Fetch teams supervised by a supervisor
 */
export async function fetchSupervisorTeams(supervisorId) {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("*, team_members(id, worker_id, joined_at, worker:workers(id, worker_code, rating))")
      .eq("supervisor_id", supervisorId)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, teams: [] };
    return { success: true, teams: data || [] };
  } catch (err) {
    return { success: false, error: err.message, teams: [] };
  }
}

/**
 * Create an operational cooperative team
 */
export async function createTeam({ supervisorId, name, projectId }) {
  try {
    const { data, error } = await supabase
      .from("teams")
      .insert({
        supervisor_id: supervisorId,
        name,
        project_id: projectId || null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, team: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Add a worker to a team
 */
export async function addWorkerToTeam({ teamId, workerId }) {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        team_id: teamId,
        worker_id: workerId,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, member: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Remove a worker from a team
 */
export async function removeWorkerFromTeam({ teamId, workerId }) {
  try {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("worker_id", workerId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ==============================================================================
// 5. BOOKINGS, SKILLS & NOTIFICATIONS
// ==============================================================================

/**
 * Fetch master skills directory
 */
export async function fetchSkillsList() {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("name");
    if (error) return { success: false, error: error.message, skills: [] };
    return { success: true, skills: data || [] };
  } catch (err) {
    return { success: false, error: err.message, skills: [] };
  }
}

/**
 * Fetch worker's skills
 */
export async function fetchWorkerSkills(workerId) {
  try {
    const { data, error } = await supabase
      .from("worker_skills")
      .select("*, skill:skills(id, name, category)")
      .eq("worker_id", workerId);

    if (error) return { success: false, error: error.message, skills: [] };
    return { success: true, skills: data || [] };
  } catch (err) {
    return { success: false, error: err.message, skills: [] };
  }
}

/**
 * Fetch user's bookings (Customer or Worker)
 */
export async function fetchUserBookings({ userId, role }) {
  try {
    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (role === "customer") {
      query = query.eq("customer_id", userId);
    } else if (role === "worker") {
      query = query.eq("worker_id", userId);
    }

    const { data, error } = await query;
    if (error) return { success: false, error: error.message, bookings: [] };
    return { success: true, bookings: data || [] };
  } catch (err) {
    return { success: false, error: err.message, bookings: [] };
  }
}

/**
 * Fetch user's notifications
 */
export async function fetchUserNotifications(userId) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error: error.message, notifications: [] };
    return { success: true, notifications: data || [] };
  } catch (err) {
    return { success: false, error: err.message, notifications: [] };
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationRead(notificationId) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
