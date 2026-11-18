import fs from "node:fs/promises";
import { DEMOS } from "../src/content/demos";
import type { Availability } from "../src/content/types";
const queue = DEMOS.filter((d) => d.liveUrl);
const results: Record<string, Availability> = {};
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const demo = queue.shift()!;
      const record: Availability = {
        url: demo.liveUrl!,
        checkedAt: new Date().toISOString(),
        status: "unavailable",
        scope:
          "HTTP landing page retrieval only; no protocol, backend, or user workflow qualification.",
      };
      try {
        const response = await fetch(demo.liveUrl!, {
          signal: AbortSignal.timeout(12000),
        });
        record.httpStatus = response.status;
        record.finalUrl = response.url;
        const body = await response.text();
        const sameHost =
          new URL(response.url).hostname === new URL(demo.liveUrl!).hostname;
        record.status =
          response.ok && sameHost && /tigrbl/i.test(body)
            ? "reachable"
            : "unavailable";
        if (!sameHost) record.error = "Redirected to an unexpected host.";
        else if (!/tigrbl/i.test(body))
          record.error = "Expected project identity was not found in the page.";
      } catch (error) {
        record.error = String(error);
      }
      results[demo.id] = record;
    }
  }),
);
const ordered = Object.fromEntries(
  Object.entries(results).sort(([a], [b]) => a.localeCompare(b, "en")),
);
await fs.writeFile(
  "src/content/availability.json",
  JSON.stringify(ordered, null, 2) + "\n",
);
const reachable = Object.values(results).filter(
  (r) => r.status === "reachable",
).length;
console.log(
  `${reachable}/${Object.keys(results).length} configured demo pages reachable; ${DEMOS.length - Object.keys(results).length} local-only entries.`,
);
if (
  process.argv.includes("--strict") &&
  reachable !== Object.keys(results).length
)
  process.exitCode = 1;
