import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import net from "node:net";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const reservation = net.createServer();
await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const browser = await chromium.launch({
  executablePath,
  args: [`--remote-debugging-port=${port}`],
});
const origin = process.env.SITE_BASE_URL || "http://127.0.0.1:4187";
const profiles = [
  {
    name: "mobile",
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 360,
      height: 800,
      deviceScaleFactor: 2,
      disabled: false,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 6,
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
    },
  },
  {
    name: "tablet",
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      disabled: false,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
    },
  },
  {
    name: "desktop",
    formFactor: "desktop",
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
];
const routes = (
  process.env.PERFORMANCE_ROUTES ||
  "/,/demos,/ecosystem,/demos/tigrbl-http-webdav-demo"
).split(",");
const samples = Number(process.env.PERFORMANCE_SAMPLES || 3);
await fs.mkdir(".reports/lighthouse", { recursive: true });
const summaries = [];
try {
  for (const route of routes)
    for (const profile of profiles) {
      const runs = [];
      for (let sample = 1; sample <= samples; sample++) {
        const { name, ...settings } = profile;
        const result = await lighthouse(origin + route, {
          port,
          output: "json",
          logLevel: "error",
          maxWaitForLoad: 15000,
          maxWaitForFcp: 15000,
          onlyCategories: [
            "performance",
            "accessibility",
            "best-practices",
            "seo",
          ],
          ...settings,
        });
        const lhr = result.lhr;
        if (lhr.runtimeError)
          throw new Error(`${route}: ${lhr.runtimeError.message}`);
        const key = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${name}-${sample}`;
        await fs.writeFile(
          `.reports/lighthouse/${key}.json`,
          JSON.stringify(lhr),
        );
        const run = {
          score: Math.round(lhr.categories.performance.score * 100),
          accessibility: Math.round(lhr.categories.accessibility.score * 100),
          seo: Math.round(lhr.categories.seo.score * 100),
          lcp: lhr.audits["largest-contentful-paint"].numericValue,
          cls: lhr.audits["cumulative-layout-shift"].numericValue,
          tbt: lhr.audits["total-blocking-time"].numericValue,
        };
        runs.push(run);
        console.log(JSON.stringify({ route, profile: name, sample, ...run }));
      }
      const scores = runs.map((r) => r.score).sort((a, b) => a - b);
      summaries.push({
        route,
        profile: profile.name,
        samples,
        median: scores[Math.floor(scores.length / 2)],
        worst: scores[0],
        runs,
      });
      await fs.writeFile(
        ".reports/lighthouse/summary.json",
        JSON.stringify(summaries, null, 2) + "\n",
      );
    }
} finally {
  await browser.close();
}
if (process.argv.includes("--strict") && summaries.some((s) => s.median < 100))
  process.exitCode = 1;
