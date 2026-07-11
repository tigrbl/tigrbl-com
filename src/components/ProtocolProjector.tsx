/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Code, Share2, Layers, Server, Shield, CheckCircle, Copy, Terminal } from "lucide-react";
import { EXAMPLES } from "../data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface Projection {
  id: string;
  name: string;
  pythonCode: string;
  restEndpoint: string;
  restDetails: string;
  rpcMethod: string;
  rpcDetails: string;
  generatedContract: string;
  lifecyclePlan: string[];
  methodzOutput?: string;
  hookzOutput?: string;
}

const PROJECTIONS: Projection[] = [
  {
    id: "proj-orders",
    name: "Multi-Table Order Management",
    pythonCode: `from tigrbl import TigrblApp, TigrblRouter, Table
from tigrbl.engines.postgres import PostgresEngine

app = TigrblApp(engine=PostgresEngine())
sales_router = TigrblRouter(prefix="/sales")

class Customer(Table):
    id: int
    name: str
    email: str

class Product(Table):
    id: int
    name: str
    price: float

class Order(Table):
    id: int
    customer_id: int
    status: str

class OrderLine(Table):
    id: int
    order_id: int
    product_id: int
    quantity: int

@sales_router.crud(Order)
class OrderOps:
    @sales_router.bind("order.submit")
    def submit(self, customer_id: int, lines: list[dict]) -> Order:
        """Custom domain operation to submit an order."""
        pass

app.include_router(sales_router)`,
    restEndpoint: "POST /sales/order",
    restDetails: `Request Body:
{
  "customer_id": "integer (required)",
  "status": "string (required)"
}

Response (201 Created):
{
  "id": "integer",
  "customer_id": "integer",
  "status": "string"
}`,
    rpcMethod: "order.create",
    rpcDetails: `Request Params:
{
  "jsonrpc": "2.0",
  "method": "order.create",
  "params": {
    "customer_id": 42,
    "status": "pending"
  },
  "id": 1
}

Response Result:
{
  "jsonrpc": "2.0",
  "result": {
    "id": 1001,
    "customer_id": 42,
    "status": "pending"
  },
  "id": 1
}`,
    generatedContract: `{
  "openapi": "3.1.0",
  "info": { "title": "Tigrbl Projected API", "version": "0.4.4" },
  "paths": {
    "/sales/order": {
      "post": {
        "summary": "Create Order",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Order" }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Order": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "customer_id": { "type": "integer" },
          "status": { "type": "string" }
        },
        "required": ["customer_id", "status"]
      }
    }
  }
}`,
    lifecyclePlan: [
      "[INGRESS_BEGIN] Receive transport stream",
      "[INGRESS_PARSE] Parse JSON or RPC payload",
      "[INGRESS_DISPATCH] Map to OrderOps.create via REST or RPC",
      "[PRE_TX_BEGIN] Check capability masks and auth",
      "[START_TX] Begin PostgresEngine transaction",
      "[PRE_HANDLER] Run attached pre-operation hooks",
      "[HANDLER] Execute core Order creation",
      "[POST_HANDLER] Audit normalization or event logging",
      "[PRE_COMMIT] Validate data constraints",
      "[TX_COMMIT] Commit transaction to database",
      "[POST_COMMIT] Publish realtime events",
      "[EGRESS_SHAPE] Mask sensitive fields and shape response",
      "[EGRESS_FINALIZE] Serialize to target protocol (REST/RPC)",
      "[POST_RESPONSE] Log telemetry"
    ],
    methodzOutput: `{
  "methods": [
    {
      "identity": "order.create",
      "handler": "OrderOps.create",
      "schemas": {
        "request": "OrderCreateRequest",
        "response": "Order"
      },
      "bindings": {
        "rest": "POST /sales/order",
        "rpc": "order.create"
      }
    },
    {
      "identity": "order.submit",
      "handler": "OrderOps.submit",
      "schemas": {
        "request": "OrderSubmitRequest",
        "response": "Order"
      },
      "bindings": {
        "rest": "POST /sales/order/submit",
        "rpc": "order.submit"
      }
    }
  ]
}`,
    hookzOutput: `{
  "hooks": [
    {
      "phase": "PRE_HANDLER",
      "target": "order.*",
      "name": "AuthGuard"
    },
    {
      "phase": "POST_COMMIT",
      "target": "order.create",
      "name": "NotifyFulfillment"
    }
  ]
}`
  },
  {
    id: "proj-health",
    name: "Minimalist Health Endpoint",
    pythonCode: `from tigrbl import TigrblApp, get

app = TigrblApp()

@get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}`,
    restEndpoint: "GET /health",
    restDetails: `Query Params: None

Response (200 OK):
{
  "status": "ok"
}`,
    rpcMethod: "system.health",
    rpcDetails: `Request Params:
{
  "jsonrpc": "2.0",
  "method": "system.health",
  "id": 1
}

Response Result:
{
  "jsonrpc": "2.0",
  "result": {
    "status": "ok"
  },
  "id": 1
}`,
    generatedContract: `{
  "openrpc": "1.2.6",
  "info": { "title": "Tigrbl System Methods", "version": "0.4.4" },
  "methods": [
    {
      "name": "system.health",
      "summary": "Check system operational status",
      "result": {
        "name": "healthResult",
        "schema": {
          "type": "object",
          "properties": {
            "status": { "type": "string", "enum": ["ok"] }
          }
        }
      }
    }
  ]
}`,
    lifecyclePlan: [
      "[BOOT] Analyze /health route signature with return hint",
      "[ROUTING] Bind REST /health and RPC system.health to local health handler",
      "[REQUEST] Incoming web packet",
      "[EXECUTION] Call synchronous python target directly",
      "[RESPONSE] Write ASGI response buffer with 'status: ok'"
    ]
  },
  {
    id: "proj-analytics",
    name: "Custom Non-Persistence Operation",
    pythonCode: `from tigrbl import TigrblApp, operation, Schema

app = TigrblApp()

class DataPayload(Schema):
    metrics: list[float]
    label: str

@app.bind("analytics.process")
@operation
def process_data(payload: DataPayload) -> dict:
    return {
        "avg": sum(payload.metrics) / len(payload.metrics),
        "tag": payload.label.upper()
    }`,
    restEndpoint: "POST /analytics/process",
    restDetails: `Request Body:
{
  "metrics": [1.5, 2.0, 3.5],
  "label": "demo"
}

Response (200 OK):
{
  "avg": 2.33,
  "tag": "DEMO"
}`,
    rpcMethod: "analytics.process",
    rpcDetails: `Request Params:
{
  "jsonrpc": "2.0",
  "method": "analytics.process",
  "params": {
    "metrics": [1.5, 2.0, 3.5],
    "label": "demo"
  },
  "id": 1
}

Response Result:
{
  "jsonrpc": "2.0",
  "result": {
    "avg": 2.3333333333333335,
    "tag": "DEMO"
  },
  "id": 1
}`,
    generatedContract: `{
  "components": {
    "schemas": {
      "DataPayload": {
        "type": "object",
        "properties": {
          "metrics": { "type": "array", "items": { "type": "number" } },
          "label": { "type": "string" }
        },
        "required": ["metrics", "label"]
      }
    }
  }
}`,
    lifecyclePlan: [
      "[BOOT] Compile custom Schema: DataPayload definition",
      "[ROUTING] Map RPC analytics.process -> process_data",
      "[REQUEST] Receive transport payload",
      "[VALIDATION] Verify array values are strictly float types",
      "[EXECUTION] Process sum and average metrics helper",
      "[RESPONSE] Format tag output and stream response"
    ]
  }
];

export function ProtocolProjector() {
  const [selectedProj, setSelectedProj] = useState<Projection>(PROJECTIONS[0]);
  const [activeTab, setActiveTab] = useState<"rest" | "rpc" | "contract" | "lifecycle" | "methodz" | "hookz">("rest");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedProj.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="protocol-projector" className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#0A0A0B] p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-orange-500 font-mono text-xs tracking-wider uppercase font-bold">
            Interactive Tooling
          </span>
          <h3 className="text-xl font-semibold text-slate-100 font-display mt-0.5">
            Single-Source Protocol Projector
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Toggle an operation spec to inspect how Tigrbl auto-projects it across protocols and plans the kernel execution tree.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROJECTIONS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProj(proj)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedProj.id === proj.id
                  ? "bg-orange-600 text-white shadow-md shadow-orange-950/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-750"
              }`}
            >
              {proj.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Hand Column: Python Source */}
        <div className="p-5 border-r border-white/5 bg-slate-950 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
                1. Author Operation Spec (Python)
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs transition-colors cursor-pointer bg-slate-900 px-2.5 py-1.5 rounded-md border border-white/5"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-orange-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#0A0A0B] rounded-lg border border-white/5 text-xs overflow-hidden flex-1">
            <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
              {selectedProj.pythonCode}
            </SyntaxHighlighter>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5 bg-[#0F1115]/30 p-2.5 rounded border border-white/5">
            <Terminal className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>The developer writes this single contract using stable public <strong>tigrbl</strong> facade imports.</span>
          </div>
        </div>

        {/* Right Hand Column: Projected Layouts */}
        <div className="p-5 flex flex-col bg-slate-900/60">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
              2. Projected Framework Outputs
            </span>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-white/5 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("rest")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "rest"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              REST Endpoint
            </button>
            <button
              onClick={() => setActiveTab("rpc")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "rpc"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              JSON-RPC Method
            </button>
            <button
              onClick={() => setActiveTab("contract")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "contract"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Generated Schema
            </button>
            <button
              onClick={() => setActiveTab("lifecycle")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "lifecycle"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Kernel Plan
            </button>
            <button
              onClick={() => setActiveTab("methodz")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "methodz"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              /system/methodz
            </button>
            <button
              onClick={() => setActiveTab("hookz")}
              className={`pb-2 px-3 text-xs font-mono font-medium transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === "hookz"
                  ? "border-orange-500 text-slate-100"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              /system/hookz
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 flex flex-col">
            {activeTab === "rest" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Target ASGI URL Path</span>
                  <span className="text-xs font-mono text-orange-400 font-bold bg-orange-950/40 px-2 py-0.5 rounded border border-orange-900/50">
                    {selectedProj.restEndpoint}
                  </span>
                </div>
                <div className="bg-[#0A0A0B] rounded-lg border border-white/5 flex-1 text-xs overflow-hidden">
                  <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }} wrapLines={true} wrapLongLines={true}>
                    {selectedProj.restDetails}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {activeTab === "rpc" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">JSON-RPC Method Name</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/50">
                    {selectedProj.rpcMethod}
                  </span>
                </div>
                <div className="bg-[#0A0A0B] rounded-lg border border-white/5 flex-1 text-xs overflow-hidden">
                  <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }} wrapLines={true} wrapLongLines={true}>
                    {selectedProj.rpcDetails}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {activeTab === "contract" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Live API Spec Alignment</span>
                  <span className="text-[11px] font-mono text-slate-300 font-medium">OpenAPI / OpenRPC compatible</span>
                </div>
                <div className="bg-[#0A0A0B] rounded-lg border border-white/5 flex-1 text-xs overflow-hidden max-h-[300px] overflow-y-auto">
                  <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
                    {selectedProj.generatedContract}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {activeTab === "lifecycle" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Pre-boot Compiled Kernel Plan (/system/kernelz)</span>
                  <span className="text-[11px] font-mono text-orange-400 font-semibold">100% Inspectable</span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-white/5 flex-1 overflow-y-auto max-h-[300px]">
                  <ol className="list-none space-y-1.5 font-mono text-[11px] text-slate-300">
                    {selectedProj.lifecyclePlan.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 py-0.5 border-b border-white/5 last:border-0">
                        <span className="text-slate-500 font-bold w-4 text-right">{idx + 1}.</span>
                        <span className={step.includes("[BOOT]") || step.includes("[ROUTING]") || step.includes("[INGRESS") ? "text-orange-400" : step.includes("[VALIDATION]") || step.includes("[PRE_") || step.includes("[POST_") ? "text-amber-400" : "text-slate-300"}>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeTab === "methodz" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Diagnostic Payload: /system/methodz</span>
                </div>
                <div className="bg-[#0A0A0B] rounded-lg border border-white/5 flex-1 text-xs overflow-hidden max-h-[300px] overflow-y-auto">
                  <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
                    {selectedProj.methodzOutput || '{"error": "Diagnostic not generated for this fixture."}'}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {activeTab === "hookz" && (
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-950 border border-white/5 p-2 rounded mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Diagnostic Payload: /system/hookz</span>
                </div>
                <div className="bg-[#0A0A0B] rounded-lg border border-white/5 flex-1 text-xs overflow-hidden max-h-[300px] overflow-y-auto">
                  <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}>
                    {selectedProj.hookzOutput || '{"error": "Diagnostic not generated for this fixture."}'}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
