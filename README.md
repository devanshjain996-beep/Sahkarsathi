# SAKHARSATHI (सहकार साथी • SahkariGig)
### Supervisor Operations Command Center Dashboard (पर्यवेक्षक संचालन कमांड सेंटर)

A production-grade, interactive, real-time cooperative workforce operations dashboard built from the **SahkariGig Supervisor Operations Interface** specifications (`c:\Users\Vaishnavi Sharma\OneDrive\Desktop\SS`).

Designed specifically for project supervisors, cooperative coordinators, and trade union leads overseeing distributed skilled manual and technical labor across high-velocity civic infrastructure and municipal projects.

---

## 🌟 Key Highlights & Features

1. **Unified Command Center (Overview / समीक्षा)**
   - **8 Executive Bento Telemetry Metrics**: Total Projects, Running Projects, Total Artisans, Daily Muster Rate (90.4%), Critical Blockers, Completed Handed-over Sites, Open Task Matrix, and Upcoming 72h Milestones.
   - **Operational Blockers Strip**: Immediate supervisor override actions for material deficits (Rohini Community Hall) and municipal inspection holds (Dwarka DDA Flats).
   - **Today's Attendance Stream**: Live geofenced & biometric punches with Aadhaar verification.
   - **Trade Workload Capacity Gauges**: Masonry, Electrical, Carpentry, Painting, and Plumbing capacity vs. bench availability.
   - **Live Socket.IO Stream**: Realtime audit trail of milestone progress, supervisor escalations, and DBT wage reconciliations.

2. **Running Projects Workspace (चालू परियोजनाएं)**
   - Dual-mode visualization: **Cards View** (with site photos, sprint progress rings, and milestone flags) and **Data Matrix Table View**.
   - Filters by Trade (House Construction, Renovation, Electrical, Plumbing, Painting), Status (In Progress, Delayed, On Hold), and Location.
   - **Interactive Project Inspector Modal**: Deep dive into site leads, crew deployment, material burndown (`₹3.65L / ₹5.40L`), and QA audit sign-off.

3. **Task Allocation Kanban Board (कार्य आबंटन)**
   - 5-Column Workflow: **To Do (करने योग्य)**, **In Progress (प्रगति पर)**, **In Review (समीक्षा)**, **Quality Blocked (अवरुद्ध)**, and **Completed (पूर्ण)**.
   - Dynamic task cards with priority badges (Urgent, High, Medium, Low), trade skill badges, worker avatars, and due dates.
   - Quick column move selector on hover.
   - **Slide-Over Dispatch Drawer**: Create new work tickets, assign to trade leads, and dispatch directly to site workers with live toast feedback.

4. **Worker Management Directory (श्रमिक प्रबंधन)**
   - 42 Supervised cooperative cadre artisans.
   - Filter by Trade (Masons, Electricians, Plumbers, Carpenters, Painters) and Availability (Deployed, Available Bench, On Leave).
   - Instant live search by name, ID (`#WK-2026-4412`), trade, or mobile number.
   - **Artisan Dossier Modal**: Aadhaar verification badge, 30-day attendance score (`98.5%`), daily wage ledger, and verified trade skills.

5. **Daily Muster Roll & Biometric Attendance (उपस्थिति रजिस्टर)**
   - Certified daily attendance register for Delhi Shramik Sahkari Society Unit `#DL-204`.
   - Toggle worker attendance status on the fly.
   - **1-Click Export CSV**: Instantly generates downloadable `Muster_Roll_DL204_YYYY-MM-DD.csv`.
   - **Printable PDF Form**: Clean print stylesheet formatted for official audits.

6. **Bilingual Support (English & हिन्दी)**
   - Complete live language switch between English and Hindi across navigation, badges, metric titles, and buttons.

7. **Keyboard Shortcuts & Quick Actions**
   - Press <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>⌘</kbd> + <kbd>K</kbd> to activate the universal command search.

---

## 🚀 How to Run the Dashboard

The dashboard is completely self-contained with **zero dependencies or install steps required**.

### Option 1: Direct Browser Launch (Easiest)
Simply double click on `index.html` or run this command in PowerShell:
```powershell
Start-Process "c:\Users\Vaishnavi Sharma\OneDrive\Desktop\SAKHARSATHI\index.html"
```

### Option 2: Local Web Server
If you prefer running via a local HTTP server:
```powershell
# Using Python (if installed):
python -m http.server 3000

# Using Node / npx (if installed):
npx serve .
```
Then open `http://localhost:3000` in your web browser.

---

## 🎨 Design System & Palette Compliance

Matches `DESIGN.md` in `c:\Users\Vaishnavi Sharma\OneDrive\Desktop\SS`:
- **Canvas Base**: `#0C1323` / `#050B1B` (Deep Navy-Black)
- **Cards & Surfaces**: `#151B2C` / `#191F30` (Slate Navy) with `#243047` contours
- **Primary Accent**: `#2DD4A0` / `#56F1BB` (Vibrant Mint)
- **Secondary Accent**: `#77DAA1` / `#059669` (Cooperative Emerald)
- **Status Colors**:
  - `Completed`: `#059669`
  - `In Progress`: `#0284C7`
  - `Pending`: `#F59E0B`
  - `Critical Blocker`: `#EF4444`
- **Typography**: Geometric display and high-density tabular numbers powered by **Outfit** and **JetBrains Mono**.

---

## 📁 Project Structure

```
SAKHARSATHI/
├── index.html         # Main unified Single Page Application (SPA)
├── app.js             # State management, data stores, filters, modal controllers
├── styles.css         # Custom tokens, scrollbars, glowing accents, print styles
├── DESIGN.md          # Design token specifications from the design prototype
├── assets/            # Design screenshots and mockup references
│   ├── overview_screen.png
│   ├── projects_screen.png
│   ├── kanban_screen.png
│   └── workers_screen.png
└── README.md          # Project documentation
```

*Built for Delhi Shramik Sahkari Society • Co-op Unit #DL-204 • Smart India Hackathon (SIH 2026)*
