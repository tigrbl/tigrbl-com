/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Github, Shield, Terminal, Scale, MessageCircle } from "lucide-react";
import { VERIFIED_DATE, RELEASES } from "../data";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const recommendedRelease = RELEASES.find(r => r.isRecommended) || RELEASES[0];

  return (
    <footer id="global-footer" className="bg-[#0A0A0B] border-t border-slate-800/50 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-orange-600 flex items-center justify-center">
                <span className="font-display font-black text-white italic text-[11px]">T</span>
              </div>
              <span className="font-display font-bold text-white tracking-tight">
                TIGRBL ASGI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              A schema-first Python framework built to project a single operation model across REST, JSON-RPC, SSE, WebSockets, and WebTransport sessions with total compiler alignment.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-850 max-w-fit">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
              <span className="text-orange-400">Status: Active Alpha (v{recommendedRelease.version})</span>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div>
            <h4 className="text-slate-200 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              Framework Map
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-orange-400 cursor-pointer text-left">
                  Product Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("how-it-works")} className="hover:text-orange-400 cursor-pointer text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("ecosystem")} className="hover:text-orange-400 cursor-pointer text-left">
                  Ecosystem Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("releases")} className="hover:text-orange-400 cursor-pointer text-left">
                  Stable Releases
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("examples")} className="hover:text-orange-400 cursor-pointer text-left">
                  Curated Examples
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Upstream Evidence */}
          <div>
            <h4 className="text-slate-200 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              Governed Evidence
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://pypi.org/project/tigrbl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-orange-500" />
                  <span>PyPI Facade Registry</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tigrbl/tigrbl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-slate-500" />
                  <span>GitHub Workspace</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/K4YTAPapjR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Apache-2.0 License</span>
                </span>
              </li>
              <li>
                <span className="text-slate-500 flex items-center gap-1.5" title={`Verified on: ${VERIFIED_DATE}`}>
                  <Shield className="w-3.5 h-3.5 text-orange-500" />
                  <span>Verified 2026-07-11</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Installer Extra Flag Options */}
          <div>
            <h4 className="text-slate-200 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              Optional Package Extras
            </h4>
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Import rich adapters using Python installer tags in the public facade:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["postgres", "servers", "templates", "tests"].map((extra) => (
                  <span
                    key={extra}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    [{extra}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            <span>© 2026 Tigrbl. Licensed under the </span>
            <a
              href="https://github.com/tigrbl/tigrbl/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-orange-400 underline decoration-slate-800"
            >
              Apache-2.0 Open Source License
            </a>
            <span>.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Core Web Vitals Budget: LCP ≤ 2.5s</span>
            <span>•</span>
            <span>Tested Python Range: 3.10 to 3.14</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
