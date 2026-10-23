import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Logo from "../../common/Logo";
import {
  Building2,
  Users2,
  HardHat,
  Search,
  Bell,
  LogOut,
  Download,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  CreditCard,
  Building,
  Check,
  FileText,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Filter,
  DollarSign,
  Smartphone,
  CheckCircle,
} from "lucide-react";

export default function SupervisorDashboard() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("payments"); // matching Image 2 view
  const [lang, setLang] = useState("EN");
  const [autoDisburse, setAutoDisburse] = useState(true);
  const [selectedSite, setSelectedSite] = useState("All Active Sites");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: "TXN-89214-MM",
      client: "MMRDA Mumbai Infra Ltd",
      project: "Metro Line 4",
      milestone: "Phase 2 Slab Casting (#M4-02)",
      amount: "₹2,40,000",
      fee: "0% Co-op fee",
      method: "RTGS / Axis Bank",
      ref: "UTR-81920049182",
      status: "Released",
      statusColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "TXN-89190-DL",
      client: "Green Valley Res. Assoc",
      project: "Model Town Site G+2",
      milestone: "Foundation PCC & Waterproofing",
      amount: "₹1,80,000",
      fee: "0% Co-op fee",
      method: "IMPS / HDFC Bank",
      ref: "UTR-77192830192",
      status: "Released",
      statusColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "TXN-89301-KA",
      client: "Skyline Heights Project",
      project: "Tower B Renovation",
      milestone: "Concealed Wiring & Conduiting",
      amount: "₹1,20,000",
      fee: "0% Co-op fee",
      method: "NEFT / ICICI Bank",
      ref: "Escrow Locked",
      status: "Pending Escrow",
      statusColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
  ];

  const filteredTxns = transactions.filter((tx) => {
    const matchQuery =
      tx.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || tx.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchQuery && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#070b16] text-[#dee1f9] flex flex-col font-sans">
      {/* Top Header Navbar - Matching Image 2 */}
      <header className="border-b border-[#17233f] bg-[#0A1022]/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="default" />
          </Link>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 pl-3 border-l border-[#1c2c52]">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Supervisor Suite
            </span>
          </div>
        </div>

        {/* Search Bar & Sites Dropdown */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workers, live tasks, project IDs... Ctrl K"
              className="w-full bg-[#0c142b] border border-[#1b2b4f] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="bg-[#0c142b] border border-[#1b2b4f] rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-primary"
          >
            <option>All Active Sites</option>
            <option>Model Town Site G+2</option>
            <option>Metro Line 4</option>
            <option>Skyline Heights</option>
          </select>
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
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
            >
              Worker
            </button>
            <button
              onClick={() => {
                switchRole("supervisor");
                navigate("/supervisor/dashboard");
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary text-[#051c11]"
            >
              Supervisor
            </button>
          </div>

          {/* Lang Toggle [EN | हिंदी] */}
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
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg bg-[#0c1429] border border-[#1e2f54] text-slate-300 hover:text-white">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-black flex items-center justify-center">
              3
            </span>
          </button>

          {/* Supervisor Profile Card */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1c2c52]">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"}
              alt="Supervisor Avatar"
              className="w-8 h-8 rounded-full border border-primary/50 object-cover"
            />
            <div className="text-left hidden lg:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">{user?.name || "Rohit Sharma"}</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                  On Duty
                </span>
              </div>
              <span className="block text-[10px] text-slate-400">
                {user?.society || "Senior Project Supervisor • Shramik Kalyan Co-op #4102"}
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

      {/* Main Layout: Left Sidebar + Center Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Exactly matching Image 2 */}
        <aside className="w-64 bg-[#0a0f1e] border-r border-[#17233f] flex flex-col justify-between p-4 shrink-0 hidden lg:flex overflow-y-auto">
          <div className="space-y-6">
            {/* Group 1: COMMAND CENTER */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-3">
                Command Center
              </span>
              <nav className="space-y-1 text-xs">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "my-projects", label: "My Projects" },
                  { id: "running-projects", label: "Running Projects" },
                  { id: "history", label: "Project History" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-[#051c11] font-bold"
                        : "text-slate-300 hover:bg-[#121c38] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Group 2: FIELD WORKFORCE */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-3">
                Field Workforce
              </span>
              <nav className="space-y-1 text-xs">
                {[
                  { id: "workers", label: "Worker Management" },
                  { id: "tasks", label: "Task Allocation" },
                  { id: "attendance", label: "Attendance" },
                  { id: "schedule", label: "Schedule & Milestones" },
                  { id: "issues", label: "Issues & Complaints" },
                  { id: "workload", label: "Team & Workload" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-[#051c11] font-bold"
                        : "text-slate-300 hover:bg-[#121c38] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Group 3: GOVERNANCE & INSIGHTS - Active in Image 2 */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-3">
                Governance & Insights
              </span>
              <nav className="space-y-1 text-xs">
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl transition-colors flex items-center justify-between ${
                    activeTab === "payments"
                      ? "bg-primary text-[#051c11] font-bold shadow-glow-primary"
                      : "text-slate-300 hover:bg-[#121c38] hover:text-white"
                  }`}
                >
                  <span>Payments & Payouts</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Sign Out */}
          <div className="pt-4 border-t border-[#17233f]">
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

        {/* Main Content Workspace - Matching Image 2 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* Breadcrumb & Title Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Dashboard</span>
                <span>›</span>
                <span>Governance & Finance</span>
                <span>›</span>
                <span className="text-primary font-semibold">Payments & Payouts</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                  Payments & Co-op Escrow Disbursements
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  RBI COMPLIANT CO-OP ESCROW
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-[#0c142b] border border-[#1b2b4f]">
                  Society #4102 Audited
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Track incoming customer milestone payments, oversee escrow disbursements, manage payout
                settlement bank accounts and UPI IDs for seamless cooperative transfers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
              <button
                onClick={() => alert("Exporting cooperative audit ledger as CSV/PDF...")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0c142b] border border-[#1b2b4f] text-xs font-semibold text-slate-300 hover:text-white"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Export Ledger (CSV/PDF)</span>
              </button>

              <button
                onClick={() => alert("Milestone Advance Request submitted to Society #4102 Treasurers.")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-[#051c11] text-xs font-bold hover:bg-primary-hover shadow-glow-primary"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Request Milestone Advance</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Cards - Exactly matching Image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Total Escrow Received */}
            <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>TOTAL ESCROW RECEIVED</span>
                <Building className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white font-heading">₹8,45,200</span>
                <span className="text-xs font-bold text-emerald-400 ml-2">+14.2%</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span>Current cooperative billing cycle</span>
                <div className="flex items-center justify-between font-medium text-slate-300 pt-1 border-t border-[#1b2b4f]/60">
                  <span>Disbursed to Labour: 82%</span>
                  <span className="text-white font-bold">₹6,93,064</span>
                </div>
              </div>
            </div>

            {/* Stat 2: Pending Milestone Sign-Off */}
            <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>PENDING MILESTONE SIGN-OFF</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white font-heading">₹1,85,000</span>
                <span className="text-xs font-bold text-amber-300 ml-2">3 Milestones</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span>MMRDA, BMC & Green Valley audits</span>
                <div className="flex items-center justify-between font-medium text-amber-300 pt-1 border-t border-[#1b2b4f]/60">
                  <span>Inspection Window:</span>
                  <span className="font-bold">&lt; 48 hrs left</span>
                </div>
              </div>
            </div>

            {/* Stat 3: Ready for Bank Settlement */}
            <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>READY FOR BANK SETTLEMENT</span>
                <CreditCard className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white font-heading">₹92,400</span>
                <span className="text-xs font-bold text-emerald-400 ml-2">● Ready</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span>Auto-settlement queued for today</span>
                <div className="flex items-center justify-between font-medium text-slate-300 pt-1 border-t border-[#1b2b4f]/60">
                  <span>Target Dispatch:</span>
                  <span className="text-white font-bold">18:00 IST Today (SBI)</span>
                </div>
              </div>
            </div>

            {/* Stat 4: Payout Channels */}
            <div className="p-5 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>PAYOUT CHANNELS</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="my-2">
                <span className="text-2xl font-extrabold text-white font-heading">2 Channels</span>
                <span className="text-xs font-bold text-emerald-400 ml-2">Instant Ready</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span>1 Escrow Bank A/C + 1 Verified UPI</span>
                <div className="flex items-center justify-between font-medium text-sky-300 pt-1 border-t border-[#1b2b4f]/60">
                  <span>NPCI Penny-Drop:</span>
                  <span className="font-bold">Valid & Audited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Grid: Client Milestone & Escrow Inflow Ledger (Left) + Receiving Methods (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left (8 cols): Client Milestone & Escrow Inflow Ledger */}
            <div className="lg:col-span-8 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2b4f]">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Client Milestone & Escrow Inflow Ledger
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live verification of contract escrow releases, supervisor authorizations, and platform settlements.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 self-start sm:self-center">
                  ✓ Zero-Fee Co-op Guarantee
                </span>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search TXN ID, client, or milestone..."
                    className="w-full bg-[#080e1e] border border-[#1b2b4f] rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#080e1e] border border-[#1b2b4f] rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                  >
                    <option value="All">Status: All</option>
                    <option value="Released">Released</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1b2b4f] text-[10px] font-bold uppercase text-slate-400">
                      <th className="py-2.5 px-2">Transaction & Client</th>
                      <th className="py-2.5 px-2">Project & Milestone</th>
                      <th className="py-2.5 px-2">Amount & Fee</th>
                      <th className="py-2.5 px-2">Method & Ref</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#17233f]">
                    {filteredTxns.map((t) => (
                      <tr key={t.id} className="hover:bg-[#101830] transition-colors">
                        <td className="py-3 px-2 font-medium">
                          <span className="font-mono font-bold text-white block">{t.id}</span>
                          <span className="text-[11px] text-slate-400">{t.client}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-white font-bold block">{t.project}</span>
                          <span className="text-[11px] text-slate-400">{t.milestone}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="font-extrabold text-white font-heading block">{t.amount}</span>
                          <span className="text-[10px] text-emerald-400 font-bold">{t.fee}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-white block">{t.method}</span>
                          <span className="text-[10px] font-mono text-slate-400">{t.ref}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t.statusColor}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => alert(`Inspecting audit ledger for ${t.id}`)}
                            className="p-1.5 rounded-lg bg-[#080e1e] hover:bg-surface-2 text-slate-300 hover:text-white"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right (4 cols): Receiving Methods - Matching Image 2 */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0c142b] border border-[#1b2b4f] p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4f]">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Receiving Methods
                  </h3>
                  <p className="text-xs text-slate-400">Your verified disbursement targets</p>
                </div>
                {/* Auto-Disbursement Toggle */}
                <button
                  type="button"
                  onClick={() => setAutoDisburse(!autoDisburse)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    autoDisburse ? "bg-primary" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      autoDisburse ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Auto-Disbursement:</span>
                <span className="font-bold text-emerald-300">
                  {autoDisburse ? "Enabled (Daily 18:00 IST)" : "Paused"}
                </span>
              </div>

              {/* Bank Account Card */}
              <div className="p-4 rounded-xl bg-[#080e1e] border border-primary/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-white">State Bank of India (SBI)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    ● Primary
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <p className="text-[11px] text-slate-400">Commercial Co-op Branch, Fort</p>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Holder:</span>
                    <span className="font-bold text-white">Rohit Sharma (Society #4102)</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Account:</span>
                    <span className="font-bold text-white">•••• •••• •••• 6842</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">IFSC:</span>
                    <span className="text-white">SBIN0001842</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1b2b4f] flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-medium">✓ NPCI Penny-Drop Confirmed</span>
                  <button
                    onClick={() => alert("Bank Account details verified under RBI Co-op Escrow.")}
                    className="text-primary hover:underline font-bold"
                  >
                    Edit Details
                  </button>
                </div>
              </div>

              {/* Secondary Channel */}
              <div className="p-3.5 rounded-xl bg-[#080e1e] border border-[#1b2b4f] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-white font-bold block">Secondary UPI ID</span>
                    <span className="text-[10px] text-slate-400 font-mono">rohit.sharma@sbi</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#13203f] text-slate-300">
                  Active
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
