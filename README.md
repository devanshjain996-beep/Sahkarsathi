# SahkarSathi 

> **"Every Worker Matters. Every Home Counts."** 
> 

SahkarSathi is an open cooperative gig-services platform connecting verified skilled craftspeople and multi-trade teams with households and contractors at transparent, surge-free rates.

Built for the **Smart India Hackathon 2026**.

---

## 🌟 Key Features

- **Cooperative Model**: Fair work-sharing across verified members rather than algorithmic favoritism.
- **Transparent Democratic Pricing**: Upfront cooperative standard rates without surge pricing or hidden commissions.
- **Two Ways to Hire**:
  - *Single Worker*: Quick on-demand dispatch for repairs (electrician, plumbing, AC, etc.).
  - *Team / Bulk Hiring*: Supervisor-led multi-trade crews (mason, carpenter, painter, plumber, electrician) coordinated under one master supervisor.
- **Verified Worker Digital ID**: 4-tier verification including Aadhaar eKYC, police record clearance, cooperative trade evaluation, and e-Shram linkage.
- **Milestone Escrow Protection**: Project funds held securely and released upon joint supervisor inspection and client satisfaction.
- **Bilingual & Accessible**: Full English and Hindi (हिंदी) support with WCAG AA compliance and `prefers-reduced-motion` handling.
- **AI Assistant**: Interactive cooperative assistant for quick inquiries, rate checks, and verification lookups.

---

## 🛠️ Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v3** (Tokenized dark theme with CSS custom properties)
- **Framer Motion** (Subtle micro-animations)
- **Lucide React** (Icons)
- **Custom i18n Engine** (React context + JSON translations)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/devanshjain996-beep/Sahkarsathi.git
cd Sahkarsathi
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration

- **Brand & Tagline**: Edit [`src/config/brand.js`](src/config/brand.js)
- **Pricing & Rates**: Edit [`src/config/pricing.js`](src/config/pricing.js)
- **Impact Stats**: Edit [`src/config/stats.js`](src/config/stats.js)
- **Translations**: Edit [`src/i18n/en.json`](src/i18n/en.json) and [`src/i18n/hi.json`](src/i18n/hi.json)
