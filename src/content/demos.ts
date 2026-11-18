import snapshot from "./source-snapshot.json" with { type: "json" };
import type { DemoRecord } from "./types";

// Editorial purpose is reviewed here; repository identity and candidate hosts come from source manifests.
const descriptions: Record<string, [string, string, string[], string[]]> = {
  "bmvp-authnz": [
    "Authorization application",
    "Explore an application example for authentication and authorization.",
    ["REST"],
    [],
  ],
  haptic_demo: [
    "Haptic feedback",
    "Explore a browser haptic interaction showcase and its transport implementation.",
    ["WebTransport"],
    [],
  ],
  "moqt-loc-msf-webtransport": [
    "Media over QUIC",
    "Inspect the Media over QUIC and WebTransport demonstration.",
    ["WebTransport"],
    [],
  ],
  portable_oidc_idp: [
    "Portable OpenID Connect provider",
    "Explore a portable identity-provider example and its discovery endpoints.",
    ["REST", "OIDC"],
    [],
  ],
  "tba-test-interop-wimse": [
    "WIMSE interoperability lab",
    "Inspect the workload identity interoperability catalog, typed flows, and reproducible test instructions.",
    ["WIMSE"],
    [],
  ],
  "tigrbl-demo-bloom-filter-engine": [
    "Bloom filter",
    "Explore probabilistic membership checks with the memory Bloom engine.",
    ["WebSocket"],
    ["membloom"],
  ],
  "tigrbl-demo-clickhouse-engine": [
    "ClickHouse analytics",
    "Explore the ClickHouse engine laboratory and analytical operations.",
    ["WebSocket"],
    ["clickhouse"],
  ],
  "tigrbl-demo-dataframe-engine": [
    "DataFrame transactions",
    "Explore the DataFrame engine and its tabular operation workflow.",
    ["WebSocket"],
    ["dataframe"],
  ],
  "tigrbl-demo-dedupe-engine": [
    "Duplicate suppression",
    "Explore idempotency and duplicate tracking with the memory dedupe engine.",
    ["WebSocket"],
    ["memdedupe"],
  ],
  "tigrbl-demo-immutable-rom-engine": [
    "Immutable read-only memory",
    "Explore the read-only memory engine and its immutable data surface.",
    ["REST"],
    ["rom"],
  ],
  "tigrbl-demo-lru-engine": [
    "LRU cache",
    "Explore least-recently-used cache behavior with the memory LRU engine.",
    ["WebSocket"],
    ["memlru"],
  ],
  "tigrbl-demo-PySpark-engine": [
    "PySpark analytics",
    "Explore the PySpark engine and distributed DataFrame integration.",
    ["WebSocket"],
    ["pyspark"],
  ],
  "tigrbl-demo-queue-engine": [
    "Memory queue",
    "Explore queue operations with the process-local memory queue engine.",
    ["WebSocket"],
    ["memqueue"],
  ],
  "tigrbl-demo-wal-engines": [
    "Write-ahead logging",
    "Explore the PostgreSQL and SQLite WAL engine demonstration.",
    ["WebSocket"],
    ["pgsqli_wal"],
  ],
  "tigrbl-restbulkcrudtable-postgres-demo": [
    "PostgreSQL bulk CRUD",
    "Explore table-backed CRUD and bulk operations with PostgreSQL.",
    ["REST", "JSON-RPC"],
    ["postgres"],
  ],
  tigrbl_http_webdav_demo: [
    "WebDAV file explorer",
    "Explore file browsing, transfers, and WebDAV interactions.",
    ["REST", "WebDAV"],
    [],
  ],
  tigrbl_realtime_ws_agent2user: [
    "Agent-to-user messaging",
    "Explore the WebSocket agent-to-user application example.",
    ["WebSocket"],
    [],
  ],
  tigrbl_realtime_ws_user2user_video: [
    "WebSocket video",
    "Explore a user-to-user video application with WebSocket signaling.",
    ["WebSocket"],
    [],
  ],
  tigrbl_realtime_ws_user2user_voice: [
    "Voice rooms",
    "Explore browser voice communication with WebSocket transport.",
    ["WebSocket"],
    [],
  ],
  "tigrbl_realtime_wt_present2many_video-screen": [
    "Present to many",
    "Explore presentation rooms, video, and screen sharing over WebTransport.",
    ["WebTransport"],
    [],
  ],
  tigrbl_realtime_wt_user2user_videochat: [
    "WebTransport video chat",
    "Explore a two-participant video chat over WebTransport.",
    ["WebTransport"],
    [],
  ],
  "websocket-realtime-ops-duckdb-demo": [
    "DuckDB realtime operations",
    "Explore realtime analytical operations with the DuckDB engine.",
    ["WebSocket"],
    ["duckdb"],
  ],
  "websocket-realtime-ops-postgres": [
    "PostgreSQL realtime operations",
    "Inspect the PostgreSQL WebSocket operation example.",
    ["WebSocket"],
    ["postgres"],
  ],
  "websocket-realtime-postgres-duckdb": [
    "PostgreSQL and DuckDB",
    "Inspect a realtime example spanning PostgreSQL and DuckDB.",
    ["WebSocket"],
    ["postgres", "duckdb"],
  ],
  "wt-agentbus": [
    "WebTransport agent bus",
    "Explore the agent-bus transport and browser probe.",
    ["WebTransport"],
    [],
  ],
};
const hostPreference: Record<string, string> = {
  "tigrbl-demo-bloom-filter-engine": "membloom",
  "tigrbl-demo-dedupe-engine": "memdedupe",
  "tigrbl-demo-lru-engine": "memlru",
  "tigrbl-demo-queue-engine": "memqueue",
  "tigrbl-demo-wal-engines": "pgsqli-wal",
};
export const DEMOS: DemoRecord[] = snapshot.repositories
  .flatMap((repo) => {
    const fleet = repo.name === "tigrbl-engine-demo-fleet";
    const entries = fleet
      ? repo.hosts.map((host) => ({ host, engine: host.split(".")[0] }))
      : [
          {
            host:
              repo.hosts.find((h) =>
                h.startsWith(`${hostPreference[repo.name]}.`),
              ) ||
              repo.hosts.find((h) => h.includes(".showcase.")) ||
              repo.hosts.find((h) => h.includes(".engine-demo.")),
            engine: "",
          },
        ];
    return entries.map(({ host, engine }): DemoRecord => {
      const details = fleet
        ? ([
            `${engine} engine probe`,
            `Load the ${engine} engine distribution, inspect runtime import evidence, and try the WebSocket echo probe.`,
            ["REST", "WebSocket"],
            [engine],
          ] as [string, string, string[], string[]])
        : descriptions[repo.name];
      if (!details)
        throw new Error(`Demo repository needs editorial review: ${repo.name}`);
      const [title, summary, protocols, engines] = details;
      const category = engines.length
        ? "Engines"
        : repo.name.includes("webdav")
          ? "Files and WebDAV"
          : /authnz|oidc|wimse/.test(repo.name)
            ? "Identity and interoperability"
            : "Realtime";
      return {
        id: fleet
          ? `${engine}-engine-probe`
          : repo.name.toLowerCase().replaceAll("_", "-"),
        title,
        summary,
        category,
        protocols,
        engines,
        packageNames: engines.map((e) => `tigrbl_engine_${e}`),
        repositoryKey: repo.name,
        sourceVisibility:
          repo.sourceVisibility === "public" ? "public" : "private",
        repositoryUrl: repo.repositoryUrl || undefined,
        sourceRef: repo.sourceRef || undefined,
        documentationUrl: repo.repositoryUrl
          ? `${repo.repositoryUrl}/blob/${repo.sourceRef}/README.md`
          : undefined,
        liveUrl: host ? `https://${host}/` : undefined,
        aliases: fleet
          ? []
          : repo.hosts.filter((h) => h !== host).map((h) => `https://${h}/`),
        browserRequirements: [
          ...(protocols.includes("WebTransport")
            ? [
                "A browser with WebTransport support and a secure HTTPS connection.",
              ]
            : ["A current browser."]),
          ...(/voice|video|present2many/.test(repo.name)
            ? [
                "Allow microphone, camera, or screen access only when you choose to use those features.",
                "Use a second browser session or participant when the example requires a room peer.",
              ]
            : []),
        ],
        steps: fleet
          ? [
              "Open the engine probe.",
              "Choose Run live probe and inspect the loaded distribution and version.",
              "Source access is restricted; contact the maintainers for local reproduction instructions.",
            ]
          : [
              repo.repositoryUrl
                ? "Read the pinned repository setup and usage instructions."
                : "Check the requirements below. Source and local setup access are restricted.",
              host
                ? "Launch the hosted application and follow its on-screen workflow."
                : "Contact the maintainers for access or follow the public setup instructions when available.",
              "Use synthetic test data and compare the result with the application's instructions.",
            ],
        evidenceScope: fleet
          ? "Package import/version evidence and a WebSocket echo endpoint. This probe does not establish complete engine CRUD or backend-service conformance."
          : "Website reachability is checked separately and does not certify protocol or application behavior. Public source availability is stated independently.",
        relatedExampleIds: engines.length
          ? ["health", "table-crud"]
          : ["health"],
        localRunInstructions: repo.repositoryUrl
          ? `Clone ${repo.repositoryUrl}, check out ${repo.sourceRef}, and follow its README prerequisites and run commands.`
          : "This demonstration has a private source repository. Local setup requires access from the maintainers; no public clone or setup link is provided.",
      };
    });
  })
  .sort((a, b) => a.title.localeCompare(b.title, "en"));
export const DEMO_DISPOSITIONS = snapshot.repositories.map((repo) => ({
  repositoryKey: repo.name,
  repositoryUrl: repo.repositoryUrl,
  sourceRef: repo.sourceRef,
  disposition: "cataloged",
  demoIds: DEMOS.filter((d) => d.repositoryKey === repo.name).map((d) => d.id),
  aliases: repo.hosts,
}));
