/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { EXAMPLES } from "../data";
import { ExampleRecord } from "../types";
import { Terminal, Copy, CheckCircle, Code2, BookOpen, ExternalLink, Filter, HelpCircle, RefreshCw } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function ExamplesView() {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [filterProtocol, setFilterProtocol] = useState<string>("All");
  const [filterEngine, setFilterEngine] = useState<string>("All");

  const [selectedExample, setSelectedExample] = useState<ExampleRecord>(EXAMPLES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFilteredExamples = (): ExampleRecord[] => {
    return EXAMPLES.filter((ex) => {
      const matchDiff = filterDifficulty === "All" || ex.difficulty === filterDifficulty;
      const matchProt = filterProtocol === "All" || ex.protocol === filterProtocol;
      const matchEng = filterEngine === "All" || ex.engine === filterEngine;
      return matchDiff && matchProt && matchEng;
    });
  };

  const filteredList = getFilteredExamples();

  // If the currently selected example is filtered out, select the first available
  React.useEffect(() => {
    if (filteredList.length > 0 && !filteredList.some(ex => ex.id === selectedExample.id)) {
      setSelectedExample(filteredList[0]);
    }
  }, [filterDifficulty, filterProtocol, filterEngine, filteredList, selectedExample.id]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-950/80 text-emerald-400 border border-emerald-900/40";
      case "Intermediate":
        return "bg-cyan-950/80 text-cyan-400 border border-cyan-900/40";
      case "Advanced":
        return "bg-amber-950/80 text-amber-400 border border-amber-900/40";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
            Curated Demos
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 mt-2 tracking-tight">
            Tigrbl Examples & Demos
          </h1>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Explore fully verified, locally executable code samples using the recommended facade. Select a demo to inspect its Python signature and simulated channel output.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-slate-900 border border-white/5 rounded-xl p-5 mb-10 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
              Advanced Query Filters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Filter 1: Difficulty */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Difficulty</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 text-slate-300 rounded p-2 text-xs font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Filter 2: Protocol */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Protocol Target</label>
              <select
                value={filterProtocol}
                onChange={(e) => setFilterProtocol(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 text-slate-300 rounded p-2 text-xs font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="All">All Protocols</option>
                <option value="REST">REST</option>
                <option value="JSON-RPC">JSON-RPC</option>
                <option value="SSE">SSE (Streams)</option>
                <option value="WebSocket">WebSocket</option>
                <option value="Multi-Protocol">Multi-Protocol</option>
              </select>
            </div>

            {/* Filter 3: Engine */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Database Engine</label>
              <select
                value={filterEngine}
                onChange={(e) => setFilterEngine(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 text-slate-300 rounded p-2 text-xs font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="All">All Engines</option>
                <option value="None">None (In-Memory)</option>
                <option value="Postgres">PostgreSQL Extra</option>
              </select>
            </div>
          </div>
        </div>

        {/* Master Details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Examples List */}
          <div className="lg:col-span-4 space-y-3 max-h-[500px] overflow-y-auto pr-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-1">
              Select Demo ({filteredList.length} matches)
            </span>

            {filteredList.length === 0 ? (
              <div className="bg-slate-900 border border-white/5 rounded-lg p-6 text-center">
                <p className="text-xs text-slate-400 font-mono">No examples match the chosen filters.</p>
                <button
                  onClick={() => {
                    setFilterDifficulty("All");
                    setFilterProtocol("All");
                    setFilterEngine("All");
                  }}
                  className="mt-3 text-xs font-mono text-emerald-400 underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredList.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExample(ex)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedExample.id === ex.id
                      ? "bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-950/20"
                      : "bg-slate-900/20 border-white/5 hover:bg-slate-800/30 hover:border-white/10"
                  }`}
                >
                  <h4 className="text-slate-200 font-display font-semibold text-xs leading-snug">
                    {ex.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-950 text-slate-400 border border-white/5">
                      {ex.protocol}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold ${getDifficultyColor(ex.difficulty)}`}>
                      {ex.difficulty}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right Column: Code Detail Viewer */}
          <div className="lg:col-span-8">
            {selectedExample ? (
              <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col">
                {/* Viewer Header */}
                <div className="bg-slate-950/50 p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${getDifficultyColor(selectedExample.difficulty)}`}>
                        {selectedExample.difficulty}
                      </span>
                      <span className="text-slate-500 font-mono text-xs">•</span>
                      <span className="text-emerald-400 font-mono text-[10px] font-semibold bg-emerald-950/40 border border-emerald-900/55 px-1.5 py-0.5 rounded">
                        Tested: {selectedExample.testedStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold text-slate-100 mt-1.5">
                      {selectedExample.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopyCode(selectedExample.code)}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer bg-slate-900/50 px-2.5 py-1.5 rounded border border-white/5 align-middle shrink-0"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Meta details strip */}
                <div className="bg-slate-900/30 p-4 border-b border-white/5 text-xs text-slate-400 space-y-1 leading-relaxed">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase mr-1">Audience:</span>
                    <strong className="text-slate-300 font-normal">{selectedExample.audience}</strong>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase mr-1">Use Case:</span>
                    <strong className="text-slate-300 font-normal">{selectedExample.useCase}</strong>
                  </div>
                </div>

                {/* Code Window */}
                <div className="bg-[#0A0A0B] border-b border-white/5 text-xs overflow-hidden">
                  <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}>
                    {selectedExample.code}
                  </SyntaxHighlighter>
                </div>

                {/* Expected Output block */}
                <div className="bg-slate-950 p-5 font-mono text-xs border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Expected Request / Response Channel Output</span>
                  </div>
                  <div className="bg-[#0A0A0B] rounded border border-white/5 text-xs overflow-hidden">
                    <SyntaxHighlighter style={vscDarkPlus} customStyle={{ margin: 0, padding: '0.75rem', background: 'transparent' }} wrapLines={true} wrapLongLines={true}>
                      {selectedExample.expectedOutput}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* External links footer */}
                <div className="p-4 bg-slate-900/30 border-t border-white/5 flex items-center gap-4 text-xs font-mono">
                  <a
                    href={selectedExample.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-emerald-400 flex items-center gap-1.5"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View spec on Github</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/30 border border-white/5 rounded-xl p-12 text-center text-slate-400 font-mono">
                Select an example from the left sidebar list to inspect source declarations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
