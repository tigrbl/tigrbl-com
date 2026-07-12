/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Layers, Sliders, PlayCircle, Settings, GitFork, ArrowRight, ShieldCheck, Cpu, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function HowItWorksView() {
  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest font-bold">
            Technical Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 mt-2 tracking-tight">
            How Tigrbl Works Under the Hood
          </h1>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Unlike standard micro-frameworks which map HTTP paths directly to functions, Tigrbl compiles application intent into reviewable plans and projects it across transport, documentation, and validation surfaces.
          </p>
        </div>

        {/* 1. VISUAL PIPELINE REPRESENTATION */}
        <div className="bg-slate-900/30 border border-white/5 rounded-xl p-8 mb-16 shadow-2xl">
          <h3 className="text-lg font-display font-semibold text-slate-200 mb-6 flex items-center gap-2">
            <Cpu className="text-orange-500 w-5 h-5" />
            <span>The Four-Stage Intent Pipeline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-950 p-5 rounded-lg border border-white/5 relative">
              <span className="absolute top-3 right-3 text-2xl font-mono font-bold text-slate-800">01</span>
              <h4 className="text-orange-500 font-mono text-xs uppercase font-bold mb-2">Authoring Surface</h4>
              <h5 className="text-slate-200 font-display font-bold text-sm mb-2">Public Facade</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Developers import from <code>tigrbl</code>, using decorators, table declarations, schemas, and router hooks.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-5 rounded-lg border border-white/5 relative">
              <span className="absolute top-3 right-3 text-2xl font-mono font-bold text-slate-800">02</span>
              <h4 className="text-orange-500 font-mono text-xs uppercase font-bold mb-2">Description Model</h4>
              <h5 className="text-slate-200 font-display font-bold text-sm mb-2">Intermediate Spec</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Tigrbl-core analyzes signature types, parsing input/output requirements into abstract data and route specs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-5 rounded-lg border border-white/5 relative">
              <span className="absolute top-3 right-3 text-2xl font-mono font-bold text-slate-800">03</span>
              <h4 className="text-orange-500 font-mono text-xs uppercase font-bold mb-2">Plan Compilation</h4>
              <h5 className="text-slate-200 font-display font-bold text-sm mb-2">ASGI Kernel Plan</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                The kernel organizes routers, middleware, and database adapters into step-by-step pre-boot dispatch plans.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950 p-5 rounded-lg border border-white/5 relative">
              <span className="absolute top-3 right-3 text-2xl font-mono font-bold text-slate-800">04</span>
              <h4 className="text-orange-500 font-mono text-xs uppercase font-bold mb-2">Execution Layer</h4>
              <h5 className="text-slate-200 font-display font-bold text-sm mb-2">Runtime Projection</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Active connections (REST, RPC, streams) are validated against schemas and executed on compiled plans.
              </p>
            </div>
          </div>
        </div>

        {/* 2. IN-DEPTH TECHNICAL MODULES */}
        <div className="space-y-12">
          {/* Module 1: The Public Facade */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500 font-mono text-xs font-bold">
                  01
                </div>
                <h3 className="text-xl font-display font-bold text-slate-200">The Public Facade Pattern</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                To prevent dependency chaos and ease version integration, Tigrbl presents a highly stable high-level facade. Application developers typically interact exclusively with the unified <code>tigrbl</code> import contract.
              </p>
              <div className="bg-slate-900/30 p-4 rounded-lg border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Exposed Public Contracts</span>
                <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                  <li>• TigrblApp</li>
                  <li>• TigrblRouter</li>
                  <li>• Table helpers</li>
                  <li>• Operation spec decorators</li>
                  <li>• Declarative schemas</li>
                  <li>• Database Engine bindings</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-xl p-5 font-mono text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 block uppercase mb-2">Canonical Code Concept</span>
              <div className="bg-[#0A0A0B] rounded border border-white/5 overflow-hidden">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
{`from tigrbl import TigrblApp, TigrblRouter

app = TigrblApp()
accounts = TigrblRouter(prefix="/accounts")

@accounts.get("/{account_id}")
def check_balance(account_id: int) -> dict[str, int | float]:
    return {"account_id": account_id, "balance": 150.00}

app.include_router(accounts)`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Module 2: Intent-based specs & intermediate models */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500 font-mono text-xs font-bold">
                  02
                </div>
                <h3 className="text-xl font-display font-bold text-slate-200">Intermediate Specification & Precedence</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                When you define operations and tables, Tigrbl doesn't immediately bind them to standard HTTP server routes. Instead, it compiles them into <strong>Intermediate Intent Specifications</strong>.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Settings resolve using strict configuration precedence:
              </p>
              <div className="bg-slate-900/30 p-3 rounded-lg border border-white/5 text-[10px] font-mono text-slate-400 overflow-x-auto whitespace-nowrap text-center">
                per-request overrides &gt; operation spec &gt; column spec &gt; table spec &gt; router spec &gt; app spec &gt; framework defaults
              </div>
            </div>

            <div className="lg:order-1 bg-slate-900/40 border border-white/5 rounded-xl p-5 font-mono text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 block uppercase mb-2">Compiled Abstract Contract Spec</span>
              <div className="bg-[#0A0A0B] rounded border border-white/5 overflow-hidden">
                <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
{`{
  "operation": "check_balance",
  "inputs": {
    "account_id": { "type": "integer", "required": true }
  },
  "outputs": {
    "account_id": { "type": "integer" },
    "balance": { "type": "number" }
  },
  "bindings": ["REST", "JSON-RPC"],
  "maturity": "Alpha"
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Module 3: Pre-Boot Dispatch Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-950/40 border border-orange-900/40 flex items-center justify-center text-orange-500 font-mono text-xs font-bold">
                  03
                </div>
                <h3 className="text-xl font-display font-bold text-slate-200">Pre-Boot Lifecycle & Kernel Plans</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Standard ASGI web frameworks evaluate routers dynamically as requests arrive, creating invisible execution flows. Tigrbl replaces this with <strong>Explicit compiled dispatch plans</strong>.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Before the socket opens, the Tigrbl ASGI Kernel takes all compiled operation specs and builds a comprehensive step-by-step execution roadmap. It exposes this plan, allowing security and platform teams to trace dispatch steps, authentication guards, transaction scopes, and serialization.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-xl p-5 font-mono text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 block uppercase mb-2">Lifecycle phase reference used by kernel plans</span>
              <div className="bg-slate-950/80 p-3 rounded border border-white/5 max-h-[220px] overflow-y-auto space-y-1.5 text-[11px] text-slate-400">
                <div>[01] INGRESS_BEGIN — initialize ingress context</div>
                <div>[02] INGRESS_PARSE — parse transport payload and request metadata</div>
                <div>[03] INGRESS_DISPATCH — resolve operation, binding, and protocol event</div>
                <div>[04] PRE_TX_BEGIN — run checks before a transaction exists</div>
                <div>[05] START_TX — open or attach transaction state when persistence applies</div>
                <div>[06] PRE_HANDLER — resolve dependencies, validate input, and enforce policy</div>
                <div>[07] HANDLER — execute the semantic operation handler</div>
                <div>[08] POST_HANDLER — normalize output and run in-transaction hooks</div>
                <div>[09] PRE_COMMIT — run final checks before commit</div>
                <div>[10] TX_COMMIT — commit framework-owned transaction work</div>
                <div>[11] POST_COMMIT — run committed-side effects</div>
                <div>[12] EGRESS_SHAPE — build the response envelope and apply masks</div>
                <div>[13] EGRESS_FINALIZE — finalize status, headers, renderer, and transport data</div>
                <div>[14] POST_RESPONSE — run work that cannot change the returned response</div>
                <div>[error] ON_*_ERROR / ON_ERROR — phase-specific and fallback error chains</div>
                <div>[error] TX_ROLLBACK — roll back transaction-owned work</div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
                <code>/system/kernelz</code> returns model → operation → label arrays such as
                <code> PHASE:hook-label</code>. It does not return the explanatory prose above.
              </p>
            </div>
          </div>
        </div>

        {/* 3. PLATFORM CAPABILITY HIGHLIGHT */}
        <div className="mt-16 bg-gradient-to-tr from-slate-900/40 to-slate-950 border border-white/5 rounded-xl p-8 text-center">
          <ShieldCheck className="w-10 h-10 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold text-slate-200">
            One operation identity across generated surfaces
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
            Tigrbl is designed to keep operation identity visible across bindings, schemas, hooks, diagnostics, and runtime planning. Verify the generated documents and diagnostics for the version you deploy.
          </p>
        </div>
      </div>
    </div>
  );
}
