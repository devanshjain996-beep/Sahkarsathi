import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { createProject, fetchCustomerProjects } from "../../../services/supabaseService";
import Logo from "../../common/Logo";
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  CreditCard,
  Building,
  User,
  HardHat,
  Users2,
  Phone,
  MapPin,
  ExternalLink,
  Receipt,
  Search,
  Filter,
  Check,
  X,
  Smartphone,
  LogOut,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboard() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "explore" | "find" | "team"
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [paidSuccess, setPaidSuccess] = useState(false);

  // Live Supabase Projects State
  const [liveProjects, setLiveProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isPostingProject, setIsPostingProject] = useState(false);
  const [projectFeedback, setProjectFeedback] = useState("");

  const [projTitle, setProjTitle] = useState("");
  const [projTrade, setProjTrade] = useState("Electrical Works");
  const [projLocation, setProjLocation] = useState(user?.address || "Flat 402, Shanti Vihar, Rohini Sector-9, New Delhi");
  const [projBudget, setProjBudget] = useState("3500");
  const [projDesc, setProjDesc] = useState("");

  const loadProjects = async () => {
    if (!user?.id) return;
    setLoadingProjects(true);
    const res = await fetchCustomerProjects(user.id);
    if (res.success) {
      setLiveProjects(res.projects);
    }
    setLoadingProjects(false);
  };

  React.useEffect(() => {
    loadProjects();
  }, [user?.id]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    setIsPostingProject(true);
    setProjectFeedback("");

    const res = await createProject({
      customerId: user.id,
      title: projTitle,
      description: projDesc || `Comprehensive ${projTrade} service and safety inspection required.`,
      location: projLocation,
      budget: projBudget,
      requiredSkills: [projTrade],
    });

    if (res.success) {
      setProjectFeedback("Project successfully posted! Workers in your cluster can now review and apply.");
      setProjTitle("");
      setProjDesc("");
      setTimeout(() => {
        setShowCreateModal(false);
        setProjectFeedback("");
        loadProjects();
      }, 1500);
    } else {
      setProjectFeedback(`Error: ${res.error}`);
    }
    setIsPostingProject(false);
  };

  const bookings = [
    {
      id: "BK-8841",
      trade: "Electrical Works",
      status: "Service Completed",
      statusColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      title: "Emergency Inverter Wiring & MCB Replacement",
      time: "Today, 10:30 AM - 12:45 PM",
      location: user?.address || "Flat 402, Shanti Vihar, Rohini Sector-9, New Delhi",
      provider: "Suresh Kumar",
      providerRole: "Accredited Worker (Direct Payout)",
      providerCode: "SK-402",
      amount: "₹1,850.00",
      numericAmount: 1850,
      scope: "Main 32A MCB isolator short diagnosed & replaced with ISI-standard breaker",
      canPay: true,
      upiId: "suresh.kumar@sbi",
    },
    {
      id: "BK-8839",
      trade: "Plumbing Works",
      status: "Worker En Route",
      statusColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      title: "Kitchen Dual Pipeline Leakage & Valve Repair",
      time: "Today, Scheduled 02:00 PM",
      location: user?.address || "Flat 402, Shanti Vihar, Rohini Sector-9, New Delhi",
      provider: "Anil Kushwaha",
      providerRole: "Master Plumber #SK-109",
      providerCode: "SK-109",
      amount: "₹490.00",
      numericAmount: 490,
      scope: "CPVC pipeline pressure check, stopcock seal replacement, and tap aeration",
      canPay: false,
      otp: "8492",
    },
  ];

  const handleOpenPay = (booking) => {
    setSelectedBooking(booking);
    setPaidSuccess(false);
    setUtrInput("");
    setShowQrModal(true);
  };

  const handleConfirmUtr = (e) => {
    e.preventDefault();
    if (utrInput.length >= 8) {
      setPaidSuccess(true);
      setTimeout(() => {
        setShowQrModal(false);
        alert(`Payment of ${selectedBooking.amount} confirmed via UPI UTR: ${utrInput}! Receipt issued.`);
      }, 1200);
    } else {
      alert("Please enter a valid 12-digit UPI UTR reference number.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-[#e8ecf6] flex flex-col font-sans">
      {/* Top Header Navbar - Matching Image 1 */}
      <header className="border-b border-[#17233f] bg-[#0A1022]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="default" />
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/15 text-primary border border-primary/30">
            Co-op Network
          </span>
        </div>

        {/* Quick View Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#0c1429] p-1 rounded-xl border border-[#1e2f54]">
          <button
            onClick={() => {
              switchRole("customer");
              navigate("/customer/dashboard");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-[#051c11] shadow-glow-primary"
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer View</span>
          </button>

          <button
            onClick={() => {
              switchRole("worker");
              navigate("/worker/dashboard");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Worker View</span>
          </button>

          <button
            onClick={() => {
              switchRole("supervisor");
              navigate("/supervisor/dashboard");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Supervisor View</span>
          </button>
        </div>

        {/* Right Controls: Gateway Pill, Settings & User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0c1429] border border-[#1e2f54] text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Gateway:</span>
            <span className="text-white font-bold">DIRECT_UPI</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[9px]">
              TEST MODE
            </span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#1e2f54]">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-primary/40 object-cover"
            />
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white leading-tight">
                {user?.name || "Rahul Sharma"}
              </span>
              <span className="block text-[10px] text-primary">
                {user?.roleLabel || "Household Customer"}
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Breadcrumb & Main Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Customer Portal</span>
              <span>›</span>
              <span className="text-primary font-semibold">Active Bookings & Service Payments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
              Household Bookings & Direct UPI Payments
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Review completed home services, view accredited workers, and make verified UPI payments
              using official recipient QR codes.
            </p>
          </div>

          <div className="self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Zero Intermediary Deductions</span>
            </span>
          </div>
        </div>

        {/* 4 Metric Cards - Matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Eligible for Payment</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-white font-heading">2 Bookings</span>
            </div>
            <span className="text-xs text-primary font-medium">Ready for UPI QR scan</span>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pending Confirmation</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-amber-400 font-heading">1 Payment</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">UTR queued for review</span>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Co-op Settled</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-white font-heading">₹8,400.00</span>
            </div>
            <span className="text-xs text-primary font-medium">100% credited to trades</span>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Supported UPI Apps</span>
              <Smartphone className="w-4 h-4 text-sky-400" />
            </div>
            <div className="my-2">
              <span className="text-base font-bold text-white">GPay • PhonePe • Paytm • BHIM</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Any NPCI certified UPI client</span>
          </div>
        </div>

        {/* Lower Grid: Active Bookings List (Left) + How SahkarSathi UPI Works (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Bookings */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h3 className="text-lg font-bold font-heading text-white">
                  Your Active Bookings & Service Milestones
                </h3>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Click "Pay for Service" to open UPI QR
              </span>
            </div>

            {/* Booking Cards */}
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-[#0c142b] border border-[#1c2c54] p-5 sm:p-6 shadow-xl space-y-4 hover:border-primary/50 transition-colors"
                >
                  {/* Top Bar: Code, Trade & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#13203f] border border-[#223561] text-xs font-mono font-bold text-primary">
                        {b.id}
                      </span>
                      <span className="text-xs font-bold text-slate-300">{b.trade}</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${b.statusColor}`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Title & Timing */}
                  <div>
                    <h4 className="text-lg font-bold text-white font-heading">{b.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{b.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{b.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Provider Pill & Agreed Amount */}
                  <div className="p-3.5 rounded-xl bg-[#080e1e] border border-[#19274a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                        {b.provider.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{b.provider}</span>
                        <span className="text-[11px] text-primary">{b.providerRole}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        AGREED AMOUNT
                      </span>
                      <span className="text-lg font-extrabold text-white font-heading">
                        {b.amount}
                      </span>
                    </div>
                  </div>

                  {/* Scope Details */}
                  <div className="text-xs text-slate-300 bg-[#0c142b] p-3 rounded-xl border border-[#1b2b4f]/70">
                    <span className="text-primary font-semibold block mb-0.5">
                      SERVICE COMPLETION SCOPE:
                    </span>
                    <span>✓ {b.scope}</span>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#19274a]">
                    {b.canPay ? (
                      <>
                        <span className="text-xs text-emerald-300 font-medium">
                          Inspection signed off. Ready for QR reconciliation.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenPay(b)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#051c11] text-xs font-bold hover:bg-primary-hover shadow-glow-primary transition-all"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Pay for Service (UPI QR)</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-slate-400">
                          Worker OTP for Arrival Verification:{" "}
                          <strong className="text-emerald-400 font-mono text-sm tracking-wider">
                            {b.otp}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => alert(`Calling ${b.provider} via masked cooperative privacy dialer...`)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-white hover:bg-[#18274d] transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>Call Worker</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: How SahkarSathi UPI Works - Matching Image 1 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0c142b] border border-[#1c2c54] p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#1b2b4f]">
                <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-white">
                    How SahkarSathi UPI Works
                  </h4>
                  <p className="text-xs text-primary font-medium">
                    Direct, fair, peer-to-peer settlement
                  </p>
                </div>
              </div>

              {/* 4 Steps */}
              <ol className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-surface-2 border border-primary/40 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Worker completes service and performs diagnostic sign-off.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-surface-2 border border-primary/40 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Click <strong>Pay for Service</strong> to see the authorized recipient's verified UPI QR code.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-surface-2 border border-primary/40 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Scan using Google Pay, PhonePe, or Paytm and complete payment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-surface-2 border border-primary/40 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    4
                  </span>
                  <span>Enter the 12-digit UPI UTR reference to initiate authenticated reconciliation.</span>
                </li>
              </ol>

              {/* Zero Commission Policy Notice - Matching Image 1 */}
              <div className="p-4 rounded-xl bg-[#080e1e] border border-primary/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Zero Commission Policy:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  100% of the agreed service amount goes to the service provider. SahkarSathi charges zero
                  platform cuts on cooperative labor.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Customer Services Hub
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/services"
                  className="p-3 rounded-xl bg-surface-2 border border-border hover:border-primary/40 text-xs font-bold text-white text-center transition-colors"
                >
                  Explore Catalog
                </Link>
                <Link
                  to="/projects"
                  className="p-3 rounded-xl bg-surface-2 border border-border hover:border-primary/40 text-xs font-bold text-white text-center transition-colors"
                >
                  Book Team Crew
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Create Cooperative Project Modal */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-lg rounded-2xl bg-[#0c142b] border border-primary/40 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4f]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-white font-heading">
                  Post New Cooperative Project
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {projectFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  projectFeedback.includes("Error")
                    ? "bg-danger/20 text-danger border border-danger/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{projectFeedback}</span>
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Master Bedroom Concealed Wiring & Inverter Installation"
                  className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Trade Requirement
                  </label>
                  <select
                    value={projTrade}
                    onChange={(e) => setProjTrade(e.target.value)}
                    className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Electrical Works">Electrical Works</option>
                    <option value="Plumbing Works">Plumbing Works</option>
                    <option value="Painting & Waterproofing">Painting & Waterproofing</option>
                    <option value="Carpentry & Framing">Carpentry & Framing</option>
                    <option value="Masonry & Tile Fitting">Masonry & Tile Fitting</option>
                    <option value="Solar Panel Repair">Solar Panel Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Estimated Budget (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={projBudget}
                    onChange={(e) => setProjBudget(e.target.value)}
                    className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Location / Site Address *
                </label>
                <input
                  type="text"
                  required
                  value={projLocation}
                  onChange={(e) => setProjLocation(e.target.value)}
                  placeholder="Street, Sector, City"
                  className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Scope & Details
                </label>
                <textarea
                  rows="3"
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="Describe material requirements, timeline, or site access details..."
                  className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#1b2b4f]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPostingProject}
                  className="px-5 py-2 rounded-xl bg-primary text-[#051c11] text-xs font-bold shadow-glow-primary hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {isPostingProject ? "Creating in Supabase..." : "Post Project to Cooperative"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPI QR Payment Modal (Interactive Flow for Step 2 of Image 1) */}
      {showQrModal && selectedBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0c142b] border border-primary/40 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4f]">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-white">Scan Verified Co-op UPI QR</h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Center */}
            <div className="text-center space-y-3">
              <div className="p-4 bg-white rounded-2xl inline-block shadow-inner mx-auto">
                {/* SVG Mock QR Code */}
                <svg className="w-44 h-44 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="10" y="40" width="20" height="10" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="70" y="40" width="20" height="10" />
                  <rect x="40" y="70" width="10" height="20" />
                  <rect x="70" y="70" width="20" height="20" />
                </svg>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Recipient (Direct Worker Payout):</span>
                <strong className="text-sm text-white font-bold">{selectedBooking.provider}</strong>
                <span className="block text-xs font-mono text-primary mt-0.5">
                  UPI ID: {selectedBooking.upiId}
                </span>
                <span className="block text-xl font-extrabold text-white font-heading mt-2">
                  {selectedBooking.amount}
                </span>
              </div>
            </div>

            {/* UTR Form */}
            <form onSubmit={handleConfirmUtr} className="space-y-3 pt-2 border-t border-[#1b2b4f]">
              <label className="block text-xs font-bold text-slate-300">
                Enter 12-Digit UPI UTR Reference:
              </label>
              <input
                type="text"
                required
                value={utrInput}
                onChange={(e) => setUtrInput(e.target.value)}
                placeholder="e.g. 429188401928"
                className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-xl px-3.5 py-2.5 text-sm font-mono text-white text-center tracking-widest focus:outline-none focus:border-primary"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-[#051c11] text-xs font-bold hover:bg-primary-hover shadow-glow-primary transition-all"
              >
                {paidSuccess ? "✓ Payment Reconciled!" : "Submit UTR for Direct Settlement"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
