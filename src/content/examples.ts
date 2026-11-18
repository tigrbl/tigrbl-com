import { FRAMEWORK_SOURCE } from "./site";
import type { ExampleRecord } from "./types";

export const HEALTH_CODE = `from tigrbl import TigrblApp

app = TigrblApp()

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}`;
export const EXAMPLES: ExampleRecord[] = [
  {
    id: "health",
    title: "A first REST endpoint",
    description: "Create an ASGI application and expose a JSON health check.",
    protocol: "REST",
    code: HEALTH_CODE,
    sourceUrl: `${FRAMEWORK_SOURCE}/pkgs/80_facade/tigrbl`,
    evidence:
      "The website quickstart check installs the pinned facade and exercises this endpoint over ASGI.",
  },
  {
    id: "table-crud",
    title: "Table-backed REST and JSON-RPC",
    description:
      "Start from the repository’s executable equivalence-contract example for a table-backed operation surface.",
    protocol: "REST + JSON-RPC",
    code: "See the pinned source example for the complete table declaration, app setup, and operation bindings.",
    sourceUrl: `${FRAMEWORK_SOURCE}/pkgs/96_examples/equivalence_contracts/src/tigrbl_equivalence_contracts/equivalences/rest_json_rpc_oltp_table/tigrbl_impl.py`,
    evidence:
      "Pinned source example; hosted-demo availability is reported separately. Follow the example’s own environment and test instructions.",
  },
  {
    id: "diagnostics",
    title: "Inspect a kernel plan",
    description:
      "Read the diagnostics implementation and inspect the included application’s operation plans.",
    protocol: "REST",
    code: "GET /system/kernelz\nGET /system/methodz\nGET /system/hookz",
    sourceUrl: `${FRAMEWORK_SOURCE}/pkgs/70_concrete/tigrbl_concrete/tigrbl_concrete/system/diagnostics/kernelz.py`,
    evidence:
      "Diagnostic output depends on the installed version, mounted system routes, and included operations. These are request paths, not captured output.",
  },
];
