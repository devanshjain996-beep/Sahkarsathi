# SahkarSathi — Customer Desktop Portal

> **"Every Worker Matters. Every Home Counts."**  
> An equitable cooperative gig-economy platform connecting verified tradespersons directly with households with a 92% direct wage model and completion-PIN escrow security.

---

## 🌟 Highlights & Features

This application represents the **SahkarSathi Customer Portal (Desktop View)** focusing on the **Active Bookings** workflow with end-to-end interactive simulation:

### 1. 🚴 Real-Time Dispatch Radar & Live Tracking Map
- Simulated SVG road map of HSR Layout (19th Main Road to Flat 402, Green Glen Orchid Apts).
- Live technician marker with pulsing radar animation that advances along the route.
- Interactive ETA countdown timer and 5-step dispatch journey tracker.

### 2. 🛡️ 92% Cooperative Transparency & Escrow Breakdown
- Complete fee ledger: **92% directly to the worker-owner** (`₹643.08`), **8% cooperative collective fund & insurance** (`₹55.92`).
- 4-digit **Completion OTP (4821)** safeguard: Escrow is released only after you verify the completed service.
- **₹25,000 Accidental Damage Guarantee** badge on verified master electricians and HVAC technicians.

### 3. 💬 Integrated Worker Communication
- **Live Chat Drawer**: Instant bi-directional messaging with assigned technicians (Suresh Kumar, Rajesh Verma) with pre-set quick chips (e.g., *"Call at gate"*, *"Parking open"*).
- **Masked Phone Relay**: Simulated privacy dialer protecting your personal mobile number.

### 4. 🔄 Flexible Booking Management
- **Free Rescheduling**: Interactive modal to select dates (Today, Tomorrow, Sunday) and slots (Morning, Afternoon, Evening) with zero penalty.
- **Zero-Penalty Cancellation**: 100% instant refund back to escrow source.
- **Tax Invoice & Receipt Generation**: Formatted cooperative tax invoice with SAC code 9987 and print-to-PDF support (`window.print()`).

### 5. 🔍 Search & Multi-Tab Status Filtering
- Filter by status tabs: *All Active (2)*, *Worker Assigned (1)*, *Confirmed (1)*, *In Progress (0)*, etc.
- Quick search bar with `/` keyboard shortcut for instant filtering by trade, technician name, or booking ref.
- Preview mode toggle between **Active Orders (2)** and **Empty State**.

---

## 🚀 Quick Start (Running Locally)

### Option A: Open directly in Browser
Simply open [`index.html`](file:///c:/Users/VANSH%20MITTAL/OneDrive/Desktop/sahkarsathi-customer-desktop/index.html) in Chrome, Edge, or any modern web browser:
```powershell
Start-Process "index.html"
```

### Option B: Local HTTP Server (Python)
```powershell
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 📁 Project Structure

```
sahkarsathi-customer-desktop/
├── index.html       # Standalone high-fidelity interactive Customer Portal
└── README.md        # Documentation and walkthrough guide
```
