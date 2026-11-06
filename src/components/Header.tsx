/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Copy, CheckCircle, Menu, X, Github, BookOpen } from "lucide-react";
import { RELEASES } from "../data";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const recommendedRelease = RELEASES.find(r => r.isRecommended) || RELEASES[0];

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("uv add tigrbl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "how-it-works", label: "How It Works" },
    { id: "ecosystem", label: "Ecosystem" },
    { id: "releases", label: "Releases" },
    { id: "examples", label: "Examples" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 cursor-pointer focus:outline-none"
            >
              {/* Custom SVG Tigrbl logo based on the Design HTML */}
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-black text-white italic text-base shadow-md shadow-orange-900/20">
                T
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-display font-extrabold text-lg text-white tracking-tight">
                  TIGRBL
                </span>
                <span className="text-[9px] font-mono text-orange-500 font-semibold uppercase tracking-widest">
                  ASGI Framework
                </span>
              </div>
            </button>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-orange-950/80 text-orange-400 border border-orange-900/40">
              v{recommendedRelease.version} Alpha
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono tracking-wide transition-colors cursor-pointer ${
                  currentView === item.id
                    ? "bg-slate-900 text-orange-500 border border-white/5"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Hand Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Install Bar */}
            <div className="flex items-center bg-slate-900 border border-white/5 rounded-lg pl-2.5 pr-1 py-1">
              <Terminal className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
              <code className="text-xs font-mono text-slate-300 select-all mr-3">
                uv add tigrbl
              </code>
              <button
                onClick={copyInstallCommand}
                title="Copy installation command"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
              >
                {copied ? (
                  <CheckCircle className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* External Docs & GitHub */}
            <a
              href="https://github.com/tigrbl/tigrbl"
              target="_blank"
              rel="noreferrer noopener"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>

            <button
              onClick={() => onNavigate("get-started")}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs font-mono px-5 py-2 rounded-full transition-colors cursor-pointer shadow-lg shadow-orange-950/30"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <span className="inline-flex sm:hidden items-center px-2 py-0.5 rounded text-[9px] font-mono bg-orange-950/80 text-orange-400 border border-orange-900/40 mr-1">
              v{recommendedRelease.version}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="text-slate-400 hover:text-white p-1.5 rounded-md focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B] border-b border-white/5 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                  currentView === item.id
                    ? "bg-slate-900 text-orange-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 pb-2 border-t border-white/5 px-3 space-y-3">
              {/* Mobile copy cmd */}
              <div className="flex items-center justify-between bg-slate-900 border border-white/5 rounded p-2">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                  <code className="text-xs font-mono text-slate-300">uv add tigrbl</code>
                </div>
                <button
                  onClick={copyInstallCommand}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                <a
                  href="https://github.com/tigrbl/tigrbl"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-white/5 rounded-md py-2 px-3 flex-1"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    onNavigate("get-started");
                    setMobileMenuOpen(false);
                  }}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-mono font-semibold text-xs py-2 px-3 rounded-full flex-1 text-center cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
