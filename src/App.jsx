import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import WhySahkarSathi from "./components/home/WhySahkarSathi";
import RouteModal from "./components/common/RouteModal";
import { BRAND } from "./config/brand";

// Lazy-load below-the-fold sections for optimal initial bundle & Lighthouse 90+
const ServicesGrid = lazy(() => import("./components/home/ServicesGrid"));
const HireModes = lazy(() => import("./components/home/HireModes"));
const HowItWorks = lazy(() => import("./components/home/HowItWorks"));
const ProjectsShowcase = lazy(() => import("./components/home/ProjectsShowcase"));
const ForContractors = lazy(() => import("./components/home/ForContractors"));
const WorkerRights = lazy(() => import("./components/home/WorkerRights"));
const ComparisonTable = lazy(() => import("./components/home/ComparisonTable"));
const ImpactStats = lazy(() => import("./components/home/ImpactStats"));
const ForWorkersCTA = lazy(() => import("./components/home/ForWorkersCTA"));
const FaqAccordion = lazy(() => import("./components/home/FaqAccordion"));
const FinalCta = lazy(() => import("./components/home/FinalCta"));
const Footer = lazy(() => import("./components/home/Footer"));
const AIAssistantModal = lazy(() => import("./components/home/AIAssistantModal"));

// Loading fallback placeholder with subtle shimmer
function SectionLoader() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [extraRouteData, setExtraRouteData] = useState(null);

  // Sync document title and meta using BRAND configuration
  useEffect(() => {
    document.title = `${BRAND.name} | ${BRAND.tagline}`;
  }, []);

  const handleNavigate = (route, data = null) => {
    if (route.startsWith("#")) {
      const el = document.querySelector(route);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    setActiveRoute(route);
    setExtraRouteData(data);
  };

  const handleCloseModal = () => {
    setActiveRoute(null);
    setExtraRouteData(null);
  };

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-sans selection:bg-primary/20 selection:text-primary-hover">
      {/* 1. Sticky Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Home Page Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Brand Tagline, Smart Search & Mock Worker ID Card */}
        <Hero onNavigate={handleNavigate} />

        {/* 3. NEW: Why SahkarSathi (4 cards + brand statement) */}
        <WhySahkarSathi />

        <Suspense fallback={<SectionLoader />}>
          {/* 4. Popular services grid (8 cards from PRICING) */}
          <ServicesGrid onNavigate={handleNavigate} />

          {/* 5. Two ways to hire: Single worker vs Team / Bulk hiring */}
          <HireModes onNavigate={handleNavigate} />

          {/* 6. How it works (6 horizontal steps, vertical on mobile) */}
          <HowItWorks />

          {/* 7. Supervisor-led projects showcase (Dashboard preview card) */}
          <ProjectsShowcase onNavigate={handleNavigate} />

          {/* 8. NEW: For Contractors strip */}
          <ForContractors onNavigate={handleNavigate} />

          {/* 9. Verified identity & worker rights (3 cards) */}
          <WorkerRights onNavigate={handleNavigate} />

          {/* 10. How we're different comparison table */}
          <ComparisonTable />

          {/* 11. Impact stats band with count-up animation */}
          <ImpactStats />

          {/* 12. For workers CTA banner */}
          <ForWorkersCTA onNavigate={handleNavigate} />

          {/* 13. FAQ accordion (6 items) */}
          <FaqAccordion />

          {/* 14. Final CTA banner with BRAND.tagline */}
          <FinalCta onNavigate={handleNavigate} />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer onNavigate={handleNavigate} />
      </Suspense>

      {/* 15. Floating AI assistant button */}
      <Suspense fallback={null}>
        <AIAssistantModal onNavigate={handleNavigate} />
      </Suspense>

      {/* Interactive Placeholder Route Modal for nav links and CTAs */}
      <RouteModal
        activeRoute={activeRoute}
        onClose={handleCloseModal}
        extraData={extraRouteData}
      />
    </div>
  );
}
