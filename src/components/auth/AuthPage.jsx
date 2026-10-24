import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BRAND } from "../../config/brand";
import Logo from "../common/Logo";
import {
  ShieldCheck,
  KeyRound,
  Phone,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  HardHat,
  Users2,
  CheckCircle2,
  Sparkles,
  Building,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export default function AuthPage({ defaultMode = "signin" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated, user } = useAuth();

  // Mode: 'signin' | 'signup'
  const [mode, setMode] = useState(defaultMode);

  // Role: 'customer' | 'worker' | 'supervisor'
  const [role, setRole] = useState("customer");

  // Auth Method: 'sso' | 'google' | 'mobile'
  const [authMethod, setAuthMethod] = useState("sso");

  // Form Fields
  const [identifier, setIdentifier] = useState("SSO-RAHUL-01");
  const [password, setPassword] = useState("Customer@123");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("T26FK");
  const [userCaptcha, setUserCaptcha] = useState("T26FK");

  // Signup Specific Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tradeSkill, setTradeSkill] = useState("Electrician");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [societyJurisdiction, setSocietyJurisdiction] = useState("Shramik Kalyan Co-op Society #4102");
  const [address, setAddress] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode with query params if any
  useEffect(() => {
    if (location.pathname === "/signup") {
      setMode("signup");
    } else if (location.pathname === "/login") {
      setMode("signin");
    }
  }, [location.pathname]);

  // If already authenticated and visiting auth page, redirect to assigned dashboard
  useEffect(() => {
    if (isAuthenticated && user?.dashboardPath) {
      navigate(user.dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Update demo values when switching role
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMsg("");
    if (newRole === "customer") {
      setIdentifier("SSO-RAHUL-01");
      setPassword("Customer@123");
    } else if (newRole === "worker") {
      setIdentifier("SSO-RAMESH-02");
      setPassword("Worker@123");
    } else if (newRole === "supervisor") {
      setIdentifier("SSO-ROHIT-03");
      setPassword("Supervisor@123");
    }
  };

  const handleFillDemo = (targetRole) => {
    handleRoleChange(targetRole);
    setMode("signin");
    setAuthMethod("sso");
  };

  const regenerateCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserCaptcha(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (authMethod === "sso" && userCaptcha.toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMsg("Invalid captcha security code. Please try again.");
      return;
    }

    if (mode === "signin") {
      const loggedIn = login(role, { ssoId: identifier, password });
      navigate(loggedIn.dashboardPath || `/${role}/dashboard`, { replace: true });
    } else {
      // Signup
      const newRegistered = signup(role, {
        name: fullName || (role === "customer" ? "Rahul Sharma" : role === "worker" ? "Ramesh Kumar" : "Rohit Sharma"),
        email: email || `${role}@sahkar.in`,
        phone: phone || "+91 98765 43210",
        trade: tradeSkill,
        aadhaar: aadhaarNumber,
        society: societyJurisdiction,
        address: address,
      });
      navigate(newRegistered.dashboardPath || `/${role}/dashboard`, { replace: true });
    }
  };

  const roleMeta = {
    customer: {
      badge: "CUSTOMER PORTAL",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      pillActive: "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm",
      title: mode === "signin" ? "Sign In to Customer Account" : "Register Household Account",
      subtitle: "Discover verified home services, live GPS dispatch & direct UPI settlement.",
      destination: "/customer/dashboard",
    },
    worker: {
      badge: "WORKER PORTAL",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      pillActive: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm",
      title: mode === "signin" ? "Sign In to Worker Account" : "Join Craftsperson Cooperative",
      subtitle: "Access accredited job dispatches, digital worker ID, and dividend ledger.",
      destination: "/worker/dashboard",
    },
    supervisor: {
      badge: "SUPERVISOR PORTAL",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      pillActive: "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm",
      title: mode === "signin" ? "Sign In to Supervisor Command" : "Register Project Supervisor",
      subtitle: "Manage multi-trade sites, muster roll attendance, and escrow payouts.",
      destination: "/supervisor/dashboard",
    },
  };

  const currentMeta = roleMeta[role];

  return (
    <div className="min-h-screen bg-[#070b16] text-[#e8ecf6] flex flex-col font-sans">
      {/* Top Bar with Route Indicator & Quick Navigation */}
      <header className="border-b border-[#17233f] bg-[#0A1022]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size="default" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/30">
            Cooperative Workforce Network
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-[#0c1429] px-3 py-1.5 rounded-lg border border-[#1f2f54]">
            <span className="text-slate-400">Route:</span>
            <span className="text-primary font-semibold">
              /{mode === "signin" ? "signin" : "signup"}/{role}
            </span>
          </div>

          <Link
            to={currentMeta.destination}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#121c33] border border-[#23355b] hover:border-primary/60 text-xs font-semibold text-primary transition-colors"
          >
            <span>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/"
            className="text-xs text-text-muted hover:text-text px-2 py-1 rounded transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Manifesto & Tri-Role Visual Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Institutional Cooperative Governance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
            Every Worker Matters. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Every Home Counts.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Unified authentication portal for Customer households, accredited Worker-Owners,
            and institutional Area Supervisors with strict single-account identity verification.
          </p>

          {/* Tri-Role Architecture Box */}
          <div className="rounded-2xl bg-[#0c142b] border border-[#1c2c52] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2c52]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tri-Role Single Account Architecture
              </span>
              <span className="text-[11px] font-mono text-primary font-semibold">
                1 Email/Phone = 1 Identity
              </span>
            </div>

            {/* Architecture Node Representation */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="p-3 rounded-xl bg-[#121c38] border border-sky-500/30">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-1.5">
                  <User className="w-4 h-4" />
                </div>
                <span className="block text-xs font-bold text-sky-300">Customer</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Homes & Families</span>
              </div>

              <div className="p-3 rounded-xl bg-[#121c38] border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
                  <HardHat className="w-4 h-4" />
                </div>
                <span className="block text-xs font-bold text-emerald-300">Worker</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Accredited Trades</span>
              </div>

              <div className="p-3 rounded-xl bg-[#121c38] border border-amber-500/30">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-1.5">
                  <Users2 className="w-4 h-4" />
                </div>
                <span className="block text-xs font-bold text-amber-300">Supervisor</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Project Audits</span>
              </div>
            </div>

            {/* Quick 1-Click Demo Fill Buttons */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-2">
                1-Click Demo Profile Switcher:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo("customer")}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    role === "customer"
                      ? "bg-sky-500/15 border-sky-500 text-sky-200"
                      : "bg-[#10182f] border-[#1d2b4d] text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="block text-[11px] font-bold text-sky-400">Customer</span>
                  <span className="block text-[10px] truncate text-slate-400">Rahul Sharma</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo("worker")}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    role === "worker"
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-200"
                      : "bg-[#10182f] border-[#1d2b4d] text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="block text-[11px] font-bold text-emerald-400">Worker</span>
                  <span className="block text-[10px] truncate text-slate-400">Ramesh Kumar</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo("supervisor")}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    role === "supervisor"
                      ? "bg-amber-500/15 border-amber-500 text-amber-200"
                      : "bg-[#10182f] border-[#1d2b4d] text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="block text-[11px] font-bold text-amber-400">Supervisor</span>
                  <span className="block text-[10px] truncate text-slate-400">Rohit Sharma</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#0c142b]/95 border border-[#1e2f57] p-6 sm:p-8 lg:p-9 shadow-2xl relative">
            {/* Top Row: Sign In / Create Account Toggle + Role Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2b4f] mb-6">
              {/* Mode Toggle */}
              <div className="inline-flex p-1 rounded-xl bg-[#070d1d] border border-[#192748]">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === "signin"
                      ? "bg-primary text-[#061e12] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === "signup"
                      ? "bg-primary text-[#061e12] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Role Selector Pills */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
                  Portal:
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[#070d1d] border border-[#192748]">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("customer")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      role === "customer"
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("worker")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      role === "worker"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("supervisor")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      role === "supervisor"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Supervisor
                  </button>
                </div>
              </div>
            </div>

            {/* Header Titles */}
            <div className="space-y-1 mb-6">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${currentMeta.badgeColor}`}
                >
                  {currentMeta.badge}
                </span>
                <span className="text-xs text-slate-400">
                  {mode === "signin" ? "Single Sign-On" : "Registration"}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight font-heading">
                {currentMeta.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentMeta.subtitle}
              </p>
            </div>

            {/* 3 Auth Method Tabs (SSO, Google, Mobile OTP) */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#070d1d] rounded-xl border border-[#1b2b4f] mb-6">
              <button
                type="button"
                onClick={() => setAuthMethod("sso")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  authMethod === "sso"
                    ? "bg-[#14203d] text-primary border border-primary/30 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>1. SSO ID</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod("google");
                  setErrorMsg("");
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  authMethod === "google"
                    ? "bg-[#14203d] text-primary border border-primary/30 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="font-bold text-rose-400">G</span>
                <span>2. Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod("mobile");
                  setErrorMsg("");
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  authMethod === "mobile"
                    ? "bg-[#14203d] text-primary border border-primary/30 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>3. Mobile OTP</span>
              </button>
            </div>

            {/* Error Message */}
            {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}
              {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-danger shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Method 1: SSO / Password Form */}
              {authMethod === "sso" && (
                <>
                  {mode === "signup" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Role Specific Registration Fields */}
                      {role === "customer" && (
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Delivery Address (Delhi NCR / Bengaluru)
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Flat/House number, Apartment, Sector, Pin Code"
                            className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                          />
                        </div>
                      )}

                      {role === "worker" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">
                              Primary Trade Skill
                            </label>
                            <select
                              value={tradeSkill}
                              onChange={(e) => setTradeSkill(e.target.value)}
                              className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                            >
                              <option>Electrician</option>
                              <option>Plumbing & Sanitary</option>
                              <option>Carpentry & Joinery</option>
                              <option>Masonry & Plastering</option>
                              <option>Painting & Polishing</option>
                              <option>AC & HVAC Technician</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">
                              Aadhaar / e-Shram Number
                            </label>
                            <input
                              type="text"
                              value={aadhaarNumber}
                              onChange={(e) => setAadhaarNumber(e.target.value)}
                              placeholder="XXXX-XXXX-XXXX"
                              className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      )}

                      {role === "supervisor" && (
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Affiliated Cooperative Society / License
                          </label>
                          <input
                            type="text"
                            value={societyJurisdiction}
                            onChange={(e) => setSocietyJurisdiction(e.target.value)}
                            placeholder="e.g. Shramik Kalyan Co-op Society #4102"
                            className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* SSO ID / Username */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Digital Identity (SSOID / Username)
                      </label>
                      <button
                        type="button"
                        onClick={() => alert(`Your demo SSO ID for ${role} is: ${identifier}`)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Forgot SSO ID?
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. SSO-RAHUL-01 or employee username"
                      className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert(`Demo password for ${role} is: ${password}`)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter secure password"
                        className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Captcha Security Check (as shown in Image 3) */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 bg-[#080e1e] border border-[#1b2b4f] px-3.5 py-2 rounded-xl shrink-0">
                      <span className="font-mono text-base font-extrabold tracking-widest text-emerald-400 select-none">
                        {captchaCode}
                      </span>
                      <button
                        type="button"
                        onClick={regenerateCaptcha}
                        title="Regenerate Captcha"
                        className="text-slate-400 hover:text-primary transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      placeholder="ENTER CAPTCHA"
                      className="flex-1 bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm uppercase font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                </>
              )}

              {/* Method 2: Google Workspace Simulation */}
              {authMethod === "google" && (
                <div className="py-6 text-center space-y-4 bg-[#080e1e] border border-[#1b2b4f] rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                    G
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Google Workspace Federation</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Authenticate with your verified cooperative email ({role}@sahkar.in)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const logged = login(role, { email: `${role}@sahkar.in` });
                      navigate(logged.dashboardPath, { replace: true });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <span>Continue as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Method 3: Mobile OTP Simulation */}
              {authMethod === "mobile" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Aadhaar / e-Shram Linked Mobile
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={phone || "+91 98765 43210"}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 Mobile Number"
                        className="flex-1 bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          setOtpCode("882194");
                        }}
                        className="px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-bold text-primary hover:bg-[#152345] transition-colors shrink-0"
                      >
                        {otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                      <span className="text-xs text-emerald-300 block">
                        OTP sent to registered mobile. Demo OTP: <strong>882194</strong>
                      </span>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full bg-[#080e1e] border border-emerald-500/40 rounded-lg px-3 py-2 text-sm text-white font-mono tracking-widest text-center"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#051c11] font-bold text-sm hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {mode === "signin"
                      ? `Sign In with ${authMethod === "sso" ? "SSO ID" : authMethod === "google" ? "Google" : "OTP"}`
                      : "Create Verified Account"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Policy Statement */}
              <div className="pt-3 text-center text-xs text-slate-400">
                <span>By continuing, you agree to the SahkarSathi </span>
                <Link to="/terms" className="text-primary hover:underline">
                  Cooperative Bylaws
                </Link>
                <span> and </span>
                <Link to="/privacy" className="text-primary hover:underline">
                  Worker Dignity Charter
                </Link>
                .
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
