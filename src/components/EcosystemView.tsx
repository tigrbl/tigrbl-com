/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PACKAGES } from "../data";
import { PackageRecord } from "../types";
import { Terminal, Copy, CheckCircle, ExternalLink, Blocks, Compass, Code2 } from "lucide-react";

export function EcosystemView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedPackage, setCopiedPackage] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Packages" },
    { id: "facade", label: "Public Facade" },
    { id: "core", label: "Framework Layers" },
    { id: "op-pack", label: "Operation Packs" },
    { id: "engine", label: "Engine Plugins" },
    { id: "tooling", label: "Tooling & Testing" }
  ];

  const handleCopyInstall = (cmd: string, pkgName: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedPackage(pkgName);
    setTimeout(() => setCopiedPackage(null), 2000);
  };

  const getFilteredPackages = (): PackageRecord[] => {
    if (activeCategory === "all") return PACKAGES;
    if (activeCategory === "tooling") {
      return PACKAGES.filter(p => ["client", "typing", "testing", "example"].includes(p.category));
    }
    return PACKAGES.filter(p => p.category === activeCategory);
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "Stable":
        return "bg-orange-950/30 text-orange-400 border border-orange-900/40";
      case "Beta":
        return "bg-cyan-950/30 text-cyan-400 border border-cyan-900/40";
      case "Alpha":
        return "bg-amber-950/30 text-amber-400 border border-amber-900/40";
      default:
        return "bg-slate-900 text-slate-400 border border-slate-800";
    }
  };

  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
            The Tigrbl Package Family
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 mt-2 tracking-tight">
            Ecosystem Package Explorer
          </h1>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Tigrbl is a modular ecosystem, allowing you to run lightweight, minimal APIs with zero excess weight, or bring in advanced declarative database engines, testing harnesses, and type assertions as your complexity grows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-950/20"
                  : "bg-slate-900 text-slate-400 border border-slate-850 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredPackages().map((pkg) => (
            <div
              key={pkg.name}
              className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Blocks className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="font-mono font-bold text-slate-100 text-sm group-hover:text-orange-400 transition-colors">
                      {pkg.name}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${getMaturityColor(pkg.maturity)}`}>
                    {pkg.maturity}
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-4 min-h-[50px]">
                  {pkg.purpose}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-850/60">
                {pkg.installCmd ? (
                  <div className="flex items-center justify-between bg-slate-950 border border-slate-850 rounded p-2">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <code className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-nowrap">
                        {pkg.installCmd}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyInstall(pkg.installCmd!, pkg.name)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy install tag"
                    >
                      {copiedPackage === pkg.name ? (
                        <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-500 italic p-2 bg-slate-950/30 rounded border border-slate-900">
                    Internal core distribution
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs font-mono pt-1">
                  <a
                    href={pkg.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-400 flex items-center gap-1"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>View source</span>
                  </a>
                  {pkg.pypiUrl && (
                    <a
                      href={pkg.pypiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-400 flex items-center gap-1"
                    >
                      <span>PyPI Package</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
