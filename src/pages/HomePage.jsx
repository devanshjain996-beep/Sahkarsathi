import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import WhySahkarSathi from "../components/home/WhySahkarSathi";
import RouteModal from "../components/common/RouteModal";
import { BRAND } from "../config/brand";

// Lazy-load below-the-fold sections
const ServicesGrid = lazy(() => import("../components/home/ServicesGrid"));
const HireModes = lazy(() => import("../components/home/HireModes"));
const HowItWorks = lazy(() => import("../components/home/HowItWorks"));
const ProjectsShowcase = lazy(() => import("../components/home/ProjectsShowcase"));
const ForContractors = lazy(() => import("../components/home/ForContractors"));
const WorkerRights = lazy(() => import("../components/home/WorkerRights"));
const ComparisonTable = lazy(() => import("../components/home/ComparisonTable"));
const ImpactStats = lazy(() => import("../components/home/ImpactStats"));
const ForWorkersCTA = lazy(() => import("../components/home/ForWorkersCTA"));
const FaqAccordion = lazy(() => import("../components/home/FaqAccordion"));
const FinalCta = lazy(() => import("../components/home/FinalCta"));
const Footer = lazy(() => import("../components/home/Footer"));
const AIAssistantModal = lazy(() => import("../components/home/AIAssistantModal"));

function SectionLoader() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState(null);
  const [extraRouteData, setExtraRouteData] = useState(null);

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

    // Direct routing for functional pages
    if (route === "/login") {
      navigate("/login");
      return;
    }
    if (route === "/signup" || route === "/worker/join") {
      navigate("/signup");
      return;
    }

    // Open placeholder dialog with extra context for remaining project submodules
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

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 3. Why SahkarSathi */}
        <WhySahkarSathi />

        <Suspense fallback={<SectionLoader />}>
          {/* 4. Services Grid */}
          <ServicesGrid onNavigate={handleNavigate} />

          {/* 5. Hire Modes */}
          <HireModes onNavigate={handleNavigate} />

          {/* 6. How It Works */}
          <HowItWorks />

          {/* 7. Projects Showcase */}
          <ProjectsShowcase onNavigate={handleNavigate} />

          {/* 8. For Contractors Strip */}
          <ForContractors onNavigate={handleNavigate} />

          {/* 9. Verified Worker Rights */}
          <WorkerRights onNavigate={handleNavigate} />

          {/* 10. Comparison Table */}
          <ComparisonTable />

          {/* 11. Impact Stats */}
          <ImpactStats />

          {/* 12. For Workers CTA */}
          <ForWorkersCTA onNavigate={handleNavigate} />

          {/* 13. FAQ Accordion */}
          <FaqAccordion />

          {/* 14. Final CTA */}
          <FinalCta onNavigate={handleNavigate} />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer onNavigate={handleNavigate} />
      </Suspense>

      {/* 15. Floating Assistant */}
      <Suspense fallback={null}>
        <AIAssistantModal onNavigate={handleNavigate} />
      </Suspense>

      {/* Route Placeholder Modal */}
      <RouteModal
        activeRoute={activeRoute}
        onClose={handleCloseModal}
        extraData={extraRouteData}
      />
    </div>
  );
}
