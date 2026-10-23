import React, { createContext, useContext, useState, useEffect } from "react";

export const DEMO_USERS = {
  customer: {
    id: "usr_cust_01",
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
    id: "usr_work_02",
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
    id: "usr_sup_03",
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

  const [isLoading, setIsLoading] = useState(false);

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

  const login = (role = "customer", credentials = {}) => {
    setIsLoading(true);
    const demoProfile = DEMO_USERS[role] || DEMO_USERS.customer;
    
    // Simulate verification
    const authenticatedUser = {
      ...demoProfile,
      lastLogin: new Date().toISOString(),
      token: `coop_jwt_${Math.random().toString(36).substring(2)}`,
      email: credentials.email || credentials.ssoId || demoProfile.email,
    };

    setUser(authenticatedUser);
    setIsLoading(false);
    return authenticatedUser;
  };

  const signup = (role = "customer", registrationData = {}) => {
    setIsLoading(true);
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
    return newUser;
  };

  const logout = () => {
    setUser(null);
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
