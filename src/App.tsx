/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomeView } from "./components/HomeView";
import { HowItWorksView } from "./components/HowItWorksView";
import { EcosystemView } from "./components/EcosystemView";
import { ReleasesView } from "./components/ReleasesView";
import { GetStartedView } from "./components/GetStartedView";
import { ExamplesView } from "./components/ExamplesView";
import { SEO } from "./components/SEO";

export default function App() {
  // Simple client-side router matching view states
  const [currentView, setCurrentView] = useState<string>("home");

  // Handle route simulation from anchor hash changes if any, or standard navigation
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Sync hash routing if user opens with simple query anchors
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "how-it-works", "ecosystem", "releases", "examples", "get-started"].includes(hash)) {
        setCurrentView(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run once on startup

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div id="tigrbl-com-root" className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans antialiased flex flex-col justify-between selection:bg-orange-600/30 selection:text-orange-300">
      {/* Dynamic SEO, Open Graph & JSON-LD metadata engine */}
      <SEO currentView={currentView} />

      {/* Global Responsive Navigation Header */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Swapper */}
      <main className="flex-grow">
        {currentView === "home" && <HomeView onNavigate={handleNavigate} />}
        {currentView === "how-it-works" && <HowItWorksView />}
        {currentView === "ecosystem" && <EcosystemView />}
        {currentView === "releases" && <ReleasesView />}
        {currentView === "examples" && <ExamplesView />}
        {currentView === "get-started" && <GetStartedView />}
      </main>

      {/* Standardized Verified Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
