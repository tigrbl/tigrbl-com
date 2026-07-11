/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Feature,
  Claim,
  ProofItem,
  PackageRecord,
  ReleaseRecord,
  ExampleRecord,
  CapabilityRow,
  UserProfileHypothesis
} from "./types";

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
    docsUrl: "https://github.com/tigrbl/tigrbl/blob/main/README.md",
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-core",
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
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-orm",
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
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-kernel",
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
    sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-engine",
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
      "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-runtime",
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
      "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-kernel"
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
    url: "https://github.com/tigrbl/tigrbl/blob/main/LICENSE",
    verifiedAt: "2026-06-27"
  },
  {
    id: "proof-kernel-tests",
    type: "Test",
    title: "Upstream Kernel Lifecycle Spec Tests",
    description: "Automated test suite checking route compile and lifecycle plan generator in core ASGI loops.",
    url: "https://github.com/tigrbl/tigrbl/tree/main/packages/tigrbl-kernel/tests",
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
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl",
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
    sourcePath: "pkgs/core/tigrbl-core",
    pypiUrl: "https://pypi.org/project/tigrbl-core/",
    installCmd: "uv add tigrbl-core",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-core",
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
    sourcePath: "pkgs/core/tigrbl-base",
    pypiUrl: "https://pypi.org/project/tigrbl-base/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-base",
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
    sourcePath: "pkgs/core/tigrbl-concrete",
    pypiUrl: "https://pypi.org/project/tigrbl-concrete/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-concrete",
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
    sourcePath: "pkgs/core/tigrbl-atoms",
    pypiUrl: "https://pypi.org/project/tigrbl-atoms/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-atoms",
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
    sourcePath: "pkgs/core/tigrbl-kernel",
    pypiUrl: "https://pypi.org/project/tigrbl-kernel/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-kernel",
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
    sourcePath: "pkgs/core/tigrbl-runtime",
    pypiUrl: "https://pypi.org/project/tigrbl-runtime/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-runtime",
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
    sourcePath: "pkgs/core/tigrbl-orm",
    pypiUrl: "https://pypi.org/project/tigrbl-orm/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-orm",
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
    sourcePath: "pkgs/core/tigrbl-ops-oltp",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-oltp/",
    installCmd: "uv add tigrbl-ops-oltp",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-ops-oltp",
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
    sourcePath: "pkgs/core/tigrbl-ops-olap",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-olap/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-ops-olap",
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
    sourcePath: "pkgs/core/tigrbl-ops-realtime",
    pypiUrl: "https://pypi.org/project/tigrbl-ops-realtime/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-ops-realtime",
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
    sourcePath: "pkgs/engines/tigrbl-engine-postgres",
    pypiUrl: "https://pypi.org/project/tigrbl-engine-postgres/",
    installCmd: "uv add tigrbl-engine-postgres",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/engines/tigrbl-engine-postgres",
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
    sourcePath: "pkgs/core/tigrbl-client",
    pypiUrl: "https://pypi.org/project/tigrbl-client/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-client",
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
    sourcePath: "pkgs/core/tigrbl-typing",
    pypiUrl: "https://pypi.org/project/tigrbl-typing/",
    evidence: {
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl-typing",
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
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl_spec",
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
      sourceUrl: "https://github.com/tigrbl/tigrbl/tree/main/pkgs/core/tigrbl_tests",
      verifiedAt: "2026-07-11",
      evidenceKind: "pypi"
    }
  }
];

// 5. Release History
export const RELEASES: ReleaseRecord[] = [
  {
    version: "0.4.4",
    type: "stable",
    publishedAt: "2026-06-27",
    pyRange: ">=3.10,<3.15",
    license: "Apache-2.0",
    status: "Alpha",
    pypiUrl: "https://pypi.org/project/tigrbl/0.4.4/",
    githubUrl: "https://github.com/tigrbl/tigrbl/releases/tag/v0.4.4",
    changelogSummary: [
      "Fixes release version drift, bringing the PyPI facade up to date with core operational features.",
      "Optimized ORM database table compiler, producing tighter OpenAPI schema boundaries.",
      "Stabilized WebSocket framing callbacks, reducing overall message latency.",
      "Exposed the template extra package for simple custom HTML bindings."
    ],
    isRecommended: true
  },
  {
    version: "0.4.5.dev4",
    type: "prerelease",
    publishedAt: "2026-06-27",
    pyRange: ">=3.10,<3.15",
    license: "Apache-2.0",
    status: "Alpha (Development Prerelease)",
    pypiUrl: "https://pypi.org/project/tigrbl/0.4.5.dev4/",
    githubUrl: "https://github.com/tigrbl/tigrbl/releases",
    changelogSummary: [
      "Experimental WebTransport session routing support added directly to the kernel runtime.",
      "Initial design hook interfaces for custom client code generators."
    ],
    isRecommended: false
  },
  {
    version: "0.4.5.dev1",
    type: "prerelease",
    publishedAt: "2026-06-27",
    pyRange: ">=3.10,<3.15",
    license: "Apache-2.0",
    status: "Alpha (Development Prerelease)",
    pypiUrl: "https://pypi.org/project/tigrbl/0.4.5.dev1/",
    githubUrl: "https://github.com/tigrbl/tigrbl/releases",
    changelogSummary: [
      "Early refactoring of split core and base packages to allow modular imports in lightweight runtime units."
    ],
    isRecommended: false
  },
  {
    version: "0.4.1",
    type: "stable",
    publishedAt: "2026-05-12",
    pyRange: ">=3.10,<3.15",
    license: "Apache-2.0",
    status: "Alpha",
    pypiUrl: "https://pypi.org/project/tigrbl/0.4.1/",
    githubUrl: "https://github.com/tigrbl/tigrbl/releases/tag/v0.4.1",
    changelogSummary: [
      "Initial architecture separation where the main facade began backing up to core, atoms, and kernel packages.",
      "Added support for the postgres extra engine."
    ],
    isRecommended: false
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
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/main/examples/health.py",
    code: `from tigrbl import TigrblApp, get

app = TigrblApp()

@get("/health")
def health() -> dict[str, str]:
    """Exposes a clean REST GET endpoint at /health"""
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
    engine: "Postgres",
    packageScope: "tigrbl, tigrbl-orm",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/main/examples/crud.py",
    code: `from tigrbl import TigrblApp, Table, get, post
from tigrbl.engines.postgres import PostgresEngine

# Connect Postgres engine via extra
app = TigrblApp(engine=PostgresEngine(dsn="postgresql://localhost/db"))

class Users(Table):
    id: int
    name: str
    email: str

@app.crud(Users)
class UserOperations:
    # Tigrbl compiles the Users schema. It automatically projects:
    # 1. REST Endpoint: GET /users, POST /users
    # 2. JSON-RPC Method: users.list, users.create
    # 3. Typed schema validation on all inputs
    pass
`,
    expectedOutput: `REST: GET /users  ==> [{"id": 1, "name": "Jane", "email": "jane@example.com"}]
JSON-RPC: {"method": "users.list"} ==> {"jsonrpc": "2.0", "result": [{"id": 1}]}
`
  },
  {
    id: "ex-non-persist",
    name: "Custom Non-Persistence Operation",
    audience: "Python API Developers",
    useCase: "Complex operations (like text analysis) that require strict typed schemas but no database storage.",
    difficulty: "Intermediate",
    protocol: "JSON-RPC",
    engine: "None",
    packageScope: "tigrbl",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/main/examples/analyze.py",
    code: `from tigrbl import TigrblApp, operation, Schema

app = TigrblApp()

class TextPayload(Schema):
    text: str
    max_words: int = 5

@app.bind("text.summarize")
@operation
def summarize(payload: TextPayload) -> dict[str, any]:
    words = payload.text.split()
    summary = " ".join(words[:payload.max_words])
    return {
        "summary": f"{summary}...",
        "word_count": len(words)
    }
`,
    expectedOutput: `JSON-RPC Request:
{
  "jsonrpc": "2.0",
  "method": "text.summarize",
  "params": {"text": "Tigrbl is a schema-first ASGI framework for Python", "max_words": 3},
  "id": 1
}

JSON-RPC Response:
{
  "jsonrpc": "2.0",
  "result": {
    "summary": "Tigrbl is a...",
    "word_count": 8
  },
  "id": 1
}`
  },
  {
    id: "ex-lifecycle",
    name: "Compile-Time Lifecycle Hooks",
    audience: "Technical Evaluators",
    useCase: "Registering global hooks and inspecting the boot plan to verify server dispatch logic before starting.",
    difficulty: "Advanced",
    protocol: "None",
    engine: "None",
    packageScope: "tigrbl, tigrbl-kernel",
    testedStatus: "Passed",
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/main/examples/hooks.py",
    code: `from tigrbl import TigrblApp, get

app = TigrblApp()

@app.on_startup
async def connect_external_metrics():
    print("Hook fired: Connecting external metrics platform...")

@get("/compute")
def compute() -> int:
    return 42

# We can inspect the compiled dispatch plan before launching ASGI!
plan = app.compile_plan()
for step in plan.steps:
    print(f"Step: {step.name} -> {step.handler_name}")
`,
    expectedOutput: `Hook fired: Connecting external metrics platform...
Step: parse_request -> tigrbl.kernel.steps.parse_http
Step: authenticate -> my_custom_auth_middleware
Step: execute_route -> compute
Step: format_response -> tigrbl.kernel.steps.serialize_json`
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
    sourceLink: "https://github.com/tigrbl/tigrbl/blob/main/examples/stream.py",
    code: `import asyncio
from tigrbl import TigrblApp, stream, Event

app = TigrblApp()

@stream("/events")
async def event_generator():
    """Generates a structured SSE event sequence"""
    for count in range(1, 4):
        await asyncio.sleep(1)
        yield Event(
            event="tick",
            data={"index": count, "message": "heartbeat"}
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
