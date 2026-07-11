/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Copy, CheckCircle, Info, ArrowRight, Play, Check, Shield } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function GetStartedView() {
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedPipx, setCopiedPipx] = useState(false);
  const [copiedUv, setCopiedUv] = useState(false);
  const [copiedFile, setCopiedFile] = useState(false);

  const copyPip = () => {
    navigator.clipboard.writeText("python -m pip install tigrbl");
    setCopiedPip(true);
    setTimeout(() => setCopiedPip(false), 2000);
  };

  const copyPipx = () => {
    navigator.clipboard.writeText("pipx install tigrbl");
    setCopiedPipx(true);
    setTimeout(() => setCopiedPipx(false), 2000);
  };

  const copyUv = () => {
    navigator.clipboard.writeText("uv add tigrbl");
    setCopiedUv(true);
    setTimeout(() => setCopiedUv(false), 2000);
  };

  const codeString = `from tigrbl import TigrblApp, get

app = TigrblApp()

@get("/health")
def health() -> dict[str, str]:
    """Exposes a clean REST GET endpoint at /health"""
    return {"status": "ok"}`;

  const copyFile = () => {
    navigator.clipboard.writeText(codeString);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
            Onboarding Tutorial
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 mt-2 tracking-tight">
            Getting Started with Tigrbl
          </h1>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Install the stable facade, write a single operations contract file, and boot the ASGI kernel plan locally in under two minutes.
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1: Verify Prerequisites */}
          <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
            <h3 className="text-base font-display font-bold text-slate-200 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 border border-white/5 text-slate-300 font-mono text-xs flex items-center justify-center">
                1
              </span>
              <span>Verify Core Prerequisites</span>
            </h3>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Tigrbl compiles its routing plans statically, utilizing native Python signatures. Before installing, ensure your environment conforms to the stable range constraints:
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0A0A0B] p-4 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Supported python</span>
                <p className="text-slate-200 font-mono text-xs mt-1 font-semibold">
                  Python &gt;= 3.10, &lt; 3.15
                </p>
              </div>
              <div className="bg-[#0A0A0B] p-4 rounded-lg border border-white/5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">License</span>
                  <span className="text-slate-200 font-mono text-xs font-semibold">
                    Apache-2.0 Permissive
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Install */}
          <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
            <h3 className="text-base font-display font-bold text-slate-200 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 border border-white/5 text-slate-300 font-mono text-xs flex items-center justify-center">
                2
              </span>
              <span>Install the Public Facade</span>
            </h3>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Tigrbl recommends installing the high-level unified <strong>tigrbl</strong> package directly. This automatically aggregates the underlying atoms, kernel, runtime, and schema compilers.
            </p>

            <div className="mt-5 space-y-4">
              {/* Option A: UV */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-orange-400/80 uppercase font-semibold">Primary: Astral uv (Recommended for applications)</span>
                <div className="bg-[#0A0A0B] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                    <code className="text-xs font-mono text-slate-300">uv add tigrbl</code>
                  </div>
                  <button
                    onClick={copyUv}
                    className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedUv ? (
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Option B: Pipx */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Secondary: Pipx (For isolated global CLI only)</span>
                <div className="bg-[#0A0A0B] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                    <code className="text-xs font-mono text-slate-300">pipx install tigrbl</code>
                  </div>
                  <button
                    onClick={copyPipx}
                    className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedPipx ? (
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Option C: PIP */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Tertiary: Standard pip (Virtual environments)</span>
                <div className="bg-[#0A0A0B] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                    <code className="text-xs font-mono text-slate-300">python -m pip install tigrbl</code>
                  </div>
                  <button
                    onClick={copyPip}
                    className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedPip ? (
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Write Code */}
          <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-display font-bold text-slate-200 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-white/5 text-slate-300 font-mono text-xs flex items-center justify-center">
                  3
                </span>
                <span>Create Your Operations File</span>
              </h3>
              <button
                onClick={copyFile}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-white/5 cursor-pointer"
              >
                {copiedFile ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Create a file named <code>app.py</code> and add the following minimal health check. Note that we only import from the public <code>tigrbl</code> facade:
            </p>

            <div className="mt-4 bg-slate-950 border border-white/5 rounded-lg overflow-hidden text-xs">
              <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Step 4: Boot and Verify */}
          <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
            <h3 className="text-base font-display font-bold text-slate-200 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 border border-white/5 text-slate-300 font-mono text-xs flex items-center justify-center">
                4
              </span>
              <span>Boot and Verify Output</span>
            </h3>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              To launch, boot the application with any compatible ASGI server. If utilizing <code>uv</code>, run the app.py directly:
            </p>

            <div className="mt-4 bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
              <span>uv run app.py</span>
              <span className="text-emerald-400 text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-950/40 rounded border border-emerald-900/30">
                Command
              </span>
            </div>

            {/* Simulated Server output */}
            <div className="mt-4 bg-slate-950 p-4 rounded-lg border border-white/5 text-[11px] font-mono text-slate-400 leading-relaxed space-y-1">
              <div className="text-slate-500">INFO:     Started server process [40321]</div>
              <div className="text-slate-500">INFO:     Waiting for application startup.</div>
              <div className="text-orange-400">TIGRBL:   Compiling pre-boot ASGI execution plan...</div>
              <div className="text-orange-400">TIGRBL:   Mapped REST path: GET /health -&gt; health</div>
              <div className="text-orange-400">TIGRBL:   Mapped JSON-RPC procedure: system.health -&gt; health</div>
              <div className="text-slate-500">INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)</div>
            </div>

            {/* Verification Curl check */}
            <p className="text-slate-400 text-xs mt-6 leading-relaxed">
              Query the REST endpoint using curl from a separate terminal block to verify:
            </p>

            <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
              <span>curl http://127.0.0.1:8000/health</span>
              <span className="text-slate-500 text-[10px] uppercase font-bold">Query</span>
            </div>

            <div className="mt-3 bg-[#0A0A0B] rounded-lg border border-white/5 text-xs overflow-hidden">
              <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
{`{
  "status": "ok"
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Next Steps Grid links */}
        <div className="mt-12 bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-display font-semibold text-slate-200">
                Onboarding verification passed!
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                The local application check runs successfully. Proceed to explore advanced multi-protocol, postgres extra, or streaming examples.
              </p>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
}
