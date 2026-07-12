/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Feature,
  Claim,
  ProofItem,
  PackageRecord,
  ExampleRecord,
  CapabilityRow,
  UserProfileHypothesis
} from "./types";
export { RELEASES } from "./releases";

export const VERIFIED_DATE = "2026-07-11";

// 1. Core Features of Tigrbl
export const FEATURES: Feature[] = [
  {
    id: "feat-single-spec",
    name: "Single-Surface Operations",
    description: "Define endpoint schemas, parameters, and return types once. Tigrbl projects them transparently into REST paths, JSON-RPC procedures, and streaming bindings.",
    audienceValue: "Eliminates duplicate routing, schema synchronization, and validation code across disparate protocols.",
    packageOwner: "tigrbl-core",
    maturity: "Alpha",
    versionScope: ">=0.4.0",
    protocols: ["REST", "JSON-RPC", "SSE", "WebSocket"],
    engines: ["Generic"],
    docsUrl: "https://github.com/tigrbl/tigrbl/blob/master/README.md",
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_core",
    verifiedAt: "2026-07-11"
  },
  {
    id: "feat-table-crud",
    name: "Table-Backed Projection",
    description: "Map domain tables directly to auto-generated CRUD routes. Compile table properties into validation schemas, API docs, and query parameters dynamically.",
    audienceValue: "Provides structured data bindings with instant multi-protocol access without manual boilerplates.",
    packageOwner: "tigrbl-orm",
    maturity: "Alpha",
    versionScope: ">=0.4.0",
    protocols: ["REST", "JSON-RPC"],
    engines: ["Postgres"],
    docsUrl: "https://github.com/tigrbl/tigrbl",
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_orm",
    verifiedAt: "2026-07-11"
  },
  {
    id: "feat-explicit-lifecycle",
    name: "Reviewable Execution Plans",
    description: "The ASGI kernel translates operation routes and dependencies into inspectable lifecycle plans prior to server boot, allowing upfront static debugging.",
    audienceValue: "Ensures platform teams can trace, log, and audit the exact request-response dispatch path.",
    packageOwner: "tigrbl-kernel",
    maturity: "Alpha",
    versionScope: ">=0.4.0",
    protocols: ["REST", "JSON-RPC", "SSE", "WebSocket", "WebTransport"],
    engines: ["Generic"],
    docsUrl: "https://github.com/tigrbl/tigrbl",
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_kernel",
    verifiedAt: "2026-07-11"
  },
  {
    id: "feat-multi-protocol-engines",
    name: "Pluggable Engines & Transaction Bindings",
    description: "Bind core operations to declarative execution engines (like Postgres, caches, or pub/sub queues) with integrated connection pooling and automatic transactions.",
    audienceValue: "Abstracts infrastructure connections into clear operation context dependencies.",
    packageOwner: "tigrbl-engine",
    maturity: "Alpha",
    versionScope: ">=0.4.0",
    protocols: ["REST", "JSON-RPC"],
    engines: ["Postgres"],
    docsUrl: "https://github.com/tigrbl/tigrbl",
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/engines",
    verifiedAt: "2026-07-11"
  }
];

// 2. Approved Technical Claims
export const CLAIMS: Claim[] = [
  {
    id: "claim-multi-protocol",
    claimText: "Define once, project everywhere: Keep REST endpoints, JSON-RPC procedures, and WebSocket flows completely synchronized in a single schema-first Python codebase.",
    allowedContexts: ["Home Hero", "Product Page"],
    evidenceLinks: [
      "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_runtime",
      "https://pypi.org/project/tigrbl/"
    ],
    reviewer: "Maintainer",
    approvalStatus: "Approved",
    versionScope: "0.4.4",
    expiryDate: "2027-01-11",
    reverificationDate: "2026-10-11"
  },
  {
    id: "claim-lifecycle-audit",
    claimText: "Inspectable ASGI kernel plans guarantee runtime predictability, allowing compile-time tracing of lifecycle hooks, middleware, and dependency trees.",
    allowedContexts: ["Product Page", "Get Started"],
    evidenceLinks: [
      "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_kernel"
    ],
    reviewer: "Maintainer",
    approvalStatus: "Approved",
    versionScope: "0.4.4",
    expiryDate: "2027-01-11",
    reverificationDate: "2026-10-11"
  },
  {
    id: "claim-alpha-readiness",
    claimText: "Tigrbl is in active Alpha development (v0.4.4). Supported ranges span Python 3.10 through 3.14 with Apache-2.0 open-source licensing.",
    allowedContexts: ["Home Trust Strip", "Releases View"],
    evidenceLinks: [
      "https://pypi.org/project/tigrbl/0.4.4/"
    ],
    reviewer: "Maintainer",
    approvalStatus: "Approved",
    versionScope: "0.4.4",
    expiryDate: "2027-01-11",
    reverificationDate: "2026-07-11"
  }
];

// 3. Proof Items (verifiable evidence)
export const PROOF_ITEMS: ProofItem[] = [
  {
    id: "proof-pypi",
    type: "Artifact",
    title: "PyPI Package Release",
    description: "Tigrbl 0.4.4 stable release binary and metadata uploaded to Python Package Index.",
    url: "https://pypi.org/project/tigrbl/0.4.4/",
    verifiedAt: "2026-06-27"
  },
  {
    id: "proof-license",
    type: "Policy",
    title: "Apache-2.0 License File",
    description: "Permissive Apache-2.0 license checked in at repository root for framework usage.",
    url: "https://github.com/tigrbl/tigrbl/blob/master/LICENSE",
    verifiedAt: "2026-06-27"
  },
  {
    id: "proof-kernel-tests",
    type: "Test",
    title: "Upstream Kernel Lifecycle Spec Tests",
    description: "Automated test suite checking route compile and lifecycle plan generator in core ASGI loops.",
    url: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_kernel/tests",
    verifiedAt: "2026-07-11"
  }
];

// 4. Package Ecosystem (Task-Oriented)
export const PACKAGES: PackageRecord[] = [
  // Public Facade
  {
    distributionName: "tigrbl",
    importRoot: "tigrbl",
    group: "facade",
    audience: "application",
    responsibility: "Application-facing app/router factories, decorators, shortcuts, schema helpers, engine helpers, compatibility imports, and CLI.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl",
    pypiUrl: "https://pypi.org/project/tigrbl/",
    version: "0.4.4",
    pythonRange: ">=3.10,<3.15",
    installCmd: "uv add tigrbl",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  // Framework Layers
  {
    distributionName: "tigrbl-core",
    importRoot: "tigrbl_core",
    group: "core",
    audience: "extension",
    responsibility: "Specs, configuration resolution, operation vocabulary, and schema generation.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_core",
    pypiUrl: "https://pypi.org/project/tigrbl-core/",
    installCmd: "uv add tigrbl-core",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_core",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-base",
    importRoot: "tigrbl_base",
    group: "core",
    audience: "extension",
    responsibility: "Abstract contracts, mapping helpers, and inference boundaries.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_base",
    pypiUrl: "https://pypi.org/project/tigrbl-base/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_base",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-concrete",
    importRoot: "tigrbl_concrete",
    group: "core",
    audience: "extension",
    responsibility: "Concrete app/router/table/operation/docs/diagnostics/engine/transport adapters.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_concrete",
    pypiUrl: "https://pypi.org/project/tigrbl-concrete/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_concrete",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-atoms",
    importRoot: "tigrbl_atoms",
    group: "core",
    audience: "maintainer",
    responsibility: "Lifecycle phase work, typed contexts, atoms, transactions, and runtime units.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_atoms",
    pypiUrl: "https://pypi.org/project/tigrbl-atoms/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_atoms",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-kernel",
    importRoot: "tigrbl_kernel",
    group: "core",
    audience: "maintainer",
    responsibility: "Operation-view compilation, hook ordering, packed plans, protocol chains, lifecycle rows, labels, event keys, and capability masks.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_kernel",
    pypiUrl: "https://pypi.org/project/tigrbl-kernel/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_kernel",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-runtime",
    importRoot: "tigrbl_runtime",
    group: "core",
    audience: "maintainer",
    responsibility: "Execution of compiled plans, routing, transport-unit handling, framing, and transaction progression.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_runtime",
    pypiUrl: "https://pypi.org/project/tigrbl-runtime/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_runtime",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-orm",
    importRoot: "tigrbl_orm",
    group: "core",
    audience: "extension",
    responsibility: "SQLAlchemy-facing table, mixin, column, and persistence helpers.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_orm",
    pypiUrl: "https://pypi.org/project/tigrbl-orm/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_orm",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  // Operation Packs
  {
    distributionName: "tigrbl-ops-oltp",
    importRoot: "tigrbl_ops_oltp",
    group: "op-pack",
    audience: "application",
    responsibility: "Canonical CRUD and transactional operation definitions.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_ops_oltp",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-oltp/",
    installCmd: "uv add tigrbl-ops-oltp",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_ops_oltp",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-ops-olap",
    importRoot: "tigrbl_ops_olap",
    group: "op-pack",
    audience: "application",
    responsibility: "Analytical operation definitions.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_ops_olap",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-olap/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_ops_olap",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-ops-realtime",
    importRoot: "tigrbl_ops_realtime",
    group: "op-pack",
    audience: "application",
    responsibility: "Realtime, streaming, pub/sub, and transport-oriented operation definitions.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_ops_realtime",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-realtime/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_ops_realtime",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  // Engine Plugins
  {
    distributionName: "tigrbl-engine-postgres",
    importRoot: "tigrbl_engine_postgres",
    group: "engine",
    audience: "application",
    responsibility: "PostgreSQL transaction and persistence engine integration.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/engines/tigrbl_engine_postgres",
    pypiUrl: "https://pypi.org/project/tigrbl-engine-postgres/",
    installCmd: "uv add tigrbl-engine-postgres",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/engines/tigrbl_engine_postgres",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  // Client and tooling
  {
    distributionName: "tigrbl-client",
    importRoot: "tigrbl_client",
    group: "client",
    audience: "application",
    responsibility: "Client helpers.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_client",
    pypiUrl: "https://pypi.org/project/tigrbl-client/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_client",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl-typing",
    importRoot: "tigrbl_typing",
    group: "typing",
    audience: "application",
    responsibility: "Shared typing and vendor-compatible types.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_typing",
    pypiUrl: "https://pypi.org/project/tigrbl-typing/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_typing",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl_spec",
    importRoot: "tigrbl_spec",
    group: "testing",
    audience: "maintainer",
    responsibility: "Spec support package.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_spec",
    pypiUrl: "https://pypi.org/project/tigrbl_spec/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_spec",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  },
  {
    distributionName: "tigrbl_tests",
    importRoot: "tigrbl_tests",
    group: "testing",
    audience: "testing",
    responsibility: "Test harnesses, examples, conformance, and package tests.",
    publicationStatus: "Published",
    installable: true,
    sourcePath: "pkgs/core/tigrbl_tests",
    pypiUrl: "https://pypi.org/project/tigrbl_tests/",
    installCmd: "uv add --dev tigrbl_tests",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/master/pkgs/core/tigrbl_tests",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  }
];

// 6. Curated Examples & Demos
export const EXAMPLES: ExampleRecord[] = [
  {
    id: "ex-health",
    name: "Minimal Health Operation",
    audience: "Python API Developers",
    useCase: "Lightweight health checks or basic JSON responses using only the public facade.",
    difficulty: "Beginner",
    protocol: "REST",
    engine: "None",
    packageScope: "tigrbl",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/master/examples/transport_surface_matrix_demo/app.py",
    code: `from tigrbl import TigrblApp

app = TigrblApp()

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
`,
    expectedOutput: `GET /health
Response Code: 200 OK
Body:
{
  "status": "ok"
}`
  },
  {
    id: "ex-crud",
    name: "Table-Backed Multi-Protocol CRUD",
    audience: "Platform Teams",
    useCase: "Generated REST routes and JSON-RPC procedures compiled directly from a single data model.",
    difficulty: "Intermediate",
    protocol: "Multi-Protocol",
    engine: "Generic",
    packageScope: "tigrbl, tigrbl-orm",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/master/examples/equivalence_contracts/src/tigrbl_equivalence_contracts/equivalences/rest_json_rpc_oltp_table/tigrbl_impl.py",
    code: `from sqlalchemy import Column, String
from tigrbl import RestJsonRpcTable, TigrblApp

class User(RestJsonRpcTable):
    __tablename__ = "users"
    __allow_unmapped__ = True

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)

app = TigrblApp(
    engine={"kind": "sqlite", "mode": "memory", "async": False}
)
app.include_table(User)
app.initialize()
app.mount_jsonrpc(prefix="/rpc")
`,
    expectedOutput: `The RestJsonRpcTable profile supplies the operation inventory.
Inspect the generated routes and RPC methods at runtime; path and method aliases
come from the bound table operation specs, not from handwritten duplicates.
`
  },
  {
    id: "ex-non-persist",
    name: "Custom Non-Persistence Operation",
    audience: "Python API Developers",
    useCase: "Complex operations (like text analysis) that require strict typed schemas but no database storage.",
    difficulty: "Intermediate",
    protocol: "REST",
    engine: "None",
    packageScope: "tigrbl",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/master/examples/transport_surface_matrix_demo/app.py",
    code: `from tigrbl import TigrblApp

app = TigrblApp()

@app.post("/summaries")
def summarize(payload: dict) -> dict[str, object]:
    words = str(payload.get("text", "")).split()
    limit = int(payload.get("max_words", 5))
    return {"summary": " ".join(words[:limit]), "word_count": len(words)}
`,
    expectedOutput: `POST /summaries
{"text":"Tigrbl keeps operation identity visible","max_words":3}

200 OK
{"summary":"Tigrbl keeps operation","word_count":6}`
  },
  {
    id: "ex-lifecycle",
    name: "Inspect Runtime Diagnostics",
    audience: "Technical Evaluators",
    useCase: "Mounting the framework diagnostics and inspecting the kernel-owned operation plan.",
    difficulty: "Advanced",
    protocol: "None",
    engine: "None",
    packageScope: "tigrbl, tigrbl-kernel",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/master/pkgs/70_concrete/tigrbl_concrete/tigrbl_concrete/system/diagnostics/kernelz.py",
    code: `from tigrbl import TigrblApp

app = TigrblApp(mount_system=True)

# After tables are included and initialized, query the mounted diagnostics:
#   GET /system/methodz
#   GET /system/hookz
#   GET /system/kernelz
`,
    expectedOutput: `/system/kernelz returns:
{
  "ModelName": {
    "operation_alias": ["PHASE:hook-label", "..."]
  }
}

The exact labels are generated from the included tables, operation specs,
dependencies, hooks, persistence policy, and kernel plan.`
  },
  {
    id: "ex-streaming",
    name: "Server-Sent Events (SSE) Stream",
    audience: "Existing Users",
    useCase: "Pushing continuous server updates to browser frontends via SSE with automatic validation.",
    difficulty: "Advanced",
    protocol: "SSE",
    engine: "None",
    packageScope: "tigrbl, tigrbl-runtime",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/master/examples/transport_surface_matrix_demo/app.py",
    code: `from tigrbl import EventStreamResponse, SseBindingSpec, TigrblApp

app = TigrblApp()

async def event_items():
    yield {"event": "tick", "data": {"id": 1}}

def events() -> EventStreamResponse:
    return EventStreamResponse(event_items())

app.add_route(
    "/events",
    events,
    methods=("GET",),
    tigrbl_binding=SseBindingSpec(
        proto="http.sse", path="/events", methods=("GET",)
    ),
    tigrbl_exchange="event_stream",
)
`,
    expectedOutput: `Connection: GET /events
Response Headers: text/event-stream

Stream Output:
event: tick
data: {"index": 1, "message": "heartbeat"}

event: tick
data: {"index": 2, "message": "heartbeat"}
`
  }
];

// 7. Capability Matrix Data
export const CAPABILITIES: CapabilityRow[] = [
  {
    capability: "Request Validation",
    rest: "Pydantic-like automatic headers/JSON validation",
    jsonRpc: "Strict RPC-params mapping & error codes",
    sse: "N/A",
    websocket: "Message payload structure checks",
    webtransport: "Inherent stream packet parsing"
  },
  {
    capability: "Contract Autogeneration",
    rest: "Full OpenAPI 3.1 specifications & Interactive Swagger",
    jsonRpc: "OpenRPC documentation schemas",
    sse: "SSE stream channel specs",
    websocket: "AsyncAPI message templates",
    webtransport: "WebTransport session protocols"
  },
  {
    capability: "Hook Integrations",
    rest: "HTTP route middleware & post-serialize filters",
    jsonRpc: "Method pre-auth handlers & error wrappers",
    sse: "Connection startup/termination logs",
    websocket: "Frame receive/send lifecycle traps",
    webtransport: "Stream setup/shutdown events"
  },
  {
    capability: "Diagnostic Reports",
    rest: "Route-by-route execution logs & latencies",
    jsonRpc: "Procedure failure diagnostic mapping",
    sse: "Heartbeat check logs & active connection counts",
    websocket: "Active channel and socket status dashboards",
    webtransport: "Congestion window diagnostics"
  }
];

// 8. Visitor Profiles / JTBD (Jobs to be Done)
export const VISITOR_PROFILES: UserProfileHypothesis[] = [
  {
    profileName: "Python Developer",
    questionToAnswer: "Can I build a real, high-performance API quickly with the public facade?",
    requiredProof: "Runnable quickstart, multi-protocol generation code, clean decorator signatures.",
    primaryNextAction: "Copy install command or proceed to 'Get started'.",
    features: ["feat-single-spec"]
  },
  {
    profileName: "Platform Lead / Architect",
    questionToAnswer: "Can this standardize contracts and align multi-protocol runtimes across services?",
    requiredProof: "Core-kernel compilation model, lifecycle plans, capability mappings.",
    primaryNextAction: "Inspect the 'How it works' diagram or view source code.",
    features: ["feat-explicit-lifecycle", "feat-multi-protocol-engines"]
  },
  {
    profileName: "Extension or Plugin Author",
    questionToAnswer: "How are modular engines and packages designed, and where do additions fit?",
    requiredProof: "Exhaustive task-oriented ecosystem package explorer, API stability indicators.",
    primaryNextAction: "Review 'Ecosystem' and read open-source contributing guides.",
    features: ["feat-table-crud"]
  },
  {
    profileName: "Technical Evaluator",
    questionToAnswer: "Is the project real, trustworthy, compliant, and active?",
    requiredProof: "Stable version badge (0.4.4), recent verified release dates, license (Apache-2.0).",
    primaryNextAction: "Read release logs or open GitHub.",
    features: ["feat-explicit-lifecycle"]
  }
];
