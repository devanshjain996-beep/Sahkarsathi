import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  signInUser,
  signUpUser,
  signOutUser,
  getCurrentUserProfile,
} from "../services/supabaseService";

export const DEMO_USERS = {
  customer: {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Rahul Sharma",
    email: "customer@sahkar.in",
    ssoId: "SSO-RAHUL-01",
    phone: "+91 98765 43210",
    role: "customer",
    roleLabel: "Household Customer",
    badge: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    address: "Flat 402, Shanti Vihar, Rohini Sector-9, New Delhi",
    balance: "₹14,500.00",
    dashboardPath: "/customer/dashboard",
  },
  worker: {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Ramesh Kumar",
    trade: "Electrician Grade-1",
    workerCode: "SK-4482",
    email: "worker@sahkar.in",
    ssoId: "SSO-RAMESH-02",
    phone: "+91 98112 34567",
    role: "worker",
    roleLabel: "Accredited Worker-Owner",
    badge: "Verified Tradesperson",
    cluster: "North Bengaluru Hub • Grid Active",
    availability: "ACTIVE",
    safetyScore: "96%",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    dashboardPath: "/worker/dashboard",
  },
  supervisor: {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Rohit Sharma",
    title: "Senior Project Supervisor",
    society: "Shramik Kalyan Co-op Society #4102",
    email: "supervisor@sahkar.in",
    ssoId: "SSO-ROHIT-03",
    phone: "+91 99200 87654",
    role: "supervisor",
    roleLabel: "Senior Project Supervisor",
    badge: "On Duty • Society #4102",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    dashboardPath: "/supervisor/dashboard",
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("sahkarsathi_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Initialize and synchronize with Supabase Auth session
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const supabaseProfile = await getCurrentUserProfile();
        if (mounted && supabaseProfile) {
          setUser(supabaseProfile);
        }
      } catch (err) {
        console.warn("Error restoring Supabase auth state:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initializeAuth();

    // Listen to Supabase Auth State changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const profile = await getCurrentUserProfile();
        if (mounted && profile) {
          setUser(profile);
        }
      } else if (event === "SIGNED_OUT") {
        if (mounted) {
          setUser(null);
          localStorage.removeItem("sahkarsathi_user");
        }
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Sync user state with localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("sahkarsathi_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("sahkarsathi_user");
      }
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [user]);

  /**
   * Universal Login: Supports both Supabase Auth and Demo SSO accounts
   */
  const login = async (role = "customer", credentials = {}) => {
    setIsLoading(true);

    // If an email and password were provided, attempt real Supabase Auth
    if (credentials.email && credentials.password && credentials.email.includes("@")) {
      const result = await signInUser(credentials.email, credentials.password);
      if (result.success) {
        setUser(result.user);
        setIsLoading(false);
        return result;
      } else {
        setIsLoading(false);
        return { success: false, error: result.error };
      }
    }

    // Demo persona fallback for seamless hackathon walkthroughs
    const demoProfile = DEMO_USERS[role] || DEMO_USERS.customer;
    const authenticatedUser = {
      ...demoProfile,
      lastLogin: new Date().toISOString(),
      token: `coop_jwt_${Math.random().toString(36).substring(2)}`,
      email: credentials.email || credentials.ssoId || demoProfile.email,
    };

    setUser(authenticatedUser);
    setIsLoading(false);
    return { success: true, user: authenticatedUser };
  };

  /**
   * Universal Signup: Registers user in Supabase Auth & creates profiles/role rows
   */
  const signup = async (role = "customer", registrationData = {}) => {
    setIsLoading(true);

    if (registrationData.email && registrationData.password) {
      const result = await signUpUser({
        email: registrationData.email,
        password: registrationData.password,
        fullName: registrationData.name || (role === "customer" ? "Rahul Sharma" : role === "worker" ? "Ramesh Kumar" : "Rohit Sharma"),
        role: role,
        phone: registrationData.phone || "+91 98765 43210",
        roleData: registrationData,
      });

      if (result.success) {
        setUser(result.user);
        setIsLoading(false);
        return result;
      } else {
        setIsLoading(false);
        return { success: false, error: result.error };
      }
    }

    // Fallback demo signup
    const base = DEMO_USERS[role] || DEMO_USERS.customer;
    const newUser = {
      ...base,
      id: `usr_${Date.now()}`,
      name: registrationData.name || base.name,
      email: registrationData.email || base.email,
      phone: registrationData.phone || base.phone,
      role: role,
      token: `coop_jwt_${Math.random().toString(36).substring(2)}`,
      lastLogin: new Date().toISOString(),
      ...registrationData,
    };

    setUser(newUser);
    setIsLoading(false);
    return { success: true, user: newUser };
  };

  const logout = async () => {
    setIsLoading(true);
    await signOutUser();
    setUser(null);
    localStorage.removeItem("sahkarsathi_user");
    setIsLoading(false);
  };

  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setUser({
        ...DEMO_USERS[newRole],
        lastLogin: new Date().toISOString(),
        token: `coop_jwt_${Math.random().toString(36).substring(2)}`,
      });
    }
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    switchRole,
    DEMO_USERS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
