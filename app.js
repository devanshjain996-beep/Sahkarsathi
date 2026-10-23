/**
 * SAKHARSATHI (SahkariGig) Supervisor Operations Dashboard
 * Core Application Logic, State Management & Interactivity
 */

// --- Initial Data Stores ---
const initialData = {
  supervisor: {
    name: "Rajesh Varma",
    nameHi: "राजेश वर्मा",
    role: "Senior Project Supervisor",
    roleHi: "वरिष्ठ परियोजना पर्यवेक्षक",
    coopUnit: "DL-204",
    society: "Delhi Shramik Sahkari Society",
    societyHi: "दिल्ली श्रमिक सहकारी समिति",
    base: "Sector 11 Base, North Delhi",
    baseHi: "सेक्टर 11 बेस, उत्तर दिल्ली",
    shift: "08:00 AM - 05:30 PM",
    shiftHi: "सुबह 08:00 - शाम 05:30"
  },
  
  projects: [
    {
      id: "PRJ-2026-084",
      title: "Rohini Sector-9 Community Hall Renovation",
      titleHi: "रोहिणी सेक्टर-9 कम्युनिटी हॉल नवीनीकरण",
      client: "Delhi Cooperative Housing Society Ltd.",
      location: "Sector 9, Rohini, New Delhi",
      category: "renovation",
      trade: "Masonry + Structural",
      tradeHi: "राजमिस्त्री एवं संरचनात्मक",
      status: "delayed",
      statusLabel: "Delayed (Material)",
      statusLabelHi: "विलंबित (सामग्री कमी)",
      priority: "high",
      priorityLabel: "High Priority",
      priorityLabelHi: "उच्च प्राथमिकता",
      progress: 68,
      tasksDone: 19,
      tasksTotal: 28,
      blockedTasks: 4,
      startDate: "15 Jan 2026",
      targetDate: "28 Feb 2026",
      dueDays: 18,
      crewLead: "Dinesh Prasad",
      crewCount: 12,
      budget: "₹5.40L",
      budgetSpent: "₹3.65L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNs4NbmioN4Gvlo-YmS3v-_zBzkwCuWBpe2dJSCcGk9NV_bJEKIsL-NWtewl254dXKlHyO_sF9vq2FG-BLOktqSChrkovyJxze6xqAxw4X42qM4-r4wHs0VaU59O73fNHscWUWTYsgOb_Jqu5iRTSQzSpOt0J94ZVu99301DTUO87SSxW4HiguO6AqGat89zfhXoIkPi_u7FrxIzvGWo1pDlWXzwshQMa4WEPyZgCLZ91TDDSl-WDVA",
      milestone: "Wall Plastering & Waterproofing Inspection",
      milestoneStatus: "Pending QA"
    },
    {
      id: "PRJ-2026-092",
      title: "Mayur Vihar Phase-1 Primary School Retrofit",
      titleHi: "मयूर विहार फेज-1 प्राथमिक विद्यालय जीर्णोद्धार",
      client: "Directorate of Education, NCT Delhi",
      location: "Pocket 4, Mayur Vihar-I, Delhi",
      category: "painting",
      trade: "Finishing & Carpentry",
      tradeHi: "फिनिशिंग एवं बढ़ईगीरी",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "medium",
      priorityLabel: "Normal Priority",
      priorityLabelHi: "सामान्य प्राथमिकता",
      progress: 82,
      tasksDone: 23,
      tasksTotal: 28,
      blockedTasks: 0,
      startDate: "02 Jan 2026",
      targetDate: "15 Feb 2026",
      dueDays: 7,
      crewLead: "Sunil Sharma",
      crewCount: 10,
      budget: "₹4.10L",
      budgetSpent: "₹3.35L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVBF_6XQ2WIie98PJqpyaCwnvBxKTmjCZfeAsSRNmQBg0UfKaDUisV-EiFyPajXk6ysNkOBiwVms-DCl--5WF6OA9M119hPMy9Ya_j38eyJ4wfPnykzHIPjAp2-hJcoFnqlokheHbE4aQyPTehlctNo6FqMnqfQ4OM3hmJj9Qp8r1MQy50kZV6_pNxhZ8GZc0g4cOiSDiogXogjhQ36PdSG8viWxD1vBXKPaVbF97w9yGpViU8DWW4A",
      milestone: "Final Acrylic Emulsion Coat & Window Trims",
      milestoneStatus: "Active"
    },
    {
      id: "PRJ-2026-091",
      title: "Dwarka DDA Flats Electrical Rewiring Phase II",
      titleHi: "द्वारका डीडीए फ्लैट्स विद्युत पुनर्वितरण चरण II",
      client: "Delhi Development Authority",
      location: "Sector 19B, Dwarka, New Delhi",
      category: "electrical",
      trade: "Heavy Electrical",
      tradeHi: "भारी विद्युत कार्य",
      status: "on_hold",
      statusLabel: "On Hold (Permit)",
      statusLabelHi: "स्थगित (अनुमति लंबित)",
      priority: "urgent",
      priorityLabel: "Urgent",
      priorityLabelHi: "अति आवश्यक",
      progress: 45,
      tasksDone: 11,
      tasksTotal: 24,
      blockedTasks: 3,
      startDate: "20 Jan 2026",
      targetDate: "10 Mar 2026",
      dueDays: 28,
      crewLead: "Vikas Chauhan",
      crewCount: 8,
      budget: "₹6.80L",
      budgetSpent: "₹3.05L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNs4NbmioN4Gvlo-YmS3v-_zBzkwCuWBpe2dJSCcGk9NV_bJEKIsL-NWtewl254dXKlHyO_sF9vq2FG-BLOktqSChrkovyJxze6xqAxw4X42qM4-r4wHs0VaU59O73fNHscWUWTYsgOb_Jqu5iRTSQzSpOt0J94ZVu99301DTUO87SSxW4HiguO6AqGat89zfhXoIkPi_u7FrxIzvGWo1pDlWXzwshQMa4WEPyZgCLZ91TDDSl-WDVA",
      milestone: "Municipal Busbar Charging & NDPL Signoff",
      milestoneStatus: "Locked"
    },
    {
      id: "PRJ-2026-095",
      title: "Janakpuri Community Dispensary Water Pipeline",
      titleHi: "जनकपुरी डिस्पेंसरी जल आपूर्ति पाइपलाइन",
      client: "Delhi Jal Board & Municipal Corporation",
      location: "Block C, Janakpuri, New Delhi",
      category: "plumbing",
      trade: "Sanitation & Mains",
      tradeHi: "जल-निकासी एवं मुख्य लाइन",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "high",
      priorityLabel: "High Priority",
      priorityLabelHi: "उच्च प्राथमिकता",
      progress: 91,
      tasksDone: 21,
      tasksTotal: 23,
      blockedTasks: 0,
      startDate: "10 Jan 2026",
      targetDate: "05 Feb 2026",
      dueDays: 3,
      crewLead: "Mohammad Irfan",
      crewCount: 6,
      budget: "₹3.20L",
      budgetSpent: "₹2.90L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVBF_6XQ2WIie98PJqpyaCwnvBxKTmjCZfeAsSRNmQBg0UfKaDUisV-EiFyPajXk6ysNkOBiwVms-DCl--5WF6OA9M119hPMy9Ya_j38eyJ4wfPnykzHIPjAp2-hJcoFnqlokheHbE4aQyPTehlctNo6FqMnqfQ4OM3hmJj9Qp8r1MQy50kZV6_pNxhZ8GZc0g4cOiSDiogXogjhQ36PdSG8viWxD1vBXKPaVbF97w9yGpViU8DWW4A",
      milestone: "Pressure Testing & Valve Commissioning",
      milestoneStatus: "Testing"
    },
    {
      id: "PRJ-2026-102",
      title: "Pitampura Cooperative Housing Block Plastering",
      titleHi: "पीतमपुरा सहकारी आवास ब्लॉक प्लास्टर कार्य",
      client: "Nav Bharat Co-op Society",
      location: "Pitampura Outer Ring Road, Delhi",
      category: "construction",
      trade: "Masonry & Scaffolding",
      tradeHi: "राजमिस्त्री एवं मचान",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "medium",
      priorityLabel: "Medium",
      priorityLabelHi: "मध्यम",
      progress: 54,
      tasksDone: 14,
      tasksTotal: 26,
      blockedTasks: 0,
      startDate: "18 Jan 2026",
      targetDate: "15 Mar 2026",
      dueDays: 32,
      crewLead: "Ramesh Kumar",
      crewCount: 8,
      budget: "₹7.50L",
      budgetSpent: "₹4.05L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNs4NbmioN4Gvlo-YmS3v-_zBzkwCuWBpe2dJSCcGk9NV_bJEKIsL-NWtewl254dXKlHyO_sF9vq2FG-BLOktqSChrkovyJxze6xqAxw4X42qM4-r4wHs0VaU59O73fNHscWUWTYsgOb_Jqu5iRTSQzSpOt0J94ZVu99301DTUO87SSxW4HiguO6AqGat89zfhXoIkPi_u7FrxIzvGWo1pDlWXzwshQMa4WEPyZgCLZ91TDDSl-WDVA",
      milestone: "External Elevation Scaffolding Stage 2",
      milestoneStatus: "In Progress"
    },
    {
      id: "PRJ-2026-105",
      title: "Karol Bagh Trade Market Electrical Overhaul",
      titleHi: "करोल बाग व्यापार केंद्र विद्युत मरम्मत",
      client: "Karol Bagh Traders Association",
      location: "Ajmal Khan Road, Karol Bagh",
      category: "electrical",
      trade: "Commercial Electrical",
      tradeHi: "व्यापारिक विद्युत",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "high",
      priorityLabel: "High",
      priorityLabelHi: "उच्च",
      progress: 73,
      tasksDone: 17,
      tasksTotal: 23,
      blockedTasks: 1,
      startDate: "08 Jan 2026",
      targetDate: "12 Feb 2026",
      dueDays: 8,
      crewLead: "Vikram Singh",
      crewCount: 7,
      budget: "₹5.80L",
      budgetSpent: "₹4.20L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVBF_6XQ2WIie98PJqpyaCwnvBxKTmjCZfeAsSRNmQBg0UfKaDUisV-EiFyPajXk6ysNkOBiwVms-DCl--5WF6OA9M119hPMy9Ya_j38eyJ4wfPnykzHIPjAp2-hJcoFnqlokheHbE4aQyPTehlctNo6FqMnqfQ4OM3hmJj9Qp8r1MQy50kZV6_pNxhZ8GZc0g4cOiSDiogXogjhQ36PdSG8viWxD1vBXKPaVbF97w9yGpViU8DWW4A",
      milestone: "Fire Safety Conduit Installation",
      milestoneStatus: "Active"
    },
    {
      id: "PRJ-2026-110",
      title: "Vasant Kunj Community Center Ceiling Acoustic Paneling",
      titleHi: "वसंत कुंज केंद्र फॉल्स सीलिंग एवं ध्वनिक पैनल",
      client: "South Delhi Municipal Council",
      location: "Sector B, Vasant Kunj",
      category: "renovation",
      trade: "Carpentry & False Ceiling",
      tradeHi: "बढ़ईगीरी एवं सीलिंग",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "medium",
      priorityLabel: "Medium",
      priorityLabelHi: "मध्यम",
      progress: 62,
      tasksDone: 13,
      tasksTotal: 21,
      blockedTasks: 0,
      startDate: "12 Jan 2026",
      targetDate: "20 Feb 2026",
      dueDays: 12,
      crewLead: "Sunil Sharma",
      crewCount: 5,
      budget: "₹3.90L",
      budgetSpent: "₹2.45L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNs4NbmioN4Gvlo-YmS3v-_zBzkwCuWBpe2dJSCcGk9NV_bJEKIsL-NWtewl254dXKlHyO_sF9vq2FG-BLOktqSChrkovyJxze6xqAxw4X42qM4-r4wHs0VaU59O73fNHscWUWTYsgOb_Jqu5iRTSQzSpOt0J94ZVu99301DTUO87SSxW4HiguO6AqGat89zfhXoIkPi_u7FrxIzvGWo1pDlWXzwshQMa4WEPyZgCLZ91TDDSl-WDVA",
      milestone: "Acoustic Insulation Batt Laying",
      milestoneStatus: "In Progress"
    },
    {
      id: "PRJ-2026-114",
      title: "Shahdara Municipal Ward Office Exterior Waterproofing",
      titleHi: "शाहदरा वार्ड कार्यालय बाहरी वाटरप्रूफिंग",
      client: "East Delhi Municipal Board",
      location: "Shahdara Main Road, East Delhi",
      category: "construction",
      trade: "Waterproofing & Masonry",
      tradeHi: "वाटरप्रूफिंग एवं राजमिस्त्री",
      status: "in_progress",
      statusLabel: "In Progress",
      statusLabelHi: "प्रगति पर",
      priority: "high",
      priorityLabel: "High",
      priorityLabelHi: "उच्च",
      progress: 38,
      tasksDone: 6,
      tasksTotal: 16,
      blockedTasks: 0,
      startDate: "22 Jan 2026",
      targetDate: "25 Feb 2026",
      dueDays: 16,
      crewLead: "Harish Chandra",
      crewCount: 6,
      budget: "₹3.10L",
      budgetSpent: "₹1.18L",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVBF_6XQ2WIie98PJqpyaCwnvBxKTmjCZfeAsSRNmQBg0UfKaDUisV-EiFyPajXk6ysNkOBiwVms-DCl--5WF6OA9M119hPMy9Ya_j38eyJ4wfPnykzHIPjAp2-hJcoFnqlokheHbE4aQyPTehlctNo6FqMnqfQ4OM3hmJj9Qp8r1MQy50kZV6_pNxhZ8GZc0g4cOiSDiogXogjhQ36PdSG8viWxD1vBXKPaVbF97w9yGpViU8DWW4A",
      milestone: "Surface Grinding & Primer Application",
      milestoneStatus: "Active"
    }
  ],

  workers: [
    {
      id: "#WK-2026-4412",
      name: "Harish Chandra",
      nameHi: "हरीश चंद्र",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTHVd22l8xrJQdLw8zNvqO4Co3XddjdN-agcejKPNtzxczNtDbwW0cMSwXK-WllZ-6IUU-doM1m7r4I0Ira0vg8byLHHQCgEAhWpS3MaO-3j23m4ndvaRyxg82rC5m78oNbNb8G7gcvFiWthbLEXERdYSaDKpbOKRk8r2bQI59goWoIOfOzsqnpv3bnJFYlKTbkdypCQnSOap7NchtdgRm30M7jxh-A4PaFiihXpe__DLJaT7H4fvug",
      trade: "masonry",
      tradeLabel: "Master Mason",
      tradeLabelHi: "वरिष्ठ राजमिस्त्री",
      skills: ["Stone Masonry", "RCC Casting", "Leveling"],
      site: "Rohini Sec-9 Hall",
      siteId: "PRJ-2026-084",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "07:54 AM",
      verification: "Aadhaar Geo-verified",
      rating: 4.9,
      reviews: 48,
      dailyWage: "₹850",
      mobile: "+91 98112-34012",
      attendanceRate: 98.5,
      memberSince: "Mar 2023"
    },
    {
      id: "#WK-2026-3108",
      name: "Sunil Sharma",
      nameHi: "सुनील शर्मा",
      avatar: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=150&auto=format&fit=crop&q=80",
      trade: "carpentry",
      tradeLabel: "Lead Carpenter Grade-A",
      tradeLabelHi: "मुख्य बढ़ई (ग्रेड-ए)",
      skills: ["False Ceiling", "Formwork", "Acoustic Panels"],
      site: "Mayur Vihar School",
      siteId: "PRJ-2026-092",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "08:02 AM",
      verification: "Biometric Punch",
      rating: 4.8,
      reviews: 52,
      dailyWage: "₹820",
      mobile: "+91 97184-55921",
      attendanceRate: 96.0,
      memberSince: "Jan 2022"
    },
    {
      id: "#WK-2026-2914",
      name: "Vikram Singh",
      nameHi: "विक्रम सिंह",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      trade: "electrical",
      tradeLabel: "Senior Wireman (Grade-1)",
      tradeLabelHi: "वरिष्ठ वायरमैन (ग्रेड-1)",
      skills: ["Industrial HT/LT", "Busbar Routing", "Distribution Boards"],
      site: "Dwarka DDA Flats",
      siteId: "PRJ-2026-091",
      status: "present",
      statusLabel: "Present (Standby)",
      statusLabelHi: "उपस्थित (प्रतीक्षारत)",
      checkInTime: "08:12 AM",
      verification: "Biometric Verified",
      rating: 4.95,
      reviews: 64,
      dailyWage: "₹900",
      mobile: "+91 98910-11204",
      attendanceRate: 99.1,
      memberSince: "Jun 2021"
    },
    {
      id: "#WK-2026-1042",
      name: "Ramesh Kumar",
      nameHi: "रमेश कुमार",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      trade: "masonry",
      tradeLabel: "Structural Mason",
      tradeLabelHi: "संरचनात्मक राजमिस्त्री",
      skills: ["Brickwork", "Plastering", "Column Centering"],
      site: "Pitampura Housing Block",
      siteId: "PRJ-2026-102",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "07:58 AM",
      verification: "Aadhaar Geo-verified",
      rating: 4.7,
      reviews: 39,
      dailyWage: "₹780",
      mobile: "+91 98711-20943",
      attendanceRate: 94.8,
      memberSince: "Nov 2023"
    },
    {
      id: "#WK-2026-5521",
      name: "Mohammad Irfan",
      nameHi: "मोहम्मद इरफ़ान",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      trade: "plumbing",
      tradeLabel: "Master Plumber",
      tradeLabelHi: "वरिष्ठ प्लंबर",
      skills: ["High Pressure CPVC", "Sewer Mains", "Booster Pumps"],
      site: "Janakpuri Dispensary",
      siteId: "PRJ-2026-095",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "08:10 AM",
      verification: "Biometric Punch",
      rating: 4.85,
      reviews: 44,
      dailyWage: "₹850",
      mobile: "+91 99113-77641",
      attendanceRate: 97.2,
      memberSince: "Aug 2022"
    },
    {
      id: "#WK-2026-0408",
      name: "Sunil Meena",
      nameHi: "सुनील मीणा",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      trade: "painting",
      tradeLabel: "Commercial Painter",
      tradeLabelHi: "व्यावसायिक पेंटर",
      skills: ["Airless Spray", "Texture Design", "Waterproof Coatings"],
      site: "Mayur Vihar School",
      siteId: "PRJ-2026-092",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "08:05 AM",
      verification: "Biometric Punch",
      rating: 4.65,
      reviews: 31,
      dailyWage: "₹750",
      mobile: "+91 96541-09823",
      attendanceRate: 93.4,
      memberSince: "Feb 2024"
    },
    {
      id: "#WK-2026-0752",
      name: "Balbir Paswan",
      nameHi: "बलबीर पासवान",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      trade: "plumbing",
      tradeLabel: "Assistant Plumber",
      tradeLabelHi: "सहायक प्लंबर",
      skills: ["Pipe Threading", "Trench Excavation"],
      site: "Janakpuri Dispensary",
      siteId: "PRJ-2026-095",
      status: "absent",
      statusLabel: "Absent (Unreported)",
      statusLabelHi: "अनुपस्थित (असूचित)",
      checkInTime: "--:--",
      verification: "Unreported",
      rating: 4.2,
      reviews: 18,
      dailyWage: "₹650",
      mobile: "+91 98108-72091",
      attendanceRate: 88.0,
      memberSince: "May 2024"
    },
    {
      id: "#WK-2026-1108",
      name: "Manoj Sahni",
      nameHi: "मनोज साहनी",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      trade: "masonry",
      tradeLabel: "Mason Grade-B",
      tradeLabelHi: "राजमिस्त्री (ग्रेड-बी)",
      skills: ["Mortar Mixing", "Curing", "Flooring"],
      site: "Rohini Sec-9 Hall",
      siteId: "PRJ-2026-084",
      status: "on_leave",
      statusLabel: "On Leave (Medical)",
      statusLabelHi: "अवकाश पर (चिकित्सीय)",
      checkInTime: "Approved",
      verification: "Medical Slip Valid",
      rating: 4.5,
      reviews: 29,
      dailyWage: "₹720",
      mobile: "+91 97170-88312",
      attendanceRate: 91.5,
      memberSince: "Nov 2023"
    },
    {
      id: "#WK-2026-1219",
      name: "Amit Kushwaha",
      nameHi: "अमित कुशवाहा",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      trade: "electrical",
      tradeLabel: "Electrician Grade-2",
      tradeLabelHi: "इलेक्ट्रीशियन (ग्रेड-2)",
      skills: ["Conduit Laying", "MCB Box Wiring"],
      site: "Dwarka DDA Flats",
      siteId: "PRJ-2026-091",
      status: "present",
      statusLabel: "Present (Active)",
      statusLabelHi: "उपस्थित (सक्रिय)",
      checkInTime: "08:15 AM",
      verification: "Aadhaar Geo-verified",
      rating: 4.6,
      reviews: 26,
      dailyWage: "₹750",
      mobile: "+91 98114-66321",
      attendanceRate: 95.0,
      memberSince: "Aug 2023"
    },
    {
      id: "#WK-2026-6620",
      name: "Devendra Yadav",
      nameHi: "देवेन्द्र यादव",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      trade: "carpentry",
      tradeLabel: "Shuttering Specialist",
      tradeLabelHi: "शटरिंग विशेषज्ञ",
      skills: ["Plywood Centering", "Beam Boxing"],
      site: "Unassigned (Available)",
      siteId: "",
      status: "available",
      statusLabel: "Available (Bench)",
      statusLabelHi: "उपलब्ध (बेंच पर)",
      checkInTime: "07:50 AM",
      verification: "Biometric Verified",
      rating: 4.75,
      reviews: 35,
      dailyWage: "₹790",
      mobile: "+91 96500-22109",
      attendanceRate: 96.5,
      memberSince: "Sep 2022"
    }
  ],

  tasks: [
    {
      id: "TSK-401",
      title: "Procure 50 bags OPC 53 Cement",
      titleHi: "50 बैग ओपीसी 53 सीमेंट मंगवाएं",
      project: "Rohini Sector-9 Community Hall",
      projectId: "PRJ-2026-084",
      column: "todo",
      priority: "high",
      priorityLabel: "High Priority",
      trade: "Material Handling",
      assignee: "Unassigned",
      dueDate: "Tomorrow",
      description: "Emergency requisition submitted to society vendor; await delivery clearance."
    },
    {
      id: "TSK-408",
      title: "Install Sub-meter Panel B",
      titleHi: "सब-मीटर पैनल बी स्थापित करें",
      project: "Dwarka DDA Flats Electrical Rewiring",
      projectId: "PRJ-2026-091",
      column: "todo",
      priority: "medium",
      priorityLabel: "Medium",
      trade: "Electrical Grade 1",
      assignee: "Vikram Singh",
      dueDate: "22 Feb",
      description: "Mount sheet metal enclosure and anchor din rail brackets."
    },
    {
      id: "TSK-412",
      title: "Scaffold Inspection Stage 3",
      titleHi: "मचान सुरक्षा निरीक्षण चरण 3",
      project: "Pitampura Cooperative Block",
      projectId: "PRJ-2026-102",
      column: "todo",
      priority: "urgent",
      priorityLabel: "Urgent",
      trade: "Scaffolding & Rigging",
      assignee: "Ramesh Kumar",
      dueDate: "Today 04:00 PM",
      description: "Verify clamp tension and toe-board placements before evening shift."
    },
    {
      id: "TSK-419",
      title: "Window Frame Beading Alignment",
      titleHi: "खिड़की फ्रेम बीडिंग संरेखण",
      project: "Vasant Kunj Community Center",
      projectId: "PRJ-2026-110",
      column: "todo",
      priority: "low",
      priorityLabel: "Low",
      trade: "Carpentry",
      assignee: "Sunil Sharma",
      dueDate: "25 Feb",
      description: "Fix teaser beading on 8 ground floor auditorium windows."
    },
    {
      id: "TSK-389",
      title: "Ceiling Primer & First Emulsion Coat",
      titleHi: "सीलिंग प्राइमर एवं प्रथम इमल्शन कोट",
      project: "Mayur Vihar School Retrofit",
      projectId: "PRJ-2026-092",
      column: "in_progress",
      priority: "high",
      priorityLabel: "High",
      trade: "Painting & Finishing",
      assignee: "Sunil Meena",
      dueDate: "Today",
      description: "Roller apply anti-fungal primer across 4 classrooms."
    },
    {
      id: "TSK-392",
      title: "4-Inch CPVC Main Line Jointing",
      titleHi: "4-इंच सीपीवीसी मुख्य लाइन जॉइंटिंग",
      project: "Janakpuri Community Dispensary",
      projectId: "PRJ-2026-095",
      column: "in_progress",
      priority: "urgent",
      priorityLabel: "Urgent",
      trade: "Sanitary & Mains",
      assignee: "Mohammad Irfan",
      dueDate: "Today",
      description: "Solvent weld riser pipe connections to header tank manifold."
    },
    {
      id: "TSK-396",
      title: "Brickwork Leveling & Curing Audit",
      titleHi: "ईंट चिनाई लेवलिंग एवं तराई ऑडिट",
      project: "Shahdara Municipal Ward Office",
      projectId: "PRJ-2026-114",
      column: "in_progress",
      priority: "medium",
      priorityLabel: "Medium",
      trade: "Masonry",
      assignee: "Harish Chandra",
      dueDate: "Tomorrow",
      description: "Verify 14-day wet burlap curing on boundary wall elevation."
    },
    {
      id: "TSK-374",
      title: "Busbar Chamber NDPL Inspection",
      titleHi: "बसबार कक्ष एनडीपीएल निरीक्षण",
      project: "Dwarka DDA Flats Electrical Rewiring",
      projectId: "PRJ-2026-091",
      column: "blocked",
      priority: "urgent",
      priorityLabel: "Urgent Blocker",
      trade: "Electrical",
      assignee: "Vikram Singh",
      dueDate: "Overdue 2d",
      description: "Pending municipal inspector stamp; busbar energized check halted."
    },
    {
      id: "TSK-378",
      title: "Stage 2 Slab Beam Casting",
      titleHi: "स्टेज 2 स्लैब बीम ढलाई",
      project: "Rohini Sector-9 Community Hall",
      projectId: "PRJ-2026-084",
      column: "blocked",
      priority: "urgent",
      priorityLabel: "Urgent Blocker",
      trade: "Masonry & Concreting",
      assignee: "Harish Chandra",
      dueDate: "Overdue 1d",
      description: "Halted due to cement truck delivery delay from society depot."
    },
    {
      id: "TSK-362",
      title: "Wall Putty Sanding Stage 2",
      titleHi: "दीवार पुट्टी सैंडिंग चरण 2",
      project: "Mayur Vihar School Retrofit",
      projectId: "PRJ-2026-092",
      column: "review",
      priority: "medium",
      priorityLabel: "In Review",
      trade: "Painting",
      assignee: "Sunil Meena",
      dueDate: "Ready for QA",
      description: "Surface smoothness checked with work lamp; awaits supervisor signoff."
    },
    {
      id: "TSK-365",
      title: "Fire Extinguisher Clamp Mounting",
      titleHi: "अग्निशामक यंत्र ब्रैकेट माउंटिंग",
      project: "Karol Bagh Trade Market",
      projectId: "PRJ-2026-105",
      column: "review",
      priority: "high",
      priorityLabel: "In Review",
      trade: "Mechanical/Electrical",
      assignee: "Devendra Yadav",
      dueDate: "Ready for QA",
      description: "12 heavy-duty wall brackets fixed as per Delhi Fire Service norms."
    },
    {
      id: "TSK-340",
      title: "Dispensary Water Meter Calibration",
      titleHi: "डिस्पेंसरी जल मीटर कैलिब्रेशन",
      project: "Janakpuri Community Dispensary",
      projectId: "PRJ-2026-095",
      column: "completed",
      priority: "high",
      priorityLabel: "Completed",
      trade: "Plumbing",
      assignee: "Mohammad Irfan",
      dueDate: "Yesterday",
      description: "Calibrated 50mm pulse water meter with DJB seal."
    },
    {
      id: "TSK-344",
      title: "Classroom Blackboard Framing",
      titleHi: "कक्षा ब्लैकबोर्ड लकड़ी फ्रेमिंग",
      project: "Mayur Vihar School Retrofit",
      projectId: "PRJ-2026-092",
      column: "completed",
      priority: "medium",
      priorityLabel: "Completed",
      trade: "Carpentry",
      assignee: "Sunil Sharma",
      dueDate: "2 days ago",
      description: "Teakwood perimeter trim secured across 6 primary wing boards."
    }
  ],

  blockers: [
    {
      id: "BLK-01",
      project: "Rohini Sector-9 Community Hall Renovation",
      projectId: "PRJ-2026-084",
      type: "Material Deficit",
      typeHi: "सामग्री की कमी",
      description: "Cement Delivery Delayed by 2 days; 4 masons blocked from casting stage 3 beam slabs.",
      descriptionHi: "सीमेंट डिलीवरी में 2 दिन की देरी; 4 राजमिस्त्री स्टेज 3 स्लैब ढलाई से अवरुद्ध।",
      action1: "Contact Society Supplier",
      action1Hi: "समिति आपूर्तिकर्ता से संपर्क",
      action2: "Reallocate Workers",
      action2Hi: "श्रमिक पुनरावंटन",
      severity: "critical"
    },
    {
      id: "BLK-02",
      project: "Dwarka DDA Flats Electrical Rewiring Phase II",
      projectId: "PRJ-2026-091",
      type: "Inspection Lock",
      typeHi: "निरीक्षण रुकावट",
      description: "Pending municipal electrical inspection clearance. Main busbar charging halted awaiting NDPL signoff.",
      descriptionHi: "नगर निगम विद्युत निरीक्षण की प्रतीक्षा। एनडीपीएल कनिष्ठ अभियंता हस्ताक्षर तक बसबार चार्जिंग रुकी।",
      action1: "Ping Municipal Desk",
      action1Hi: "नगर निगम डेस्क को पिंग",
      action2: "View Clearance Log",
      action2Hi: "क्लीयरेंस लॉग देखें",
      severity: "warning"
    }
  ],

  notifications: [
    {
      id: 1,
      title: "Material Deficit Alert",
      text: "Rohini Sector-9 Hall reported 40-bag OPC cement shortfall.",
      time: "15m ago",
      type: "alert",
      unread: true
    },
    {
      id: 2,
      title: "Milestone Verified",
      text: "Ramesh Kumar completed Concreting Stage 2 photo upload.",
      time: "45m ago",
      type: "success",
      unread: true
    },
    {
      id: 3,
      title: "Aadhaar Biometric Sync",
      text: "38 workers punched in before 08:15 AM cut-off window.",
      time: "1h ago",
      type: "info",
      unread: true
    },
    {
      id: 4,
      title: "Inspection Notice",
      text: "NDPL Electrical inspector visit rescheduled to 03:30 PM.",
      time: "2h ago",
      type: "warning",
      unread: true
    },
    {
      id: 5,
      title: "DBT Wage Ledger Cleared",
      text: "₹3,42,000 processed for DL-204 workers bank accounts.",
      time: "4h ago",
      type: "success",
      unread: true
    }
  ]
};

// --- Application State ---
class AppState {
  constructor() {
    // Load from LocalStorage if available
    const saved = localStorage.getItem("sakharsathi_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.data = parsed.data || initialData;
        this.lang = parsed.lang || "en";
        this.currentRoute = parsed.currentRoute || "overview";
      } catch (e) {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.lang = "en";
        this.currentRoute = "overview";
      }
    } else {
      this.data = JSON.parse(JSON.stringify(initialData));
      this.lang = "en";
      this.currentRoute = "overview";
    }

    this.filters = {
      projectStatus: "all",
      projectTrade: "all",
      projectSearch: "",
      workerTrade: "all",
      workerAvailability: "all",
      workerSearch: "",
      kanbanPriority: "all",
      kanbanTrade: "all",
      kanbanProject: "all"
    };

    this.views = {
      projectsViewMode: "cards", // 'cards' or 'table'
      kanbanViewMode: "kanban"   // 'kanban' or 'table'
    };
  }

  save() {
    try {
      localStorage.setItem("sakharsathi_state", JSON.stringify({
        data: this.data,
        lang: this.lang,
        currentRoute: this.currentRoute
      }));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  setLang(lang) {
    this.lang = lang;
    this.save();
    document.documentElement.lang = lang;
    updateTranslations();
  }

  setRoute(route) {
    this.currentRoute = route;
    this.save();
    renderCurrentRoute();
  }

  addTask(task) {
    this.data.tasks.unshift(task);
    this.save();
    renderKanban();
    renderOverview();
  }

  moveTask(taskId, newColumn) {
    const task = this.data.tasks.find(t => t.id === taskId);
    if (task) {
      task.column = newColumn;
      this.save();
      renderKanban();
      renderOverview();
    }
  }

  updateWorkerStatus(workerId, newStatus) {
    const worker = this.data.workers.find(w => w.id === workerId);
    if (worker) {
      worker.status = newStatus;
      this.save();
      renderWorkers();
      renderOverview();
    }
  }
}

const state = new AppState();

// --- Bilingual Dictionary ---
const i18n = {
  en: {
    appTitle: "SahkariGig",
    supervisorPortal: "Supervisor Portal",
    coopUnit: "Co-op Unit #DL-204",
    commandCenter: "Supervisor Command Center",
    welcome: "Welcome back, Rajesh Varma",
    overview: "Overview",
    runningProjects: "Running Projects",
    workerManagement: "Worker Management",
    taskAllocation: "Task Allocation",
    attendance: "Attendance",
    issuesComplaints: "Issues & Complaints",
    reportsAnalytics: "Reports & Analytics",
    profileSettings: "Profile & Settings",
    signOut: "Sign Out",
    searchPlaceholder: "Search projects, site crew, tasks (Ctrl+K)...",
    newTask: "+ New Task",
    generateMuster: "Generate Daily Muster Roll",
    totalProjects: "Total Projects",
    runningProjectsCount: "Running Projects",
    totalWorkers: "Total Workers",
    dailyMuster: "Daily Muster",
    criticalNeeds: "Critical Needs",
    completedProjects: "Completed Projects",
    openTasks: "Open Task Matrix",
    upcomingDeadlines: "Upcoming Deadlines",
    blockersTitle: "Operational Blockers Requiring Immediate Override",
    workloadTitle: "Team Workload by Trade Skill",
    liveTimeline: "Live Activity Timeline",
    exportCsv: "Export CSV",
    exportPdf: "Export PDF",
    cardsView: "Cards View",
    tableView: "Data Matrix",
    allTrades: "All Trades",
    allStatus: "All Status",
    filterAbsentees: "Filter Absentees",
    kanbanBoard: "Kanban Board",
    toDo: "To Do",
    inProgress: "In Progress",
    inReview: "In Review",
    blocked: "Quality Blocked",
    completed: "Completed"
  },
  hi: {
    appTitle: "सहकारी-गिग",
    supervisorPortal: "पर्यवेक्षक पोर्टल",
    coopUnit: "सहकारी इकाई #DL-204",
    commandCenter: "पर्यवेक्षक कमांड सेंटर",
    welcome: "स्वागत है, राजेश वर्मा",
    overview: "समीक्षा (Overview)",
    runningProjects: "चालू परियोजनाएं",
    workerManagement: "श्रमिक प्रबंधन",
    taskAllocation: "कार्य आबंटन (Kanban)",
    attendance: "दैनिक उपस्थिति",
    issuesComplaints: "समस्याएं एवं रुकावटें",
    reportsAnalytics: "रिपोर्ट एवं विश्लेषण",
    profileSettings: "सेटिंग्स",
    signOut: "लॉग आउट",
    searchPlaceholder: "परियोजनाएं, श्रमिक, कार्य खोजें (Ctrl+K)...",
    newTask: "+ नया कार्य बनाएं",
    generateMuster: "दैनिक मस्टर रोल बनाएं",
    totalProjects: "कुल परियोजनाएं",
    runningProjectsCount: "सक्रिय परियोजनाएं",
    totalWorkers: "कुल पंजीकृत श्रमिक",
    dailyMuster: "आज की उपस्थिति",
    criticalNeeds: "अवरुद्ध स्थल",
    completedProjects: "पूर्ण कार्य",
    openTasks: "लंबित कार्य सूची",
    upcomingDeadlines: "आगामी समय सीमा",
    blockersTitle: "तत्काल पर्यवेक्षक कार्रवाई हेतु अवरोध",
    workloadTitle: "ट्रेड कौशल अनुसार कार्यभार क्षमता",
    liveTimeline: "रीयल-टाइम गतिविधि समयरेखा",
    exportCsv: "सीएसवी निर्यात",
    exportPdf: "पीडीएफ निर्यात",
    cardsView: "कार्ड दृश्य",
    tableView: "तालिका दृश्य",
    allTrades: "सभी ट्रेड",
    allStatus: "सभी स्थिति",
    filterAbsentees: "अनुपस्थित देखें",
    kanbanBoard: "कैनबन बोर्ड",
    toDo: "करने योग्य (To Do)",
    inProgress: "प्रगति पर (In Progress)",
    inReview: "समीक्षाधीन (Review)",
    blocked: "अवरुद्ध (Blocked)",
    completed: "पूर्ण (Completed)"
  }
};

// --- Toast Notification Utility ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgClass = type === "error" ? "bg-status-blocked text-white" :
                  type === "warning" ? "bg-status-pending text-slate-900 font-semibold" :
                  "bg-surface-container-high border border-primary text-text-primary";
  const icon = type === "error" ? "error" : type === "warning" ? "warning" : "check_circle";

  toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 ${bgClass}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] text-primary">${icon}</span>
    <span class="font-body-md text-body-md">${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- View Renderers ---

// 1. Overview Dashboard
function renderOverview() {
  const container = document.getElementById("view-overview");
  if (!container) return;

  const lang = state.lang;
  const isHi = lang === "hi";

  // Compute metrics
  const totalProjects = state.data.projects.length;
  const activeProjects = state.data.projects.filter(p => p.status === "in_progress" || p.status === "delayed").length;
  const completedProjects = state.data.projects.filter(p => p.status === "completed").length;
  const totalWorkers = state.data.workers.length;
  const presentWorkers = state.data.workers.filter(w => w.status === "present").length;
  const criticalBlockers = state.data.blockers.length;
  const openTasks = state.data.tasks.filter(t => t.column !== "completed").length;

  container.innerHTML = `
    <!-- Top Welcome Banner -->
    <section class="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-border">
      <div class="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div class="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-status-progress/5 blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-lg">
        <div class="space-y-space-xs max-w-3xl">
          <div class="flex flex-wrap items-center gap-space-sm mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              ${isHi ? "रीयल-टाइम सिंक: सॉकेट कनेक्टेड" : "Sync Status: Realtime (Socket.IO Connected)"}
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-text-soft font-label-sm text-label-sm">
              <span class="material-symbols-outlined text-[14px] text-secondary">schedule</span>
              ${isHi ? "सक्रिय पाली: सुबह 08:00 - शाम 05:30" : "Active Shift: 08:00 AM - 05:30 PM"}
            </span>
            <span class="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm tracking-wide">
              SIH 2026 • Unit #DL-204
            </span>
          </div>
          <h1 class="font-headline-xl text-headline-xl text-text-primary tracking-tight font-bold">
            ${isHi ? "स्वागत है, राजेश वर्मा" : "Welcome back, Rajesh Varma"}
          </h1>
          <p class="font-body-md text-body-md text-text-muted leading-relaxed">
            ${isHi 
              ? "अपनी चालू परियोजनाओं का प्रबंधन करें, सहकारी कार्यबल का समन्वय करें, और वास्तविक समय में कार्य प्रगति ट्रैक करें। दिल्ली श्रमिक सहकारी समिति इकाई #DL-204।" 
              : "Manage your projects, coordinate your workforce, and track progress in one place. Direct supervision node for Delhi Shramik Sahkari Society Unit #DL-204."}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-space-sm self-start xl:self-center shrink-0">
          <button onclick="openMusterModal()" class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-text-soft hover:text-text-primary transition-all shadow-md font-label-lg text-label-lg active:scale-95">
            <span class="material-symbols-outlined text-[18px] text-secondary">receipt_long</span>
            <span>${isHi ? "दैनिक मस्टर रोल बनाएं" : "Generate Daily Muster Roll"}</span>
          </button>
          <button onclick="openTaskModal()" class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm hover:bg-primary transition-all shadow-md active:scale-95">
            <span class="material-symbols-outlined text-[20px]">add_circle</span>
            <span>${isHi ? "+ त्वरित कार्य आवंटन" : "+ Quick Task Assign"}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Operational Blockers Alert Strip -->
    <section class="rounded-2xl bg-surface-container p-space-md shadow-lg space-y-space-md border border-status-blocked/30">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-space-sm">
          <span class="w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">warning</span>
          </span>
          <div>
            <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold">
              ${isHi ? "तत्काल पर्यवेक्षक ओवरराइड हेतु गंभीर अवरोध" : "Operational Blockers Requiring Immediate Supervisor Override"}
            </h2>
            <p class="font-body-sm text-body-sm text-text-muted">
              ${isHi ? "2 परियोजनाएं बाहरी आपूर्ति एवं वैधानिक मंजूरी के अभाव में बाधित हैं" : "2 projects currently delayed due to external supply chain & regulatory signoffs"}
            </p>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full bg-error-container/40 text-error font-label-sm text-label-sm font-bold">
          ${criticalBlockers} ${isHi ? "गंभीर कार्रवाइयां" : "Critical Actions"}
        </span>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
        ${state.data.blockers.map(b => `
          <div class="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between gap-space-md border border-surface-border">
            <div class="flex items-start justify-between gap-space-sm">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">${b.projectId}</span>
                  <span class="font-label-sm text-label-sm text-status-blocked bg-error-container/30 px-2 py-0.5 rounded font-bold">${isHi ? b.typeHi : b.type}</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-text-primary font-semibold">${b.project}</h3>
                <p class="font-body-sm text-body-sm text-text-muted">${isHi ? b.descriptionHi : b.description}</p>
              </div>
              <span class="material-symbols-outlined text-status-blocked text-[28px] shrink-0">inventory_2</span>
            </div>
            <div class="flex items-center justify-end gap-space-sm pt-2">
              <button onclick="handleBlockerAction('${b.id}', 'supplier')" class="px-3 py-1.5 rounded-lg bg-surface-container-high text-text-soft hover:text-text-primary hover:bg-surface-container-highest font-label-md text-label-md transition-colors">
                ${isHi ? b.action1Hi : b.action1}
              </button>
              <button onclick="handleBlockerAction('${b.id}', 'reallocate')" class="px-3.5 py-1.5 rounded-lg bg-error-container text-on-surface hover:bg-status-blocked hover:text-white font-label-md text-label-md transition-colors font-bold">
                ${isHi ? b.action2Hi : b.action2}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- 8 Executive Metric Cards (4x2 Bento Grid) -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      <!-- Metric 1 -->
      <div onclick="navigateTo('running-projects')" class="cursor-pointer rounded-xl bg-surface-container-low p-space-md shadow-md hover:bg-surface-container transition-all border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "कुल परियोजनाएं" : "Total Projects"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "परियोजनाएं" : "Assigned"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[22px]">domain</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">${totalProjects} <span class="font-headline-sm text-headline-sm text-text-muted font-normal">${isHi ? "असाइन" : "Assigned"}</span></div>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-2 py-0.5 rounded-full bg-status-progress/20 text-status-progress font-label-sm text-label-sm font-semibold">${activeProjects} Active</span>
            <span class="px-2 py-0.5 rounded-full bg-status-completed/20 text-secondary font-label-sm text-label-sm font-semibold">6 Completed</span>
          </div>
        </div>
      </div>

      <!-- Metric 2 -->
      <div onclick="navigateTo('running-projects')" class="cursor-pointer rounded-xl bg-surface-container-low p-space-md shadow-md hover:bg-surface-container transition-all border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "सक्रिय कार्य" : "Running Projects"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "चालू साइट्स" : "In Progress"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[22px]">construction</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">${activeProjects} <span class="font-headline-sm text-headline-sm text-text-muted font-normal">${isHi ? "चालू" : "Sites"}</span></div>
          <div class="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-secondary">
            <span class="material-symbols-outlined text-[16px]">trending_up</span>
            <span>${isHi ? "इस सप्ताह +2 माइलस्टोन लक्ष्य" : "+2 milestone target this week"}</span>
          </div>
        </div>
      </div>

      <!-- Metric 3 -->
      <div onclick="navigateTo('worker-management')" class="cursor-pointer rounded-xl bg-surface-container-low p-space-md shadow-md hover:bg-surface-container transition-all border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "पर्यवेक्षण में कुल श्रमिक" : "Total Workers"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "सहकारी कैडर" : "Registered"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
            <span class="material-symbols-outlined text-[22px]">groups</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">42 <span class="font-headline-sm text-headline-sm text-text-muted font-normal">${isHi ? "कारीगर" : "Artisans"}</span></div>
          <div class="flex items-center gap-1.5 mt-2 text-text-muted font-label-sm text-label-sm">
            <span>Mason (14)</span> • <span>Electric (8)</span> • <span>Carpentry (8)</span>
          </div>
        </div>
      </div>

      <!-- Metric 4 -->
      <div onclick="navigateTo('attendance')" class="cursor-pointer rounded-xl bg-surface-container-low p-space-md shadow-md hover:bg-surface-container transition-all border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "आज उपस्थित" : "Daily Muster"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "दैनिक उपस्थिति" : "Check-Ins"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-status-completed">
            <span class="material-symbols-outlined text-[22px]">how_to_reg</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-baseline justify-between">
            <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">38 <span class="font-headline-sm text-headline-sm text-text-muted font-normal">/ 42 Present</span></div>
            <span class="font-label-sm text-label-sm text-primary font-bold">90.4%</span>
          </div>
          <div class="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 flex overflow-hidden">
            <div class="bg-primary h-full" style="width: 90.4%"></div>
            <div class="bg-error h-full" style="width: 4.8%"></div>
            <div class="bg-status-pending h-full" style="width: 2.4%"></div>
            <div class="bg-outline h-full" style="width: 2.4%"></div>
          </div>
          <div class="flex items-center justify-between text-text-muted font-label-sm text-label-sm mt-1.5">
            <span>38 Pres</span>
            <span>2 Abs</span>
            <span>1 Leave</span>
            <span>1 Unmk</span>
          </div>
        </div>
      </div>

      <!-- Metric 5 -->
      <div class="rounded-xl bg-surface-container-low p-space-md shadow-md border border-error/30">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "ध्यान देने योग्य" : "Critical Needs"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "अवरुद्ध स्थल" : "Blockers"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-error-container/30 flex items-center justify-center text-status-blocked">
            <span class="material-symbols-outlined text-[22px]">flag_circle</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-error font-bold tracking-tight">${criticalBlockers} <span class="font-headline-sm text-headline-sm text-text-muted font-normal">Sites Impacted</span></div>
          <p class="font-body-sm text-body-sm text-text-muted mt-2">1 Overdue inspection • 1 Material shortage</p>
        </div>
      </div>

      <!-- Metric 6 -->
      <div class="rounded-xl bg-surface-container-low p-space-md shadow-md border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "पूर्ण कार्य" : "Completed Projects"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "हैंडओवर" : "Handed Over"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">6 <span class="font-headline-sm text-headline-sm text-text-muted font-normal">Sites</span></div>
          <div class="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-secondary">
            <span class="material-symbols-outlined text-[16px]">task_alt</span>
            <span>100% audit & DBT ledger verified</span>
          </div>
        </div>
      </div>

      <!-- Metric 7 -->
      <div onclick="navigateTo('task-allocation')" class="cursor-pointer rounded-xl bg-surface-container-low p-space-md shadow-md hover:bg-surface-container transition-all border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "लंबित कार्य" : "Open Task Matrix"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "कार्य टिकट्स" : "Tickets"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">${openTasks} <span class="font-headline-sm text-headline-sm text-text-muted font-normal">Open</span></div>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-2 py-0.5 rounded-full bg-error-container/40 text-error font-label-sm text-label-sm font-bold">4 Urgent</span>
            <span class="px-2 py-0.5 rounded-full bg-surface-container-high text-text-soft font-label-sm text-label-sm">7 In Progress</span>
          </div>
        </div>
      </div>

      <!-- Metric 8 -->
      <div class="rounded-xl bg-surface-container-low p-space-md shadow-md border border-surface-border">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">${isHi ? "आगामी समय सीमा" : "Upcoming Deadlines"}</span>
            <h3 class="font-headline-sm text-headline-sm text-text-soft font-bold">${isHi ? "माइलस्टोन्स" : "Milestones"}</h3>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-status-pending">
            <span class="material-symbols-outlined text-[22px]">alarm</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">4 <span class="font-headline-sm text-headline-sm text-text-muted font-normal">Due Soon</span></div>
          <div class="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-status-pending font-bold">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>Due within next 72 hrs</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Two-Column Operational Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
      <!-- Left Column: Core Workflows (7 cols) -->
      <div class="xl:col-span-7 space-y-space-lg">
        <!-- Running Projects Snapshot -->
        <div class="rounded-2xl bg-surface-container-low p-space-md shadow-md space-y-space-md border border-surface-border">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-primary text-[24px]">view_timeline</span>
              <div>
                <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold">
                  ${isHi ? "सक्रिय परियोजना स्नैपशॉट" : "Running Projects Snapshot"}
                </h2>
                <p class="font-body-sm text-body-sm text-text-muted">
                  ${isHi ? "वास्तविक समय स्थिति, श्रमिक आवंटन एवं ट्रेड प्रगति" : "Real-time status, crew allocations, and trade burn-rate"}
                </p>
              </div>
            </div>
            <button onclick="navigateTo('running-projects')" class="text-primary hover:text-secondary font-label-md text-label-md flex items-center gap-1 transition-colors font-bold">
              <span>View All 8</span>
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div class="space-y-space-sm">
            ${state.data.projects.slice(0, 4).map(p => `
              <div class="rounded-xl bg-surface-container p-space-md hover:bg-surface-container-high transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-border">
                <div class="space-y-1.5 flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">${p.id}</span>
                    <span class="px-2 py-0.5 rounded-full ${p.status === 'delayed' ? 'bg-status-blocked/15 text-error' : p.status === 'on_hold' ? 'bg-status-pending/15 text-status-pending' : 'bg-status-progress/15 text-status-progress'} font-label-sm text-label-sm font-semibold">
                      ${p.statusLabel}
                    </span>
                    <div class="flex items-center gap-1 text-text-muted font-body-sm text-body-sm">
                      <span class="material-symbols-outlined text-[16px]">handyman</span>
                      <span>${p.trade}</span>
                    </div>
                  </div>
                  <h3 class="font-headline-sm text-headline-sm text-text-primary truncate font-bold">${p.title}</h3>
                  <div class="flex items-center gap-3 text-text-muted font-body-sm text-body-sm">
                    <span>Crew Lead: <strong class="text-text-soft font-semibold">${p.crewLead}</strong></span>
                    <span>•</span>
                    <span>${p.crewCount} Workers Deployed</span>
                  </div>
                </div>
                <div class="w-full md:w-48 flex flex-col gap-1.5 shrink-0">
                  <div class="flex items-center justify-between text-body-sm font-body-sm">
                    <span class="text-text-muted">Progress</span>
                    <span class="text-primary font-bold">${p.progress}%</span>
                  </div>
                  <div class="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div class="bg-primary h-full rounded-full" style="width: ${p.progress}%"></div>
                  </div>
                  <div class="flex items-center justify-between text-label-sm font-label-sm text-text-muted">
                    <span>${p.milestoneStatus}</span>
                    <button onclick="inspectProject('${p.id}')" class="text-secondary hover:underline font-bold">Workspace →</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Today's Attendance Stream Table -->
        <div class="rounded-2xl bg-surface-container-low p-space-md shadow-md space-y-space-md border border-surface-border">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-secondary text-[24px]">fingerprint</span>
              <div>
                <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold">
                  ${isHi ? "आज की उपस्थिति एवं मस्टर स्ट्रीम" : "Today's Attendance & Live Muster Stream"}
                </h2>
                <p class="font-body-sm text-body-sm text-text-muted">
                  Biometric & geofenced punches • Cooperative Unit DL-204
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full bg-status-completed/15 text-secondary font-label-sm text-label-sm font-bold">
                38 Checked-In
              </span>
              <button onclick="navigateTo('attendance')" class="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-text-soft font-label-sm text-label-sm transition-colors">
                ${isHi ? "पूर्ण मस्टर रोल" : "Full Muster Roll"}
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr class="bg-surface-container text-text-muted font-label-sm text-label-sm uppercase">
                  <th class="py-2.5 px-3 rounded-l-lg">Worker & ID</th>
                  <th class="py-2.5 px-3">Trade Skill</th>
                  <th class="py-2.5 px-3">Assigned Site</th>
                  <th class="py-2.5 px-3">Punch In</th>
                  <th class="py-2.5 px-3">Verification</th>
                  <th class="py-2.5 px-3 rounded-r-lg text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-border/40">
                ${state.data.workers.slice(0, 5).map(w => `
                  <tr class="hover:bg-surface-container transition-colors">
                    <td class="py-2.5 px-3">
                      <div class="flex items-center gap-2">
                        <img src="${w.avatar}" alt="${w.name}" class="w-8 h-8 rounded-full object-cover">
                        <div>
                          <div class="font-label-lg text-label-lg text-text-primary font-semibold">${w.name}</div>
                          <div class="font-label-sm text-label-sm text-text-muted font-mono">${w.id}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-2.5 px-3 text-text-soft font-medium">${w.tradeLabel}</td>
                    <td class="py-2.5 px-3 text-text-soft truncate max-w-[140px]">${w.site}</td>
                    <td class="py-2.5 px-3 font-mono text-text-muted">${w.checkInTime}</td>
                    <td class="py-2.5 px-3">
                      <span class="inline-flex items-center gap-1 ${w.status === 'present' ? 'text-secondary' : 'text-text-muted'} font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[14px]">${w.status === 'present' ? 'verified' : 'help_outline'}</span>
                        ${w.verification}
                      </span>
                    </td>
                    <td class="py-2.5 px-3 text-right">
                      <span class="px-2 py-0.5 rounded-full ${w.status === 'present' ? 'bg-status-completed/15 text-secondary' : w.status === 'on_leave' ? 'bg-status-pending/20 text-status-pending' : 'bg-error-container/40 text-error'} font-label-sm text-label-sm font-semibold">
                        ${w.statusLabel}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Analytics & Live Telemetry (5 cols) -->
      <div class="xl:col-span-5 space-y-space-lg">
        <!-- Trade Workload Distribution -->
        <div class="rounded-2xl bg-surface-container-low p-space-md shadow-md space-y-space-md border border-surface-border">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-primary text-[24px]">engineering</span>
              <div>
                <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold">Team Workload by Trade Skill</h2>
                <p class="font-body-sm text-body-sm text-text-muted">Capacity utilization across active sites</p>
              </div>
            </div>
            <span class="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-1 rounded font-bold">36/42 Deployed</span>
          </div>
          <div class="space-y-4 pt-1">
            <!-- Masonry -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-body-sm font-body-sm">
                <span class="text-text-primary font-medium flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-primary">handyman</span>
                  Masonry & Concreting
                </span>
                <span class="text-text-soft font-mono">12 / 14 <span class="text-text-muted font-normal">(86%)</span></span>
              </div>
              <div class="w-full bg-surface-container-highest rounded-full h-2 flex overflow-hidden">
                <div class="bg-primary h-full" style="width: 86%"></div>
              </div>
              <div class="flex justify-between text-label-sm font-label-sm text-text-muted">
                <span>Rohini Hall (8) • DDA (4)</span>
                <span class="text-secondary font-semibold">2 Available</span>
              </div>
            </div>

            <!-- Electrical -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-body-sm font-body-sm">
                <span class="text-text-primary font-medium flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-secondary">bolt</span>
                  Electrical & Wiring
                </span>
                <span class="text-status-pending font-mono font-bold">8 / 8 <span class="text-text-muted font-normal">(100%)</span></span>
              </div>
              <div class="w-full bg-surface-container-highest rounded-full h-2 flex overflow-hidden">
                <div class="bg-status-pending h-full" style="width: 100%"></div>
              </div>
              <div class="flex justify-between text-label-sm font-label-sm text-text-muted">
                <span>Fully booked • High Demand</span>
                <span class="text-status-pending font-semibold">0 Available</span>
              </div>
            </div>

            <!-- Carpentry -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-body-sm font-body-sm">
                <span class="text-text-primary font-medium flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-tertiary">carpenter</span>
                  Carpentry & Woodwork
                </span>
                <span class="text-text-soft font-mono">7 / 8 <span class="text-text-muted font-normal">(88%)</span></span>
              </div>
              <div class="w-full bg-surface-container-highest rounded-full h-2 flex overflow-hidden">
                <div class="bg-secondary h-full" style="width: 88%"></div>
              </div>
              <div class="flex justify-between text-label-sm font-label-sm text-text-muted">
                <span>Mayur Vihar School (7)</span>
                <span class="text-secondary font-semibold">1 Available</span>
              </div>
            </div>

            <!-- Painting -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-body-sm font-body-sm">
                <span class="text-text-primary font-medium flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-status-progress">format_paint</span>
                  Painting & Finishing
                </span>
                <span class="text-text-soft font-mono">10 / 12 <span class="text-text-muted font-normal">(83%)</span></span>
              </div>
              <div class="w-full bg-surface-container-highest rounded-full h-2 flex overflow-hidden">
                <div class="bg-status-progress h-full" style="width: 83%"></div>
              </div>
              <div class="flex justify-between text-label-sm font-label-sm text-text-muted">
                <span>Mayur Vihar (6) • Janakpuri (4)</span>
                <span class="text-secondary font-semibold">2 Available</span>
              </div>
            </div>
          </div>
          <div class="rounded-xl bg-surface-container p-space-sm flex items-center justify-between border border-surface-border">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-secondary">swap_horiz</span>
              <span class="font-body-sm text-body-sm text-text-soft">Surplus capacity in Masonry available for transfer</span>
            </div>
            <button onclick="navigateTo('worker-management')" class="text-primary hover:underline font-label-sm text-label-sm font-bold">Shift →</button>
          </div>
        </div>

        <!-- Live Activity Timeline -->
        <div class="rounded-2xl bg-surface-container-low p-space-md shadow-md space-y-space-md border border-surface-border">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-secondary text-[24px]">rss_feed</span>
              <div>
                <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold">Live Activity Timeline</h2>
                <p class="font-body-sm text-body-sm text-text-muted">Socket.IO real-time supervisor event bus</p>
              </div>
            </div>
            <div class="flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold">
              <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span>Live Stream</span>
            </div>
          </div>
          <div class="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
            <div class="relative">
              <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-low"></span>
              <div class="space-y-0.5">
                <div class="flex items-center justify-between">
                  <span class="font-label-md text-label-md text-text-primary font-semibold">Milestone Step Completed</span>
                  <span class="font-label-sm text-label-sm text-text-muted">12m ago</span>
                </div>
                <p class="font-body-sm text-body-sm text-text-soft">
                  <strong class="text-primary font-medium">Ramesh Kumar</strong> completed Concreting Stage 2 on PRJ-084. Photo evidence uploaded.
                </p>
              </div>
            </div>

            <div class="relative">
              <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-surface-container-low"></span>
              <div class="space-y-0.5">
                <div class="flex items-center justify-between">
                  <span class="font-label-md text-label-md text-text-primary font-semibold">Task Priority Override</span>
                  <span class="font-label-sm text-label-sm text-text-muted">35m ago</span>
                </div>
                <p class="font-body-sm text-body-sm text-text-soft">
                  <strong class="text-text-primary">Supervisor Rajesh Varma</strong> escalated Dwarka busbar task priority to Urgent.
                </p>
              </div>
            </div>

            <div class="relative">
              <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-error ring-4 ring-surface-container-low"></span>
              <div class="space-y-0.5">
                <div class="flex items-center justify-between">
                  <span class="font-label-md text-label-md text-text-primary font-semibold text-error">Shortage Notification Dispatched</span>
                  <span class="font-label-sm text-label-sm text-text-muted">2h ago</span>
                </div>
                <p class="font-body-sm text-body-sm text-text-soft">
                  Society automated ledger flagged 40-bag cement shortfall at Rohini site depot.
                </p>
              </div>
            </div>
          </div>
          <button onclick="showToast('Loading full telemetry archives for Co-op Unit #DL-204...')" class="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-soft hover:text-text-primary font-label-md text-label-md transition-colors text-center font-bold">
            ${isHi ? "पूर्ण टेलीमेट्री इतिहास खोलें →" : "Open Telemetry Event History →"}
          </button>
        </div>

        <!-- Next Field Audit Card -->
        <div class="rounded-2xl bg-surface-container-low p-space-md shadow-md space-y-space-sm border border-surface-border">
          <div class="flex items-center justify-between">
            <h3 class="font-headline-sm text-headline-sm text-text-primary font-bold">Next Required Field Audit</h3>
            <span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">Today • 03:00 PM</span>
          </div>
          <div class="flex items-start gap-space-sm pt-1">
            <div class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span class="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div>
              <div class="font-label-lg text-label-lg text-text-primary font-semibold">Safety Helmet & Scaffolding Check</div>
              <div class="font-body-sm text-body-sm text-text-muted">Janakpuri Community Dispensary • 6 Workers on Site</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Running Projects Workspace
function renderRunningProjects() {
  const container = document.getElementById("view-running-projects");
  if (!container) return;

  const isHi = state.lang === "hi";
  let filtered = state.data.projects;

  // Apply filters
  if (state.filters.projectStatus !== "all") {
    filtered = filtered.filter(p => p.status === state.filters.projectStatus);
  }
  if (state.filters.projectTrade !== "all") {
    filtered = filtered.filter(p => p.category === state.filters.projectTrade);
  }
  if (state.filters.projectSearch) {
    const q = state.filters.projectSearch.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.id.toLowerCase().includes(q) || 
      p.location.toLowerCase().includes(q)
    );
  }

  container.innerHTML = `
    <!-- Top Command & Filter Deck -->
    <section class="flex flex-col gap-space-lg mb-space-lg">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-space-sm">
        <div class="flex flex-col">
          <div class="flex items-center gap-space-sm mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm tracking-widest uppercase font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Live Operational Grid
            </span>
            <span class="font-label-sm text-label-sm text-text-muted">Unit #DL-204</span>
          </div>
          <h1 class="font-headline-xl text-headline-xl text-text-primary tracking-tight font-bold">
            ${isHi ? "चालू परियोजनाएं" : "Running Projects"}
          </h1>
          <p class="font-body-md text-body-md text-text-muted mt-0.5">
            ${isHi ? "दिल्ली एनसीआर में सहकारी श्रम गतिशीलता के तहत 8 सक्रिय निर्माण एवं नवीनीकरण परियोजनाएं" : "8 Active Construction & Renovation Projects mobilizing cooperative trade labor across Delhi NCR"}
          </p>
        </div>
        <!-- Actions & View Toggles -->
        <div class="flex items-center gap-space-sm self-start md:self-auto">
          <div class="flex items-center bg-surface-container-low p-1 rounded-xl border border-surface-border">
            <button onclick="setProjectsViewMode('cards')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${state.views.projectsViewMode === 'cards' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-text-muted hover:text-text-primary'} font-label-md text-label-md transition-all">
              <span class="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Cards</span>
            </button>
            <button onclick="setProjectsViewMode('table')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${state.views.projectsViewMode === 'table' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-text-muted hover:text-text-primary'} font-label-md text-label-md transition-all">
              <span class="material-symbols-outlined text-[18px]">table_rows</span>
              <span>Data Matrix</span>
            </button>
          </div>
          <button onclick="openRegisterProjectModal()" class="flex items-center gap-1.5 bg-primary-container text-on-primary-container hover:bg-primary px-space-md py-2 rounded-xl font-label-md text-label-md transition-all shadow-md font-bold">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Register Project</span>
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="bg-surface-container-low p-space-md rounded-2xl flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center justify-between shadow-sm border border-surface-border">
        <!-- Search -->
        <div class="relative flex-1 min-w-[260px]">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
          <input 
            oninput="handleProjectSearch(this.value)" 
            value="${state.filters.projectSearch}"
            class="w-full bg-surface-container-lowest text-text-primary font-body-md text-body-md rounded-xl pl-10 pr-4 py-2.5 placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary border border-surface-border" 
            placeholder="${isHi ? 'परियोजना नाम, आईडी, स्थान द्वारा खोजें...' : 'Search by project name, ID, customer, locality...'}" 
            type="text"
          />
        </div>
        <!-- Dropdowns -->
        <div class="flex flex-wrap items-center gap-space-sm">
          <select onchange="handleProjectFilter('projectStatus', this.value)" class="appearance-none bg-surface-container-lowest text-text-soft font-label-md text-label-md rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary border border-surface-border cursor-pointer">
            <option value="all" ${state.filters.projectStatus === 'all' ? 'selected' : ''}>Status: All</option>
            <option value="in_progress" ${state.filters.projectStatus === 'in_progress' ? 'selected' : ''}>In Progress</option>
            <option value="delayed" ${state.filters.projectStatus === 'delayed' ? 'selected' : ''}>Delayed</option>
            <option value="on_hold" ${state.filters.projectStatus === 'on_hold' ? 'selected' : ''}>On Hold</option>
          </select>

          <select onchange="handleProjectFilter('projectTrade', this.value)" class="appearance-none bg-surface-container-lowest text-text-soft font-label-md text-label-md rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary border border-surface-border cursor-pointer">
            <option value="all" ${state.filters.projectTrade === 'all' ? 'selected' : ''}>Trade: All Categories</option>
            <option value="construction" ${state.filters.projectTrade === 'construction' ? 'selected' : ''}>Construction</option>
            <option value="renovation" ${state.filters.projectTrade === 'renovation' ? 'selected' : ''}>Renovation</option>
            <option value="electrical" ${state.filters.projectTrade === 'electrical' ? 'selected' : ''}>Electrical</option>
            <option value="plumbing" ${state.filters.projectTrade === 'plumbing' ? 'selected' : ''}>Plumbing</option>
            <option value="painting" ${state.filters.projectTrade === 'painting' ? 'selected' : ''}>Painting</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Projects Content Container -->
    ${state.views.projectsViewMode === 'cards' ? `
      <!-- Cards View -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-space-lg">
        ${filtered.map(p => `
          <article class="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden border border-surface-border hover:border-primary/50 transition-all group">
            <div class="flex flex-col">
              <!-- Header Meta -->
              <div class="flex items-start justify-between gap-space-sm mb-space-sm">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">
                    ${p.id}
                  </span>
                  <span class="flex items-center gap-1 px-2.5 py-0.5 rounded-full ${p.status === 'delayed' ? 'bg-error-container/30 text-error font-bold' : p.status === 'on_hold' ? 'bg-status-pending/20 text-status-pending font-bold' : 'bg-status-progress/20 text-status-progress font-semibold'} font-label-sm text-label-sm">
                    <span class="w-1.5 h-1.5 rounded-full ${p.status === 'delayed' ? 'bg-status-blocked animate-pulse' : 'bg-primary'}"></span>
                    ${p.statusLabel}
                  </span>
                  <span class="px-2 py-0.5 rounded-full bg-surface-container-high text-text-soft font-label-sm text-label-sm">
                    ${p.priorityLabel}
                  </span>
                </div>
                <div class="flex items-center gap-1 text-text-muted">
                  <span class="material-symbols-outlined text-[18px]">event</span>
                  <span class="font-label-sm text-label-sm ${p.dueDays <= 7 ? 'text-status-pending font-bold' : 'text-text-muted'}">Due in ${p.dueDays}d</span>
                </div>
              </div>

              <!-- Title & Customer -->
              <div class="mb-space-md">
                <h2 class="font-headline-md text-headline-md text-text-primary group-hover:text-primary transition-colors font-bold">
                  ${p.title}
                </h2>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-body-sm text-body-sm text-text-muted">
                  <span class="flex items-center gap-1 text-text-soft">
                    <span class="material-symbols-outlined text-[16px] text-primary">apartment</span>
                    ${p.client}
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px] text-text-muted">pin_drop</span>
                    ${p.location}
                  </span>
                </div>
              </div>

              <!-- Progress & Image Split -->
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-space-md mb-space-md bg-surface-container-lowest p-space-md rounded-xl border border-surface-border/50">
                <div class="sm:col-span-5 relative h-28 rounded-lg overflow-hidden bg-surface-container">
                  <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${p.image}" alt="${p.title}" />
                  <span class="absolute bottom-2 left-2 bg-surface-container-low/90 backdrop-blur px-2 py-0.5 rounded text-[11px] font-label-sm text-primary font-bold">
                    ${p.trade}
                  </span>
                </div>
                <div class="sm:col-span-7 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-label-sm text-label-sm text-text-muted uppercase">Sprint Progress</span>
                      <span class="font-headline-sm text-headline-sm text-primary font-bold">${p.progress}%</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden mb-2">
                      <div class="h-full bg-gradient-to-r from-status-progress to-primary rounded-full transition-all" style="width: ${p.progress}%;"></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between font-label-sm text-label-sm text-text-muted">
                    <span>Tasks: <strong class="text-text-primary">${p.tasksDone} / ${p.tasksTotal}</strong> Done</span>
                    ${p.blockedTasks > 0 ? `<span class="text-error font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">warning</span> ${p.blockedTasks} Blocked</span>` : `<span class="text-secondary">On Track</span>`}
                  </div>
                </div>
              </div>

              <!-- Next Milestone -->
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container mb-space-md border border-surface-border">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="material-symbols-outlined text-status-pending text-[18px] shrink-0">flag</span>
                  <span class="font-body-sm text-body-sm text-text-soft truncate">
                    <strong class="text-text-primary">Next Milestone:</strong> ${p.milestone}
                  </span>
                </div>
                <span class="shrink-0 font-label-sm text-label-sm text-status-pending px-2 py-0.5 rounded bg-surface-container-highest font-bold">${p.milestoneStatus}</span>
              </div>
            </div>

            <!-- Footer: Crew & Action -->
            <div class="flex items-center justify-between pt-2 border-t border-surface-border">
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5 text-text-soft font-body-sm">
                  <span class="material-symbols-outlined text-[18px] text-primary">engineering</span>
                  <span>Lead: <strong class="text-text-primary font-semibold">${p.crewLead}</strong></span>
                </div>
                <span class="text-text-muted">•</span>
                <span class="font-label-sm text-text-muted">${p.crewCount} Workers</span>
              </div>
              <button onclick="inspectProject('${p.id}')" class="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold transition-all shadow-sm">
                Inspect Site →
              </button>
            </div>
          </article>
        `).join("")}
      </div>
    ` : `
      <!-- Table View -->
      <div class="rounded-2xl bg-surface-container-low shadow-md overflow-hidden border border-surface-border">
        <div class="overflow-x-auto">
          <table class="w-full text-left font-body-sm text-body-sm">
            <thead class="bg-surface-container text-text-muted font-label-sm text-label-sm uppercase">
              <tr>
                <th class="py-3 px-4">Project ID & Name</th>
                <th class="py-3 px-4">Trade Category</th>
                <th class="py-3 px-4">Crew Lead</th>
                <th class="py-3 px-4">Workers</th>
                <th class="py-3 px-4">Progress</th>
                <th class="py-3 px-4">Due Target</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-border">
              ${filtered.map(p => `
                <tr class="hover:bg-surface-container transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="font-headline-sm text-headline-sm text-text-primary font-bold">${p.title}</div>
                    <div class="font-mono text-label-sm text-primary font-semibold">${p.id} • ${p.client}</div>
                  </td>
                  <td class="py-3.5 px-4 text-text-soft font-medium">${p.trade}</td>
                  <td class="py-3.5 px-4 text-text-primary font-semibold">${p.crewLead}</td>
                  <td class="py-3.5 px-4 text-text-muted">${p.crewCount} mobilized</td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <div class="w-24 bg-surface-container-highest rounded-full h-2 overflow-hidden">
                        <div class="bg-primary h-full" style="width: ${p.progress}%"></div>
                      </div>
                      <span class="font-bold text-text-primary">${p.progress}%</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 text-text-soft">${p.targetDate}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full ${p.status === 'delayed' ? 'bg-status-blocked/20 text-error' : p.status === 'on_hold' ? 'bg-status-pending/20 text-status-pending' : 'bg-status-progress/20 text-status-progress'} font-label-sm font-bold">
                      ${p.statusLabel}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button onclick="inspectProject('${p.id}')" class="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm font-bold transition-colors">
                      Inspect
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

// 3. Task Allocation Kanban Board
function renderKanban() {
  const container = document.getElementById("view-task-allocation");
  if (!container) return;

  const isHi = state.lang === "hi";
  let tasks = state.data.tasks;

  if (state.filters.kanbanPriority !== "all") {
    tasks = tasks.filter(t => t.priority === state.filters.kanbanPriority);
  }
  if (state.filters.kanbanProject !== "all") {
    tasks = tasks.filter(t => t.projectId === state.filters.kanbanProject);
  }

  const columns = [
    { key: "todo", title: isHi ? "करने योग्य" : "To Do", dotColor: "bg-text-muted" },
    { key: "in_progress", title: isHi ? "प्रगति पर" : "In Progress", dotColor: "bg-status-progress" },
    { key: "review", title: isHi ? "समीक्षाधीन" : "In Review", dotColor: "bg-status-pending" },
    { key: "blocked", title: isHi ? "गुणवत्ता अवरुद्ध" : "Quality Blocked", dotColor: "bg-status-blocked" },
    { key: "completed", title: isHi ? "पूर्ण" : "Completed", dotColor: "bg-status-completed" }
  ];

  container.innerHTML = `
    <!-- Top Command Deck -->
    <section class="flex flex-col gap-space-md mb-space-lg">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-2xl shadow-lg border border-surface-border relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex flex-col gap-space-xs z-10">
          <div class="flex items-center gap-space-xs text-primary font-label-sm uppercase font-bold">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>${isHi ? "सहकारी श्रम कार्य प्रबंधन" : "Collective Dispatch Engine • Co-op Operations"}</span>
          </div>
          <div class="flex items-baseline gap-space-sm">
            <h1 class="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              ${isHi ? "कार्य आबंटन एवं वितरण" : "Task Allocation & Distribution"}
            </h1>
          </div>
          <p class="font-body-sm text-body-sm text-text-muted">Orchestrating ${state.data.tasks.length} active work tickets across 4 co-op construction clusters</p>
        </div>
        <div class="flex flex-wrap items-center gap-space-sm z-10">
          <!-- Project Filter -->
          <div class="relative inline-block text-left">
            <select onchange="handleKanbanProjectFilter(this.value)" class="appearance-none bg-surface-container-high hover:bg-surface-container-highest text-text-primary pl-space-md pr-9 py-2 rounded-xl font-label-md text-label-md focus:outline-none transition-colors cursor-pointer border border-surface-border">
              <option value="all">All Projects (${state.data.tasks.length} Tasks)</option>
              ${state.data.projects.map(p => `
                <option value="${p.id}" ${state.filters.kanbanProject === p.id ? 'selected' : ''}>#${p.id} ${p.title}</option>
              `).join("")}
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-[18px]">expand_more</span>
          </div>
          <button onclick="openTaskModal()" class="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary-container px-space-lg py-2 rounded-xl font-label-lg text-label-lg transition-transform active:scale-95 shadow-md font-bold">
            <span class="material-symbols-outlined text-[20px]">add_box</span>
            <span>+ Create New Task</span>
          </button>
        </div>
      </div>

      <!-- Priority Filter Pills -->
      <div class="bg-surface-container p-space-md rounded-2xl flex flex-wrap items-center justify-between gap-space-md shadow-sm border border-surface-border">
        <div class="flex items-center gap-1 bg-surface-container-lowest px-2 py-1.5 rounded-xl border border-surface-border">
          <button onclick="handleKanbanPriorityFilter('all')" class="px-3 py-1 rounded-lg text-label-sm ${state.filters.kanbanPriority === 'all' ? 'bg-surface-container-highest text-text-primary font-bold' : 'text-text-muted hover:text-text-primary'}">All Priority</button>
          <button onclick="handleKanbanPriorityFilter('urgent')" class="px-3 py-1 rounded-lg text-label-sm ${state.filters.kanbanPriority === 'urgent' ? 'bg-error-container text-error font-bold' : 'text-error hover:bg-error-container/30'}">Urgent</button>
          <button onclick="handleKanbanPriorityFilter('high')" class="px-3 py-1 rounded-lg text-label-sm ${state.filters.kanbanPriority === 'high' ? 'bg-status-pending/30 text-status-pending font-bold' : 'text-status-pending hover:bg-surface-container-high'}">High</button>
          <button onclick="handleKanbanPriorityFilter('medium')" class="px-3 py-1 rounded-lg text-label-sm ${state.filters.kanbanPriority === 'medium' ? 'bg-surface-container-highest text-text-soft font-bold' : 'text-text-muted hover:text-text-primary'}">Medium</button>
        </div>
        <div class="flex items-center gap-space-lg text-right pl-space-md">
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-text-muted uppercase">Deployment Rate</span>
            <span class="font-headline-sm text-headline-sm text-primary font-bold">85.7%</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-text-muted uppercase">Active Blockers</span>
            <span class="font-headline-sm text-headline-sm text-status-blocked font-bold">2 Critical</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5-Column Kanban Matrix -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md items-start">
      ${columns.map(col => {
        const colTasks = tasks.filter(t => t.column === col.key);
        return `
          <div class="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-space-sm min-w-0 shadow-sm border border-surface-border">
            <div class="flex items-center justify-between px-space-xs py-space-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${col.dotColor}"></span>
                <h2 class="font-label-lg text-label-lg text-text-primary tracking-wide font-bold">${col.title}</h2>
              </div>
              <span class="bg-surface-container text-text-soft font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">${colTasks.length}</span>
            </div>
            <div class="flex flex-col gap-space-sm min-h-[300px]">
              ${colTasks.map(t => `
                <article class="bg-surface-container hover:bg-surface-container-high transition-all p-space-md rounded-xl flex flex-col gap-space-sm shadow-sm border border-surface-border hover:border-primary/40 group">
                  <div class="flex items-center justify-between gap-space-xs">
                    <span class="font-label-sm text-label-sm text-text-muted font-mono font-bold">#${t.id}</span>
                    <span class="px-2 py-0.5 rounded-full font-label-sm text-label-sm ${t.priority === 'urgent' ? 'bg-error-container/40 text-error font-bold' : t.priority === 'high' ? 'bg-status-pending/20 text-status-pending font-bold' : 'bg-surface-container-highest text-text-soft'}">
                      ${t.priorityLabel}
                    </span>
                  </div>
                  <h3 class="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors font-semibold leading-snug">
                    ${t.title}
                  </h3>
                  <div class="flex items-center gap-1.5 text-text-muted font-body-sm text-body-sm">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    <span class="truncate">${t.project}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1 pt-space-xs">
                    <span class="px-2 py-0.5 rounded bg-surface-container-lowest text-text-soft font-label-sm text-label-sm flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">handyman</span>
                      ${t.trade}
                    </span>
                  </div>
                  <div class="pt-space-xs flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-surface-border">
                    <div class="flex items-center gap-1 ${t.assignee === 'Unassigned' ? 'text-status-pending font-semibold' : 'text-text-soft font-medium'}">
                      <span class="material-symbols-outlined text-[14px]">${t.assignee === 'Unassigned' ? 'person_off' : 'badge'}</span>
                      <span class="truncate max-w-[100px]">${t.assignee}</span>
                    </div>
                    <div class="flex items-center gap-1 text-text-muted">
                      <span class="material-symbols-outlined text-[14px]">alarm</span>
                      <span>${t.dueDate}</span>
                    </div>
                  </div>
                  <!-- Quick Move Actions -->
                  <div class="flex items-center justify-between pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <select onchange="state.moveTask('${t.id}', this.value)" class="bg-surface-container-lowest text-text-muted text-label-sm rounded px-1.5 py-0.5 focus:outline-none cursor-pointer">
                      <option value="" disabled selected>Move to...</option>
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="blocked">Blocked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </section>
  `;
}

// 4. Worker Management Directory
function renderWorkers() {
  const container = document.getElementById("view-worker-management");
  if (!container) return;

  const isHi = state.lang === "hi";
  let workers = state.data.workers;

  // Apply filters
  if (state.filters.workerTrade !== "all") {
    workers = workers.filter(w => w.trade === state.filters.workerTrade);
  }
  if (state.filters.workerAvailability !== "all") {
    workers = workers.filter(w => w.status === state.filters.workerAvailability);
  }
  if (state.filters.workerSearch) {
    const q = state.filters.workerSearch.toLowerCase();
    workers = workers.filter(w => 
      w.name.toLowerCase().includes(q) || 
      w.id.toLowerCase().includes(q) || 
      w.tradeLabel.toLowerCase().includes(q) ||
      w.mobile.includes(q)
    );
  }

  container.innerHTML = `
    <!-- Top Control Banner -->
    <div class="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 shadow-xl border border-surface-border mb-space-lg">
      <div class="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              DL-COOP REGISTRY #DL-204
            </span>
            <span class="text-text-muted font-body-sm">•</span>
            <span class="text-text-muted font-body-sm">Section 4A Delhi Shramik Act</span>
          </div>
          <div class="flex flex-wrap items-baseline gap-3 pt-1">
            <h1 class="font-headline-xl text-headline-xl text-text-primary tracking-tight font-bold">
              ${isHi ? "श्रमिक प्रबंधन" : "Worker Management"}
            </h1>
          </div>
          <p class="font-body-md text-body-md text-text-soft max-w-2xl pt-1">
            Real-time cooperative worker allocation, biometrics status, credentials verification, and active deployment across Delhi-NCR civic projects.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button onclick="exportWorkerDirectory()" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-text-soft font-label-lg transition-all active:scale-95 font-semibold">
            <span class="material-symbols-outlined text-[18px]">download</span>
            <span>Export Directory</span>
          </button>
          <button onclick="openAllocModal()" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-all active:scale-95 shadow-lg shadow-primary/10 font-bold">
            <span class="material-symbols-outlined text-[20px]">person_add</span>
            <span>+ Request Worker Allocation</span>
          </button>
        </div>
      </div>

      <!-- Telemetry Strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 bg-surface-container-lowest/60 rounded-xl p-4 border border-surface-border">
        <div class="flex flex-col p-2 space-y-1">
          <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Total Supervised</span>
          <div class="flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-text-primary font-bold">42</span>
            <span class="font-body-sm text-body-sm text-text-muted">Artisans</span>
          </div>
          <span class="font-label-sm text-label-sm text-secondary font-semibold">100% Cooperative Cadre</span>
        </div>
        <div class="flex flex-col p-2 space-y-1">
          <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Verified Members</span>
          <div class="flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-primary font-bold">42 / 42</span>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-semibold">Aadhaar Linked</span>
        </div>
        <div class="flex flex-col p-2 space-y-1">
          <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Active On-Site</span>
          <div class="flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-text-primary font-bold">36</span>
            <span class="font-body-sm text-body-sm text-secondary font-semibold">Across 8 Sites</span>
          </div>
        </div>
        <div class="flex flex-col p-2 space-y-1">
          <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Attendance Rate</span>
          <div class="flex items-baseline gap-2">
            <span class="font-headline-lg text-headline-lg text-text-primary font-bold">96.4%</span>
            <span class="font-label-sm text-label-sm text-status-completed font-bold">↑ 1.2%</span>
          </div>
          <span class="font-label-sm text-label-sm text-text-muted">Rolling 30-Day Biometrics</span>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="space-y-4 mb-space-lg">
      <div class="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
          <input 
            oninput="handleWorkerSearch(this.value)"
            value="${state.filters.workerSearch}"
            class="w-full h-11 pl-11 pr-24 rounded-xl bg-surface-container-low text-text-primary placeholder-text-muted font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-surface-border shadow-sm" 
            placeholder="${isHi ? 'श्रमिक का नाम, आईडी, ट्रेड, फोन नंबर द्वारा खोजें...' : 'Search worker by name, ID (#WK-2026), trade, mobile number...'}" 
            type="text"
          />
        </div>
        <!-- Status Tabs -->
        <div class="flex items-center p-1 rounded-xl bg-surface-container-low gap-1 overflow-x-auto border border-surface-border">
          <button onclick="handleWorkerStatusFilter('all')" class="px-3.5 py-2 rounded-lg ${state.filters.workerAvailability === 'all' ? 'bg-surface-container-highest text-text-primary font-bold' : 'text-text-soft hover:bg-surface-container-high'} font-label-md text-label-md whitespace-nowrap transition-colors">
            All Status (42)
          </button>
          <button onclick="handleWorkerStatusFilter('present')" class="px-3.5 py-2 rounded-lg ${state.filters.workerAvailability === 'present' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-text-soft hover:bg-surface-container-high'} font-label-md text-label-md whitespace-nowrap transition-colors">
            Deployed (36)
          </button>
          <button onclick="handleWorkerStatusFilter('available')" class="px-3.5 py-2 rounded-lg ${state.filters.workerAvailability === 'available' ? 'bg-status-progress/30 text-status-progress font-bold' : 'text-status-progress hover:bg-surface-container-high'} font-label-md text-label-md whitespace-nowrap transition-colors">
            Available / Bench (6)
          </button>
          <button onclick="handleWorkerStatusFilter('on_leave')" class="px-3.5 py-2 rounded-lg ${state.filters.workerAvailability === 'on_leave' ? 'bg-status-pending/30 text-status-pending font-bold' : 'text-text-soft hover:bg-surface-container-high'} font-label-md text-label-md whitespace-nowrap transition-colors">
            On Leave (2)
          </button>
        </div>
      </div>

      <!-- Trade Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <span class="font-label-sm text-label-sm text-text-muted uppercase tracking-wider pr-1 flex items-center gap-1 font-bold">
          <span class="material-symbols-outlined text-[14px]">tune</span> Trade:
        </span>
        <button onclick="handleWorkerTradeFilter('all')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'all' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm font-semibold transition-all shadow-sm">
          <span>${isHi ? "सभी ट्रेड" : "All Trades"}</span>
        </button>
        <button onclick="handleWorkerTradeFilter('masonry')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'masonry' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm transition-all">
          <span class="material-symbols-outlined text-[15px]">handyman</span>
          <span>${isHi ? "राजमिस्त्री" : "Masonry"}</span>
        </button>
        <button onclick="handleWorkerTradeFilter('electrical')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'electrical' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm transition-all">
          <span class="material-symbols-outlined text-[15px]">bolt</span>
          <span>${isHi ? "इलेक्ट्रीशियन" : "Electrical"}</span>
        </button>
        <button onclick="handleWorkerTradeFilter('plumbing')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'plumbing' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm transition-all">
          <span class="material-symbols-outlined text-[15px]">plumbing</span>
          <span>${isHi ? "प्लंबर" : "Plumbing"}</span>
        </button>
        <button onclick="handleWorkerTradeFilter('carpentry')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'carpentry' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm transition-all">
          <span class="material-symbols-outlined text-[15px]">carpenter</span>
          <span>${isHi ? "बढ़ई" : "Carpentry"}</span>
        </button>
        <button onclick="handleWorkerTradeFilter('painting')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full ${state.filters.workerTrade === 'painting' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-low hover:bg-surface-container-high text-text-soft'} font-label-sm text-label-sm transition-all">
          <span class="material-symbols-outlined text-[15px]">format_paint</span>
          <span>${isHi ? "पेंटर" : "Painting"}</span>
        </button>
      </div>
    </div>

    <!-- Workers Dossiers & Roster Grid -->
    <div class="grid grid-cols-1 2xl:grid-cols-4 gap-6 items-start">
      <!-- Worker Dossier List (3 cols) -->
      <div class="2xl:col-span-3 space-y-4">
        ${workers.map(w => `
          <div class="rounded-2xl bg-surface-container-low p-5 shadow-lg border border-surface-border hover:border-primary/50 transition-all hover:bg-surface-container-high/40">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <div class="relative">
                  <img src="${w.avatar}" alt="${w.name}" class="w-14 h-14 rounded-2xl object-cover shadow-md border border-surface-border">
                  <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-status-completed flex items-center justify-center text-[10px] text-white font-bold" title="Aadhaar Verified">✓</span>
                </div>
                <div class="space-y-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-headline-sm text-headline-sm text-text-primary font-bold">${isHi ? w.nameHi : w.name}</span>
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-text-muted font-mono font-bold">${w.id}</span>
                    <span class="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      <span class="material-symbols-outlined text-[13px]">verified</span> ${isHi ? w.tradeLabelHi : w.tradeLabel}
                    </span>
                  </div>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-body-sm text-body-sm">
                    <span>Society: <strong class="text-text-soft font-semibold">Delhi Labour Sahkari #DL-204</strong></span>
                    <span>•</span>
                    <span>Site: <strong class="text-primary font-semibold">${w.site}</strong></span>
                    <span>•</span>
                    <span>Wage: <strong class="text-secondary font-mono">${w.dailyWage}/day</strong></span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 pt-1">
                    ${w.skills.map(s => `
                      <span class="px-2 py-0.5 rounded bg-surface-container-lowest text-text-soft font-label-sm text-label-sm border border-surface-border">
                        ${s}
                      </span>
                    `).join("")}
                  </div>
                </div>
              </div>

              <!-- Status & Contact Action Cluster -->
              <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-surface-border">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-full ${w.status === 'present' ? 'bg-status-completed/15 text-secondary font-bold' : w.status === 'on_leave' ? 'bg-status-pending/20 text-status-pending font-bold' : w.status === 'available' ? 'bg-status-progress/20 text-status-progress font-bold' : 'bg-error-container/40 text-error font-bold'} font-label-sm text-label-sm">
                    ${w.statusLabel}
                  </span>
                  <div class="flex items-center text-status-pending font-label-sm text-label-sm font-bold">
                    <span class="material-symbols-outlined text-[15px] fill-current">star</span>
                    <span>${w.rating}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <a href="tel:${w.mobile}" class="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-text-soft hover:text-text-primary font-label-md text-label-md transition-colors flex items-center gap-1 font-semibold">
                    <span class="material-symbols-outlined text-[16px]">call</span>
                    <span>Call</span>
                  </a>
                  <button onclick="viewWorkerDossier('${w.id}')" class="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md transition-colors font-bold">
                    Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Right Telemetry Panel (1 col) -->
      <div class="space-y-space-md">
        <div class="rounded-2xl bg-surface-container-low p-5 shadow-lg border border-surface-border space-y-3">
          <h3 class="font-headline-sm text-headline-sm text-text-primary font-bold">Cooperative Trade Roster</h3>
          <div class="space-y-3 pt-1">
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1">
                <span class="text-text-soft">Masons (14 artisans)</span>
                <span class="text-text-primary font-bold">100% Deployed</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1">
                <span class="text-text-soft">Painters (10 artisans)</span>
                <span class="text-text-primary font-bold">90% Deployed</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 90%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1">
                <span class="text-text-soft">Electricians (8 artisans)</span>
                <span class="text-text-primary font-bold">87.5% Deployed</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: 87.5%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1">
                <span class="text-text-soft">Plumbers (6 artisans)</span>
                <span class="text-status-progress font-bold">66% Deployed (2 Free)</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="h-full bg-status-progress rounded-full" style="width: 66.6%"></div>
              </div>
            </div>
          </div>
          <div class="pt-2">
            <button onclick="openAllocModal()" class="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-bold transition-colors text-center">
              Deploy Available Bench →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 5. Attendance & Daily Muster Roll
function renderAttendance() {
  const container = document.getElementById("view-attendance");
  if (!container) return;

  const isHi = state.lang === "hi";

  container.innerHTML = `
    <div class="space-y-space-lg">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-2xl shadow-lg border border-surface-border">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm font-bold">
              DAILY MUSTER ROLL • 23 OCT 2026
            </span>
          </div>
          <h1 class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">
            ${isHi ? "दैनिक मस्टर रोल एवं बायोमेट्रिक उपस्थिति" : "Daily Muster Roll & Biometric Attendance"}
          </h1>
          <p class="font-body-md text-body-md text-text-muted">
            Certified attendance log for Delhi Shramik Sahkari Society Unit #DL-204
          </p>
        </div>
        <div class="flex items-center gap-space-sm">
          <button onclick="printMusterRoll()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-text-soft font-label-md font-semibold transition-colors">
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Print PDF</span>
          </button>
          <button onclick="exportMusterCSV()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary font-label-md font-bold transition-colors">
            <span class="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <!-- Muster Table -->
      <div class="rounded-2xl bg-surface-container-low shadow-md overflow-hidden border border-surface-border">
        <div class="overflow-x-auto">
          <table class="w-full text-left font-body-sm text-body-sm">
            <thead class="bg-surface-container text-text-muted font-label-sm text-label-sm uppercase">
              <tr>
                <th class="py-3.5 px-4">Worker ID & Name</th>
                <th class="py-3.5 px-4">Trade</th>
                <th class="py-3.5 px-4">Site Location</th>
                <th class="py-3.5 px-4">Punch In Time</th>
                <th class="py-3.5 px-4">Punch Out</th>
                <th class="py-3.5 px-4">Wage Credited</th>
                <th class="py-3.5 px-4">Status</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-border">
              ${state.data.workers.map(w => `
                <tr class="hover:bg-surface-container transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <img src="${w.avatar}" alt="${w.name}" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-headline-sm text-headline-sm text-text-primary font-bold">${w.name}</div>
                        <div class="font-mono text-label-sm text-text-muted">${w.id}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 text-text-soft font-medium">${w.tradeLabel}</td>
                  <td class="py-3.5 px-4 text-text-soft">${w.site}</td>
                  <td class="py-3.5 px-4 font-mono font-bold ${w.status === 'present' ? 'text-secondary' : 'text-text-muted'}">${w.checkInTime}</td>
                  <td class="py-3.5 px-4 font-mono text-text-muted">${w.status === 'present' ? '05:30 PM (Scheduled)' : '--:--'}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-text-primary">${w.dailyWage}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full ${w.status === 'present' ? 'bg-status-completed/15 text-secondary font-bold' : w.status === 'on_leave' ? 'bg-status-pending/20 text-status-pending font-bold' : 'bg-error-container/40 text-error font-bold'} font-label-sm">
                      ${w.statusLabel}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button onclick="toggleAttendanceStatus('${w.id}')" class="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm font-semibold transition-colors">
                      Toggle
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// 6. Issues & Complaints
function renderIssues() {
  const container = document.getElementById("view-issues-complaints");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-space-lg">
      <div class="bg-surface-container-low p-space-lg rounded-2xl shadow-lg border border-surface-border">
        <h1 class="font-headline-xl text-headline-xl text-text-primary font-bold tracking-tight">Issues & Escalations</h1>
        <p class="font-body-md text-body-md text-text-muted">Direct grievance, material shortage & regulatory resolution ticketing</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        ${state.data.blockers.map(b => `
          <div class="bg-surface-container-low p-space-lg rounded-2xl shadow-lg border border-surface-border flex flex-col justify-between gap-space-md">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono font-bold text-primary">${b.id}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-error-container/30 text-error font-bold text-label-sm">High Priority Ticket</span>
              </div>
              <h2 class="font-headline-sm text-headline-sm text-text-primary font-bold mb-1">${b.project}</h2>
              <p class="font-body-md text-body-md text-text-muted">${b.description}</p>
            </div>
            <div class="flex items-center justify-end gap-space-sm pt-4 border-t border-surface-border">
              <button onclick="handleBlockerAction('${b.id}', 'supplier')" class="px-4 py-2 rounded-xl bg-surface-container-high text-text-soft hover:text-text-primary font-label-md font-semibold transition-colors">
                ${b.action1}
              </button>
              <button onclick="handleBlockerAction('${b.id}', 'reallocate')" class="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary font-label-md font-bold transition-colors">
                Resolve & Close Ticket
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// --- Navigation Controller ---
function navigateTo(route) {
  state.setRoute(route);
}

function renderCurrentRoute() {
  const routes = ["overview", "running-projects", "task-allocation", "worker-management", "attendance", "issues-complaints"];
  
  routes.forEach(r => {
    const el = document.getElementById(`view-${r}`);
    if (el) {
      if (r === state.currentRoute) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }

    // Update sidebar nav active classes
    const navLink = document.querySelector(`[data-path="${r}"]`);
    if (navLink) {
      if (r === state.currentRoute) {
        navLink.className = "flex items-center justify-between px-space-md py-2.5 rounded-xl transition-colors bg-primary-container text-on-primary-container font-headline-sm font-bold shadow-sm";
      } else {
        navLink.className = "flex items-center justify-between px-space-md py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-medium";
      }
    }
  });

  // Render view content
  if (state.currentRoute === "overview") renderOverview();
  else if (state.currentRoute === "running-projects") renderRunningProjects();
  else if (state.currentRoute === "task-allocation") renderKanban();
  else if (state.currentRoute === "worker-management") renderWorkers();
  else if (state.currentRoute === "attendance") renderAttendance();
  else if (state.currentRoute === "issues-complaints") renderIssues();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Interactive Handlers ---
function setProjectsViewMode(mode) {
  state.views.projectsViewMode = mode;
  renderRunningProjects();
}

function handleProjectFilter(key, val) {
  state.filters[key] = val;
  renderRunningProjects();
}

function handleProjectSearch(val) {
  state.filters.projectSearch = val;
  renderRunningProjects();
}

function handleWorkerSearch(val) {
  state.filters.workerSearch = val;
  renderWorkers();
}

function handleWorkerTradeFilter(trade) {
  state.filters.workerTrade = trade;
  renderWorkers();
}

function handleWorkerStatusFilter(status) {
  state.filters.workerAvailability = status;
  renderWorkers();
}

function handleKanbanPriorityFilter(priority) {
  state.filters.kanbanPriority = priority;
  renderKanban();
}

function handleKanbanProjectFilter(projId) {
  state.filters.kanbanProject = projId;
  renderKanban();
}

function toggleAttendanceStatus(workerId) {
  const worker = state.data.workers.find(w => w.id === workerId);
  if (worker) {
    worker.status = worker.status === "present" ? "absent" : "present";
    worker.statusLabel = worker.status === "present" ? "Present (Active)" : "Absent (Unreported)";
    worker.checkInTime = worker.status === "present" ? "08:15 AM" : "--:--";
    state.save();
    renderAttendance();
    showToast(`Updated attendance for ${worker.name}`);
  }
}

function handleBlockerAction(blockerId, action) {
  showToast(`Supervisor Override Dispatched: Action recorded on unit ledger!`);
}

// --- Modals Logic ---
function openTaskModal() {
  const modal = document.getElementById("task-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeTaskModal() {
  const modal = document.getElementById("task-modal");
  if (modal) modal.classList.add("hidden");
}

function submitNewTask(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.taskTitle.value;
  const project = form.taskProject.value;
  const priority = form.taskPriority.value;
  const trade = form.taskTrade.value;
  const assignee = form.taskAssignee.value;
  const dueDate = form.taskDueDate.value || "Tomorrow";

  const newTask = {
    id: `TSK-${Math.floor(450 + Math.random() * 500)}`,
    title: title,
    titleHi: title,
    project: project,
    projectId: "PRJ-2026-084",
    column: "todo",
    priority: priority,
    priorityLabel: priority.toUpperCase(),
    trade: trade,
    assignee: assignee,
    dueDate: dueDate,
    description: "New dispatch registered via Supervisor Command Center."
  };

  state.addTask(newTask);
  closeTaskModal();
  form.reset();
  showToast(`Task ${newTask.id} successfully dispatched to site crew!`);
}

function openMusterModal() {
  navigateTo("attendance");
  showToast("Loaded Daily Muster Roll for DL-204");
}

function inspectProject(projectId) {
  const p = state.data.projects.find(proj => proj.id === projectId);
  if (!p) return;
  
  const modal = document.getElementById("project-inspect-modal");
  const content = document.getElementById("project-inspect-content");
  if (modal && content) {
    content.innerHTML = `
      <div class="space-y-4">
        <div class="relative h-44 rounded-xl overflow-hidden">
          <img src="${p.image}" class="w-full h-full object-cover" alt="${p.title}">
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent"></div>
          <div class="absolute bottom-3 left-3">
            <span class="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold text-label-sm">${p.id}</span>
            <h2 class="text-headline-sm font-bold text-white mt-1">${p.title}</h2>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 text-body-sm bg-surface-container p-3 rounded-xl border border-surface-border">
          <div><span class="text-text-muted">Client:</span> <strong class="text-text-primary">${p.client}</strong></div>
          <div><span class="text-text-muted">Location:</span> <strong class="text-text-primary">${p.location}</strong></div>
          <div><span class="text-text-muted">Crew Lead:</span> <strong class="text-text-primary">${p.crewLead}</strong></div>
          <div><span class="text-text-muted">Workers:</span> <strong class="text-text-primary">${p.crewCount} Deployed</strong></div>
          <div><span class="text-text-muted">Budget Spent:</span> <strong class="text-secondary">${p.budgetSpent} / ${p.budget}</strong></div>
          <div><span class="text-text-muted">Target Deadline:</span> <strong class="text-text-primary">${p.targetDate}</strong></div>
        </div>
        <div>
          <div class="flex justify-between text-label-sm mb-1">
            <span class="text-text-muted">Overall Progress</span>
            <span class="text-primary font-bold">${p.progress}%</span>
          </div>
          <div class="w-full bg-surface-container-highest rounded-full h-2">
            <div class="bg-primary h-full rounded-full" style="width: ${p.progress}%"></div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-surface-container border border-surface-border">
          <span class="font-label-sm text-text-muted uppercase">Current Milestone</span>
          <div class="font-headline-sm text-text-primary font-semibold mt-0.5">${p.milestone}</div>
          <span class="inline-block mt-1 px-2 py-0.5 rounded bg-surface-container-highest text-secondary text-label-sm font-bold">${p.milestoneStatus}</span>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  }
}

function closeProjectInspectModal() {
  const modal = document.getElementById("project-inspect-modal");
  if (modal) modal.classList.add("hidden");
}

function viewWorkerDossier(workerId) {
  const w = state.data.workers.find(worker => worker.id === workerId);
  if (!w) return;

  const modal = document.getElementById("worker-dossier-modal");
  const content = document.getElementById("worker-dossier-content");
  if (modal && content) {
    content.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src="${w.avatar}" class="w-16 h-16 rounded-2xl object-cover border border-surface-border" alt="${w.name}">
          <div>
            <h2 class="font-headline-sm text-text-primary font-bold">${w.name} (${w.nameHi})</h2>
            <div class="font-mono text-label-sm text-primary font-bold">${w.id}</div>
            <div class="text-text-soft text-body-sm font-medium">${w.tradeLabel}</div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 bg-surface-container p-3 rounded-xl border border-surface-border text-body-sm">
          <div><span class="text-text-muted">Aadhaar Status:</span> <strong class="text-secondary">Verified</strong></div>
          <div><span class="text-text-muted">Attendance (30D):</span> <strong class="text-primary">${w.attendanceRate}%</strong></div>
          <div><span class="text-text-muted">Daily Wage:</span> <strong class="text-text-primary font-mono">${w.dailyWage}</strong></div>
          <div><span class="text-text-muted">Rating:</span> <strong class="text-status-pending">★ ${w.rating}</strong></div>
          <div><span class="text-text-muted">Phone:</span> <strong class="text-text-primary">${w.mobile}</strong></div>
          <div><span class="text-text-muted">Member Since:</span> <strong class="text-text-primary">${w.memberSince}</strong></div>
        </div>
        <div>
          <span class="font-label-sm text-text-muted uppercase">Verified Trade Skills</span>
          <div class="flex flex-wrap gap-1.5 mt-1.5">
            ${w.skills.map(s => `<span class="px-2.5 py-1 rounded-lg bg-surface-container-highest text-text-soft text-label-sm font-semibold">${s}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  }
}

function closeWorkerDossierModal() {
  const modal = document.getElementById("worker-dossier-modal");
  if (modal) modal.classList.add("hidden");
}

function toggleNotifications() {
  const popover = document.getElementById("notifications-popover");
  if (popover) popover.classList.toggle("hidden");
}

function exportMusterCSV() {
  let csv = "Worker ID,Name,Trade,Site,Punch In,Status,Wage\n";
  state.data.workers.forEach(w => {
    csv += `"${w.id}","${w.name}","${w.tradeLabel}","${w.site}","${w.checkInTime}","${w.statusLabel}","${w.dailyWage}"\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Muster_Roll_DL204_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  showToast("Muster roll CSV downloaded successfully!");
}

function printMusterRoll() {
  window.print();
}

function exportWorkerDirectory() {
  exportMusterCSV();
}

function openAllocModal() {
  showToast("Worker Allocation Dispatch Terminal active");
}

function openRegisterProjectModal() {
  showToast("Project Registration Wizard opened");
}

function updateTranslations() {
  const isHi = state.lang === "hi";
  const btnEn = document.getElementById("lang-en-btn");
  const btnHi = document.getElementById("lang-hi-btn");

  if (btnEn && btnHi) {
    if (isHi) {
      btnHi.className = "px-2 py-1 font-label-sm text-label-sm rounded bg-primary-container text-on-primary-container font-bold";
      btnEn.className = "px-2 py-1 font-label-sm text-label-sm rounded text-text-muted hover:text-text-primary transition-colors";
    } else {
      btnEn.className = "px-2 py-1 font-label-sm text-label-sm rounded bg-primary-container text-on-primary-container font-bold";
      btnHi.className = "px-2 py-1 font-label-sm text-label-sm rounded text-text-muted hover:text-text-primary transition-colors";
    }
  }

  // Update Sidebar text dynamically
  const subHeading = document.getElementById("sidebar-subheading");
  if (subHeading) subHeading.textContent = isHi ? "पर्यवेक्षक पोर्टल" : "Supervisor Portal";

  const navOverview = document.getElementById("nav-text-overview");
  if (navOverview) navOverview.textContent = isHi ? "समीक्षा" : "Overview";

  const navProjects = document.getElementById("nav-text-running-projects");
  if (navProjects) navProjects.textContent = isHi ? "चालू परियोजनाएं" : "Running Projects";

  const navTasks = document.getElementById("nav-text-task-allocation");
  if (navTasks) navTasks.textContent = isHi ? "कार्य आबंटन" : "Task Allocation";

  const navWorkers = document.getElementById("nav-text-worker-management");
  if (navWorkers) navWorkers.textContent = isHi ? "श्रमिक निर्देशिका" : "Worker Directory";

  const navAttendance = document.getElementById("nav-text-attendance");
  if (navAttendance) navAttendance.textContent = isHi ? "उपस्थिति" : "Attendance";

  const navIssues = document.getElementById("nav-text-issues-complaints");
  if (navIssues) navIssues.textContent = isHi ? "समस्याएं" : "Issues & Blockers";

  // Update Header search input placeholder
  const searchInput = document.getElementById("global-search-input");
  if (searchInput) searchInput.placeholder = isHi ? "परियोजनाएं, श्रमिक, कार्य खोजें (Ctrl+K)..." : "Search projects, site crew, tokens (Ctrl+K)...";

  renderCurrentRoute();
}

// Global Keyboard Shortcuts (Ctrl+K or Cmd+K)
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) searchInput.focus();
  }
});

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderCurrentRoute();
  updateTranslations();

  // Handle Hash Routing
  if (window.location.hash) {
    const route = window.location.hash.replace("#", "");
    if (["overview", "running-projects", "task-allocation", "worker-management", "attendance", "issues-complaints"].includes(route)) {
      state.setRoute(route);
    }
  }
});
