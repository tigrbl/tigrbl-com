/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Terminal,
  Copy,
  CheckCircle,
  BookOpen,
  Github,
  Zap,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Check,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ProtocolProjector } from "./ProtocolProjector";
import { FEATURES, CLAIMS, CAPABILITIES, RELEASES, VISITOR_PROFILES } from "../data";

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [copied, setCopied] = useState(false);
  const [activeProfileIdx, setActiveProfileIdx] = useState<number>(0);

  const copyInstall = () => {
    navigator.clipboard.writeText("uv add tigrbl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recommendedRelease = RELEASES.find(r => r.isRecommended) || RELEASES[0];

  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen relative overflow-hidden">
      {/* Atmospheric Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative py-20 lg:py-28 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-xs text-orange-500 font-bold font-mono uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>Schema-First ASGI Framework for Python</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
              Define your API once. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Project everywhere.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Tigrbl projects operations across REST, JSON-RPC, streaming, and WebTransport-aware runtimes with generated documentation and explicit lifecycle hooks.
            </p>

            {/* Quick CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <button
                onClick={() => onNavigate("get-started")}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/30"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("how-it-works")}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>How it works</span>
              </button>

              {/* Install Code Copier */}
              <div className="w-full sm:w-auto flex items-center justify-between bg-slate-950 border border-white/5 rounded-lg p-2.5 pl-3.5 font-mono text-xs text-slate-300">
                <span className="mr-3">uv add tigrbl</span>
                <button
                  onClick={copyInstall}
                  className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy installation command"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Small Release status */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 font-mono">
              <span>Latest stable: <strong className="text-slate-400">v{recommendedRelease.version}</strong></span>
              <span>•</span>
              <span>Python: <strong className="text-slate-400">{recommendedRelease.pyRange}</strong></span>
              <span>•</span>
              <span>License: <strong className="text-slate-400">{recommendedRelease.license}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong className="text-slate-400">Status: Alpha</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADAPTIVE VISITOR EVALUATION PATHS (JTBD Profile Selector) */}
      <section className="py-12 bg-slate-900/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-sm font-mono text-orange-500 uppercase tracking-wider font-bold">
              Tailored Evaluation
            </h2>
            <p className="text-slate-300 font-display text-lg mt-1">
              Select your profile to view customized proof points and next steps:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {VISITOR_PROFILES.map((profile, idx) => (
              <button
                key={profile.profileName}
                onClick={() => setActiveProfileIdx(idx)}
                className={`py-3 px-4 rounded-full text-xs font-mono font-medium transition-all text-center border cursor-pointer ${
                  activeProfileIdx === idx
                    ? "bg-slate-800 border-orange-500 text-orange-400 shadow-md shadow-orange-950/20"
                    : "bg-[#0A0A0B]/50 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {profile.profileName}
              </button>
            ))}
          </div>

          {/* Active Profile JTBD Output Card */}
          <div className="bg-[#0A0A0B] border border-white/5 rounded-xl p-6 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Key Question</span>
                <h4 className="text-slate-200 font-semibold text-sm leading-snug">
                  "{VISITOR_PROFILES[activeProfileIdx].questionToAnswer}"
                </h4>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Verified Proof Required</span>
                <p className="text-slate-400 text-xs">
                  {VISITOR_PROFILES[activeProfileIdx].requiredProof}
                </p>
              </div>
              <div className="flex flex-col justify-between items-start md:items-end gap-3">
                <div className="space-y-1 w-full text-left md:text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Primary Action</span>
                  <p className="text-orange-400 text-xs font-medium">
                    {VISITOR_PROFILES[activeProfileIdx].primaryNextAction}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const action = VISITOR_PROFILES[activeProfileIdx].primaryNextAction;
                    if (action.includes("Get started")) {
                      onNavigate("get-started");
                    } else if (action.includes("How it works")) {
                      onNavigate("how-it-works");
                    } else {
                      onNavigate("ecosystem");
                    }
                  }}
                  className="mt-2 text-xs font-mono bg-slate-800 hover:bg-slate-755 text-slate-200 border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer self-start md:self-auto"
                >
                  <span>Resolve Proof</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROTOCOL PROJECTOR INTERACTIVE TOOL */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
            Define once, project everywhere
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-slate-100 mt-2">
            One Operation Model, Projected across all Channels
          </p>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Avoid duplicate code. Write Python schemas and endpoints that are compiled into optimized execution trees and projected automatically as REST routes, JSON-RPC procedures, and OpenAPI contracts.
          </p>
        </div>

        {/* Embedded Interactive Projector */}
        <ProtocolProjector />
      </section>

      {/* 4. VALUE PILLARS */}
      <section id="pillars" className="py-16 bg-slate-900/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-slate-200 font-display font-bold text-base">
                Aligned Contracts
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                No version drift between runtime behavior, request validators, and client specs. Your code is the absolute Single Source of Truth.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-slate-200 font-display font-bold text-base">
                Multi-Protocol Operations
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Simultaneously support REST path bindings and JSON-RPC method structures from the same underlying python controller class.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-slate-200 font-display font-bold text-base">
                Explicit Lifecycle Runtime
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Tigrbl builds pre-boot compiled dispatch logs. Inspect hook priorities, authentication blocks, and routers before standard server deployment.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-slate-200 font-display font-bold text-base">
                Declarative Engines
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Attach PostgreSQL connection pooling, memory caching, or rate limits declarations directly into operational layers cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINIMAL WORKING EXAMPLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold block">
              10-Second Quickstart
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 tracking-tight">
              A stable application-facing facade.
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Tigrbl features a highly robust public interface. You import directly from the main <code className="text-slate-200 bg-slate-900 px-1 py-0.5 rounded font-mono text-xs">tigrbl</code> package, keeping downstream micro-packages hidden until advanced configurations demand them.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Import app and routers cleanly from <code>tigrbl</code>.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Zero complex boilerplate is required for standard endpoints.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Strict, stable, and tested range compliance (Python 3.10-3.14).</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate("get-started")}
              className="text-xs font-mono font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>See prerequisites & install guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-white/5">
              <span className="text-[11px] font-mono text-slate-400">example_api.py</span>
              <span className="w-3 h-3 rounded-full bg-orange-500" title="Tested on Python 3.10-3.14"></span>
            </div>
            <div className="bg-[#0A0A0B] rounded-b-xl overflow-hidden text-xs">
              <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
{`from tigrbl import TigrblApp

app = TigrblApp()

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS: AUTHOR -> DESCRIBE -> PLAN -> EXECUTE */}
      <section id="how-it-works-summary" className="py-16 bg-slate-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
              Progressive Model
            </h2>
            <p className="text-2xl sm:text-3xl font-display font-bold text-slate-100 mt-2">
              From Code to Execution Plan
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Tigrbl operates progressively. Instead of assembling loosely typed routing blocks, Tigrbl processes application design systematically:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-orange-500 font-bold mb-2">01. AUTHOR</div>
                  <h4 className="text-slate-200 font-bold font-display text-sm">Facade Declarations</h4>
                  <p className="mt-2 text-slate-400 text-xs leading-relaxed">
                    Developers write simple declarative code using standard <code>TigrblRouter</code> and table schemas, remaining focused on clean Python logic.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  Target: tigrbl package
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-orange-500 font-bold mb-2">02. DESCRIBE</div>
                  <h4 className="text-slate-200 font-bold font-display text-sm">Intent Compiling</h4>
                  <p className="mt-2 text-slate-400 text-xs leading-relaxed">
                    Tigrbl core maps all decorators, payload specifications, and tables into intermediate operational structures.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  Target: tigrbl-core, tigrbl-orm
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-orange-500 font-bold mb-2">03. PLAN</div>
                  <h4 className="text-slate-200 font-bold font-display text-sm">Dispatch Generation</h4>
                  <p className="mt-2 text-slate-400 text-xs leading-relaxed">
                    The ASGI kernel generates explicit, readable request trees and logs dispatch sequences ahead of server startup.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  Target: tigrbl-kernel
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-orange-500 font-bold mb-2">04. EXECUTE</div>
                  <h4 className="text-slate-200 font-bold font-display text-sm">Transport Dispatch</h4>
                  <p className="mt-2 text-slate-400 text-xs leading-relaxed">
                    At runtime, the optimized execution package dispatches requests, streams, and socket signals into the planned tree.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  Target: tigrbl-runtime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAPABILITY MATRIX */}
      <section id="capability-matrix" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold block">
            Protocol Matrices
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 mt-2">
            Multi-Protocol Capabilities
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">
            See how the central operation specifications map across standard HTTP and ASGI transport layers:
          </p>
        </div>

        {/* Matrix Table */}
        <div className="bg-slate-900/40 border border-white/5 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A0A0B] border-b border-white/5 text-xs font-mono uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold">REST (HTTP)</th>
                  <th className="py-4 px-6 font-semibold">JSON-RPC</th>
                  <th className="py-4 px-6 font-semibold">SSE (Streams)</th>
                  <th className="py-4 px-6 font-semibold">WebSocket</th>
                  <th className="py-4 px-6 font-semibold">WebTransport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                {CAPABILITIES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/20 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-200 font-mono">
                      {row.capability}
                    </td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">{row.rest}</td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">{row.jsonRpc}</td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">{row.sse}</td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">{row.websocket}</td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">{row.webtransport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#0A0A0B] border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            <span>WebTransport-aware routing belongs to high-level framework layers and remains in <strong>Alpha development</strong> status.</span>
          </div>
        </div>
      </section>

      {/* 8. FINAL CONVERSION CTA */}
      <section className="py-16 bg-gradient-to-b from-[#0A0A0B] to-slate-900/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-tr from-[#0F1115] to-[#0A0A0B] border border-white/5 p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl"></div>

            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
              Evaluation Path
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 tracking-tight mt-2">
              Ready to construct aligned Python APIs?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
              Get started with Tigrbl in under a minute. Define schemas once, compile your execution tree, and deploy secure services across REST, RPC, and Sockets simultaneously.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => onNavigate("get-started")}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs font-mono px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-orange-950/40"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("examples")}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/5 text-xs font-mono px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Examples</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
