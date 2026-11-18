# Website update verification

Validated locally on November 17, 2026 (America/Chicago; November 18 UTC).

- 53 public static HTML pages; 42 demo entries from 26 repositories. GitHub visibility checks found one public source repository and 25 private sources; private repository links and revisions are excluded from the public snapshot.
- 45 source-backed package records and current PyPI facade 0.4.5.
- 34/34 configured demo landing pages reachable; eight entries have local setup only.
- TypeScript, generated discovery parity, internal links, JSON-LD, XML/feed validation, asset budgets, routing validation, and proxy target checks pass.
- Published quickstart: isolated Python 3.12 with tigrbl==0.4.5, GET /health returns 200 and the expected JSON.
- Node 22 Docker build and Nginx syntax check pass. HTTP checks confirm page content, content types, gzip, redirects, and real 404s.
- 15 Playwright checks pass across desktop, tablet, and mobile; includes direct navigation/hydration, search/filter/reset/empty states, keyboard/mobile navigation, legacy hash links, and JavaScript-disabled content.
- Four JS/CSS assets total approximately 82.9 KB gzip; largest uncompressed chunk is about 194 KB (256 KiB ceiling).

## Lighthouse lab evidence

Production Docker/Nginx preview on Windows, Chromium 151 from Playwright revision 1234, Lighthouse 13.6.0. Three cold-cache samples for each route/profile. Mobile uses 360×800 with 6× CPU slowdown; tablet uses 768×1024 with 4× slowdown; desktop uses 1440×900 at native CPU. Full network settings are pinned in scripts/audit-performance.mjs.

| Route                          | Profile | Samples | Median performance | Lowest performance |
| ------------------------------ | ------- | ------- | ------------------ | ------------------ |
| /                              | mobile  | 3       | 100                | 100                |
| /                              | tablet  | 3       | 100                | 100                |
| /                              | desktop | 3       | 100                | 100                |
| /demos                         | mobile  | 3       | 100                | 100                |
| /demos                         | tablet  | 3       | 100                | 100                |
| /demos                         | desktop | 3       | 100                | 100                |
| /ecosystem                     | mobile  | 3       | 100                | 100                |
| /ecosystem                     | tablet  | 3       | 100                | 100                |
| /ecosystem                     | desktop | 3       | 100                | 100                |
| /demos/tigrbl-http-webdav-demo | mobile  | 3       | 100                | 100                |
| /demos/tigrbl-http-webdav-demo | tablet  | 3       | 100                | 100                |
| /demos/tigrbl-http-webdav-demo | desktop | 3       | 100                | 100                |

All 36 runs also scored 100 for accessibility and SEO. CLS was zero in these samples. These are local lab measurements; no field p75 Web Vitals or real-device qualification is claimed. Raw JSON is retained locally under .reports/lighthouse/ and by the CI artifact upload.

## Limits and review

Demo landing-page reachability is distinct from protocol/backend conformance. Engine fleet entries explicitly describe import/version and echo probes. Policies describe the website implementation and community support channels; no support SLA or infrastructure retention promise is invented. The website includes no analytics/telemetry collector.

The dependency audit retains four high advisories in the Vite/picomatch build-tool chain after compatible updates; the deployed runtime serves static files through Nginx.

Production has not been deployed by this update. Merge/promotion uses the existing deployment lane and post-deployment content verification. External demo repositories were inventoried but not modified.

Source-visibility correction: private demos retain hosted launch actions, while public clone/setup links and SoftwareSourceCode markup are emitted only for public source. Browser coverage includes this access distinction.
