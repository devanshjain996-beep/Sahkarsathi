import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Logo from "../../common/Logo";
import {
  IdCard,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  HardHat,
  User,
  Users2,
  FileText,
  CreditCard,
  Briefcase,
  AlertOctagon,
  LogOut,
  Bell,
  Globe,
  Lock,
  Building,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function WorkerDashboard() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("overview");
  const [onDuty, setOnDuty] = useState(true);
  const [lang, setLang] = useState("EN");
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  const steps = [
    {
      step: "STEP 01",
      title: "Personal Profile",
      status: "Approved & Locked",
      badge: "100%",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: User,
      active: false,
      completed: true,
    },
    {
      step: "STEP 02",
      title: "Trade Skills",
      status: "Grade-1 Certified",
      badge: "3 Verified",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: HardHat,
      active: false,
      completed: true,
    },
    {
      step: "STEP 03",
      title: "Identity & KYC",
      status: "Utility Bill in Review",
      badge: "Aadhaar OK",
      badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      icon: IdCard,
      active: false,
      completed: true,
    },
    {
      step: "STEP 04 • PRIORITY",
      title: "Police Clearance",
      status: "Desk Verification #PV",
      badge: "In Progress",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      icon: ShieldCheck,
      active: true,
      completed: false,
    },
    {
      step: "STEP 05",
      title: "Payouts & UPI",
      status: "Canara Bank Active",
      badge: "Direct UPI",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: CreditCard,
      active: false,
      completed: true,
    },
    {
      step: "STEP 06",
      title: "Digital ID Card",
      status: "Unlocks after clearance",
      badge: "Preview",
      badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      icon: Lock,
      active: false,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b16] text-[#dee1f9] flex flex-col font-sans">
      {/* Top Header - Matching Image 4 */}
      <header className="border-b border-[#17233f] bg-[#0A1022]/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="default" />
          </Link>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 pl-3 border-l border-[#1c2c52]">
            <span>SahkarSathi Portal</span>
            <span>/</span>
            <span className="text-primary font-semibold">Worker Workspace</span>
          </div>
        </div>

        {/* Center Hub Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c142b] border border-[#1d2d54] text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            Cluster: North Bengaluru Hub • Grid Active
          </span>
        </div>

        {/* Right Controls: Role Switcher, Lang, Bell & Avatar */}
        <div className="flex items-center gap-3">
          {/* View Switcher Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-[#0c1429] p-1 rounded-xl border border-[#1e2f54]">
            <button
              onClick={() => {
                switchRole("customer");
                navigate("/customer/dashboard");
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
            >
              Customer
            </button>
            <button
              onClick={() => {
                switchRole("worker");
                navigate("/worker/dashboard");
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary text-[#051c11]"
            >
              Worker
            </button>
            <button
              onClick={() => {
                switchRole("supervisor");
                navigate("/supervisor/dashboard");
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
            >
              Supervisor
            </button>
          </div>

          {/* Language Switcher [EN | हिंदी | ಕನ್ನಡ] - Exactly as in Image 4 */}
          <div className="flex items-center gap-1 bg-[#0c1429] px-2.5 py-1 rounded-lg border border-[#1e2f54] text-xs font-bold">
            <button
              onClick={() => setLang("EN")}
              className={`${lang === "EN" ? "text-primary" : "text-slate-400 hover:text-white"}`}
            >
              EN
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLang("HI")}
              className={`${lang === "HI" ? "text-primary" : "text-slate-400 hover:text-white"}`}
            >
              हिंदी
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLang("KN")}
              className={`${lang === "KN" ? "text-primary" : "text-slate-400 hover:text-white"}`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg bg-[#0c1429] border border-[#1e2f54] text-slate-300 hover:text-white">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-black flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Card */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1c2c52]">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
              alt="Worker Avatar"
              className="w-8 h-8 rounded-full border border-primary/50 object-cover"
            />
            <div className="text-left hidden md:block">
              <span className="block text-xs font-bold text-white leading-tight">
                {user?.name || "Ramesh Kumar"}
              </span>
              <span className="block text-[10px] text-primary">
                {user?.trade || "Electrician Grade-1"}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              title="Sign Out"
              className="p-1.5 ml-1 rounded-lg text-slate-400 hover:text-danger hover:bg-danger/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Matching Image 4 */}
        <aside className="w-64 bg-[#0a0f1e] border-r border-[#17233f] flex flex-col justify-between p-4 shrink-0 hidden lg:flex">
          <div className="space-y-4">
            {/* Status Card */}
            <div className="p-3.5 rounded-xl bg-[#0e162d] border border-[#1d2d54] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Status</span>
                <span className="font-mono font-bold text-primary">Worker #SK-4482</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Tradesperson</span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1 text-xs font-medium">
              {[
                { id: "overview", label: "Dashboard Overview", icon: HardHat, active: true },
                { id: "profile", label: "Profile & Skills", icon: User },
                { id: "documents", label: "Identity & Documents", icon: FileText },
                { id: "police", label: "Police Verification", icon: ShieldCheck },
                { id: "digital-id", label: "Digital Worker ID", icon: IdCard },
                { id: "payments", label: "Payments & Bank Setup", icon: CreditCard },
                { id: "work", label: "My Work & Opportunities", icon: Briefcase },
                { id: "officer", label: "Officer Review", icon: ShieldCheck, restricted: true },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "digital-id") setShowIdCardModal(true);
                      else if (item.id === "police") setShowOfficerModal(true);
                      else setActiveSection(item.id);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-primary text-[#051c11] font-bold shadow-glow-primary"
                        : "text-slate-300 hover:bg-[#121c38] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.restricted && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                        Restricted
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Helpline + Emergency SOS */}
          <div className="pt-4 border-t border-[#17233f] space-y-2.5">
            <div className="text-[11px] text-slate-400 leading-tight">
              <span>Helpline 1800-208-2244</span>
              <span className="block text-[10px] text-slate-500">Toll-Free 24x7 Support</span>
            </div>

            {/* Emergency SOS Button - Red */}
            <button
              onClick={() => alert("🚨 EMERGENCY SOS BROADCAST: Geolocation sent to Bengaluru Police Command & SahkarSathi Rapid Response.")}
              className="w-full py-2.5 rounded-xl bg-danger text-white text-xs font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Emergency SOS</span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium text-left flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area - Matching Image 4 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* Top Status Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                ✓ Cooperative Member #SK-4482
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101933] text-slate-300 border border-[#1e2f59] text-xs font-medium">
                Sector: Electrical & Solar Maintenance
              </span>
              <button
                onClick={() => setOnDuty(!onDuty)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  onDuty
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-700/30 text-slate-400 border-slate-600/30"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${onDuty ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                <span>On-Duty Availability: {onDuty ? "ACTIVE" : "OFF-DUTY"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0c142b] border border-[#1e2f54] text-xs">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-white font-bold">Safety Compliance 96%</span>
                <span className="text-slate-400 text-[10px]">Shield v2.4</span>
              </div>
              <button
                onClick={() => alert("Cluster Representative: Er. Vikram Singh (Delhi Guild #04). Contact: +91 99200 87654")}
                className="px-3 py-1 rounded-xl bg-[#0c142b] border border-[#1e2f54] text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <Users2 className="w-3.5 h-3.5 text-primary" />
                <span>Cluster Rep</span>
              </button>
            </div>
          </div>

          {/* Welcome Headline */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Welcome back, Ramesh Kumar
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Cooperative Member • <strong className="text-primary font-bold">Every Worker Matters. Every Home Counts.</strong>{" "}
              You have 1 mandatory police clearance review pending before full digital dispatch privileges activate.
            </p>
          </div>

          {/* Action Alert Banner (Amber) - Exactly matching Image 4 */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1b1912] to-amber-500/10 border border-amber-500/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-amber-300 font-heading">
                  Action Required: Complete Police Station Reference Validation
                </h3>
                <p className="text-xs text-slate-300">
                  Sub-Inspector assigned for physical residential validation at Hebbal Police Precinct. Ref:{" "}
                  <strong className="font-mono text-white">#PV-2025-0891</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowOfficerModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors shrink-0 shadow-md"
            >
              <span>Track Officer Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ACCREDITATION PIPELINE - 6 Step Cards matching Image 4 */}
          <div className="rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary block">
                    Accreditation Pipeline
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Onboarding & Tier-1 Worker Verification
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">5 of 6 steps completed or initiated</span>
                <div className="w-24 h-2 rounded-full bg-surface-2 overflow-hidden border border-[#1b2b4f]">
                  <div className="h-full bg-primary rounded-full" style={{ width: "83%" }} />
                </div>
              </div>
            </div>

            {/* 6 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 flex flex-col justify-between border transition-all ${
                      s.active
                        ? "bg-[#181d22] border-amber-500/60 ring-1 ring-amber-500/40 shadow-lg"
                        : "bg-[#090f21] border-[#18274a]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            s.completed
                              ? "bg-emerald-500/20 text-emerald-400"
                              : s.active
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-700/20 text-slate-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.badgeColor}`}
                        >
                          {s.badge}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        {s.step}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5 font-heading">
                        {s.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#1b2b4f]/60">
                      <span className="text-[10px] text-slate-400 block truncate">
                        {s.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incoming Job Opportunities & Dispatch Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h3 className="text-base font-bold text-white font-heading">
                    Live Dispatch Radar & Job Opportunities
                  </h3>
                </div>
                <span className="text-xs text-primary font-semibold">2 Matched Nearby</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#090f21] border border-[#1b2b4f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                        Direct Payout
                      </span>
                      <span className="text-xs font-bold text-white">Commercial MCB Replacement</span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">
                      Hebbal 3rd Stage • 1.2 km away • Scheduled for 03:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold text-white font-heading">₹950</span>
                    <button
                      onClick={() => alert("Job Accepted! Customer phone and exact address unlocked in dispatch.")}
                      className="px-4 py-1.5 rounded-lg bg-primary text-black text-xs font-bold hover:bg-primary-hover"
                    >
                      Accept
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090f21] border border-[#1b2b4f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-info/15 text-info text-[10px] font-bold">
                        Team Crew Project
                      </span>
                      <span className="text-xs font-bold text-white">Metro Line 4 Electrical Conduiting</span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">
                      Supervisor: Er. Vikram Singh • 4 Days milestone
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold text-white font-heading">₹3,400</span>
                    <button
                      onClick={() => alert("Milestone assignment joined! Added to supervisor muster roll.")}
                      className="px-4 py-1.5 rounded-lg bg-primary text-black text-xs font-bold hover:bg-primary-hover"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Digital Worker ID Preview */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IdCard className="w-4 h-4 text-primary" />
                  <h3 className="text-base font-bold text-white font-heading">
                    Verified Digital Worker ID
                  </h3>
                </div>
                <button
                  onClick={() => setShowIdCardModal(true)}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  View Full Card →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#080e1e] border border-primary/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-primary/40 flex items-center justify-center font-bold text-white">
                    RK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ramesh Kumar</h4>
                    <span className="text-xs text-primary block font-medium">
                      Master Electrician & Wireman
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      COOP ID: COOP-BLR-4482
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                  <span className="p-1.5 rounded bg-surface-2 border border-border">
                    ✓ Aadhaar eKYC: Verified
                  </span>
                  <span className="p-1.5 rounded bg-surface-2 border border-border">
                    ✓ e-Shram Linked: Yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Officer Tracking Modal */}
      {showOfficerModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0c142b] border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4f]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Police Clearance Reference</h3>
              </div>
              <button onClick={() => setShowOfficerModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p>Precinct: <strong>Hebbal Police Station, Bengaluru North</strong></p>
              <p>Reference: <strong className="font-mono text-amber-400">#PV-2025-0891</strong></p>
              <p>Assigned Officer: <strong>Sub-Inspector S. Patil (Badge #812)</strong></p>
              <p>Status: <strong>Physical Verification Scheduled for Tomorrow, 11:00 AM</strong></p>
            </div>
            <button
              onClick={() => setShowOfficerModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}

      {/* Digital ID Modal */}
      {showIdCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0c142b] border border-primary/40 p-6 shadow-2xl space-y-4 text-center">
            <h3 className="text-base font-bold text-white">Official SahkarSathi Worker Digital Credential</h3>
            <div className="p-4 bg-white rounded-xl inline-block mx-auto">
              <svg className="w-40 h-40 text-black" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                <rect x="40" y="10" width="10" height="20" />
                <rect x="10" y="40" width="20" height="10" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="70" y="40" width="20" height="10" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">
              Cooperative ID: <strong>COOP-BLR-4482</strong> • Direct QR Verification Enabled
            </p>
            <button
              onClick={() => setShowIdCardModal(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary-hover"
            >
              Close Credential
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
