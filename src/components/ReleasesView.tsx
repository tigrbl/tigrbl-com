/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RELEASES } from "../data";
import { ReleaseRecord } from "../types";
import { Calendar, GitCommit, ExternalLink, HelpCircle, Terminal, Copy, CheckCircle, Flame, Shield } from "lucide-react";

export function ReleasesView() {
  const [showPrereleases, setShowPrereleases] = useState<boolean>(false);
  const [copiedVersion, setCopiedVersion] = useState<string | null>(null);

  const handleCopyInstall = (version: string) => {
    const cmd = `pip install tigrbl==${version}`;
    navigator.clipboard.writeText(cmd);
    setCopiedVersion(version);
    setTimeout(() => setCopiedVersion(null), 2000);
  };

  const getFilteredReleases = (): ReleaseRecord[] => {
    if (showPrereleases) return RELEASES;
    return RELEASES.filter(r => r.type !== "prerelease");
  };

  const recommendedRelease = RELEASES.find(r => r.isRecommended) || RELEASES[0];

  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
            Project Versions
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 mt-2 tracking-tight">
            Facade Release Stream
          </h1>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Verify PyPI release logs, download links, and package history. Tigrbl distinguishes recommended high-level facade releases from individual dev plugin distributions.
          </p>
        </div>

        {/* CURRENT HIGHLIGHT STABLE BOX */}
        <div className="max-w-4xl mx-auto bg-gradient-to-tr from-slate-900/40 to-[#0A0A0B] border-2 border-orange-500/40 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-orange-600 text-white font-mono text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
            RECOMMENDED STABLE RELEASE
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-display font-extrabold text-slate-100">
                  tigrbl {recommendedRelease.version}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-orange-950/30 text-orange-400 border border-orange-900/40">
                  Alpha
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Released: {recommendedRelease.publishedAt}
                </span>
                <span>•</span>
                <span>Python: {recommendedRelease.pyRange}</span>
                <span>•</span>
                <span>License: {recommendedRelease.license}</span>
              </div>
            </div>

            {/* Install Box */}
            <div className="bg-[#0A0A0B] border border-slate-800 rounded-lg p-3 flex items-center justify-between min-w-[260px]">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                <code className="text-xs font-mono text-slate-300">
                  pip install tigrbl=={recommendedRelease.version}
                </code>
              </div>
              <button
                onClick={() => handleCopyInstall(recommendedRelease.version)}
                className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy recommended install command"
              >
                {copiedVersion === recommendedRelease.version ? (
                  <CheckCircle className="w-4 h-4 text-orange-400 animate-pulse" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Recommended Release Changelog Highlights */}
          <div className="mt-6 pt-6 border-t border-slate-800/60">
            <h4 className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-3">
              Changelog Highlights
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed list-none">
              {recommendedRelease.changelogSummary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs font-mono">
            <a
              href={recommendedRelease.pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>View PyPI Entry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={recommendedRelease.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View GitHub release</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ALL RELEASES STREAM LOGS */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
            <h3 className="text-base font-display font-semibold text-slate-200">
              Release Archive History
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPrereleases}
                onChange={() => setShowPrereleases(!showPrereleases)}
                className="rounded border-slate-800 text-orange-600 focus:ring-orange-500 bg-slate-900 cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-400">Show development prereleases</span>
            </label>
          </div>

          <div className="space-y-4">
            {getFilteredReleases()
              .filter(r => r.version !== recommendedRelease.version)
              .map((release) => (
                <div
                  key={release.version}
                  className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-200 text-base">
                        v{release.version}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-medium ${
                        release.type === "prerelease"
                          ? "bg-amber-950/30 text-amber-400 border border-amber-900/30"
                          : "bg-slate-850/50 text-slate-400 border border-slate-800"
                      }`}>
                        {release.type === "prerelease" ? "Pre-release" : "Stable Release"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 font-mono">
                      <span>{release.publishedAt}</span>
                      <span>•</span>
                      <span>Python: {release.pyRange}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-slate-400 text-xs leading-relaxed list-none pl-1">
                    {release.changelogSummary[0]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <a
                        href={release.pypiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-orange-400 flex items-center gap-1"
                      >
                        <span>Registry</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Copy specific version cmd */}
                    <button
                      onClick={() => handleCopyInstall(release.version)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 bg-[#0A0A0B] px-2 py-1 rounded border border-slate-850"
                    >
                      {copiedVersion === release.version ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-orange-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Copy Install Command</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
