[![Managed with wyrmctl](https://img.shields.io/badge/managed%20with-wyrmctl-2f6f4e.svg)](https://github.com/groupsum/wyrmctl)

# tigrbl.com

Product website for [tigrbl.com](https://tigrbl.com).

React/Vite builds 53 public HTML pages, including a source-linked catalog of 42
demonstrations from 26 repositories. Public pages are statically rendered before
React hydrates search, filters, copy controls, and mobile navigation. Ordinary
links and page content work without JavaScript.

## Content and discovery

`src/content/` owns site identity, route records, source/publication snapshots,
reviewed demo descriptions, code recipes, and project policies. Normal builds
use committed inputs and require no requests to PyPI or demo hosts.

- `site.ts`: official destinations and package facts.
- `pages.ts`: canonical paths and indexability.
- `demos.ts`: source revisions, reviewed descriptions, candidate hosts, aliases,
  browser requirements, local setup, and the limits of each demonstration.
- `source-snapshot.json`: package manifests, PyPI publications, demo repository
  revisions, and configured domains.
- `availability.json`: dated landing-page HTTP observations, separate from
  functional or interoperability qualification.
- `metadata.ts`: build-only typed `@mdwrk/structured-data@0.3.0` builders. Every
  page receives one JSON-LD graph, canonical URL, Open Graph metadata, and Twitter
  Card metadata in its initial HTML. The builder library is not shipped to browsers.

`scripts/build-static.tsx` renders every route and generates the branded PNG
share image. `scripts/discovery.ts` emits the sitemap index and four child maps,
XSL stylesheet, robots policy, RSS/Atom release feeds, and LLM reference files.
The full LLM reference is derived from the rendered public content. Feed dates
come from PyPI upload timestamps; uncertain page modification dates are omitted.
External demo application origins are not included in the website's URL sitemaps.

The unused previous content pack, manual discovery outputs, simulated projection
data, and client-only metadata injector have been removed.

## Updating source facts

Use Python 3.11+ for manifest extraction and Node 22 for the site. Refreshing is
an explicit editorial operation, separate from reproducible offline builds:

```powershell
python scripts/refresh-content.py --organization-root D:/Code/GitHub/tigrbl --skip-publications
npm run content:refresh
npm run demos:check
npm run build
```

Review the snapshot diff, new packages, and any new demo repositories. Unknown
demo repositories intentionally fail until a description and requirements are
added to `demos.ts`. The inventory includes dedicated demo/realtime repositories,
the engine probe fleet, and identity/transport examples. Framework inline examples
are linked as code recipes rather than misrepresented as hosted applications.

Aliases are retained in the inventory; only the chosen configured host is used
for the launch action. HTTP observations require a successful response, the
expected host, and Tigrbl identity. They do not certify the underlying operation,
browser permission flow, engine backend, or protocol behavior. Availability checks
are a separate manual workflow and do not block ordinary site builds.

## Commands

- `npm ci`
- `npm run check`
- `npm run build`
- `npm run docker:build`
- `uv sync --dev`
- `npm run routing:validate`
- `npm run routing:plan` (read-only; requires Portwyrm credentials)
- `npm run preview` (built artifact at `http://127.0.0.1:4187`)
- `npm run discovery:check`
- `npm run test:http` (set `SITE_BASE_URL` to select another server)
- `npx playwright install chromium` followed by `npm run test:browser`
- `npm run performance:audit` (three cold-cache samples per route/device profile)

The production build validates all generated discovery files byte-for-byte,
canonical route coverage, internal links, JSON-LD, sitemap/feed structure, and demo
inventory coverage. Every JS/CSS/WASM chunk must fit within 256 KiB uncompressed,
with a 150 KiB combined gzip script/style budget. Reports are written to `.reports/`.

Browser checks cover desktop (1440×900), tablet (768×1024), and mobile (360×800).
The performance audit records custom mobile/tablet CPU and network profiles and
a desktop profile, with raw Lighthouse JSON and a summary. `--strict` requires a
median performance score of 100. Lab scores do not establish field p75 Web Vitals;
the website includes no analytics or real-user telemetry collector.

To exercise the displayed quickstart, install the facade version in the committed
snapshot into an isolated Python environment and run
`python scripts/check-quickstart.py`. CI performs this check against PyPI.

The repository pins `wyrmctl==0.4.6` through uv. CI validates the schema-v3 desired state in `.wyrmctl/`, and deployment delegates immutable plan/apply/verify operations to the shared Portwyrm workflow.

## Deployment

This repo owns the `tigrbl-com` application desired state and release. Pushes to the default `master` branch run CI and automatically deploy the verified commit after CI succeeds. The `Deploy` workflow also supports manual recovery runs.

The shared `cobycloud/actions` deployment workflow runs on the protected `portwyrm-deployment` runner group. It builds the Compose service, creates an immutable `wyrmctl` plan bound to the repository and commit, applies that exact artifact under the VM104 mutation lock, and verifies public HTTPS. Portwyrm itself remains shared infrastructure; this repository remains the owner of the application and its route.

Nginx serves generated HTML directly and returns genuine 404s. Known old hash
bookmarks are translated by the client. Previous sitemap names and
`/full-llms.txt` redirect to their canonical replacements. HTML is revalidated;
hashed scripts/styles are immutable; text responses support gzip.

CI validates the actual Docker/Nginx image and browser journeys. Post-deployment
verification checks the deployed commit plus representative pages, discovery
files, content types, redirects, and missing-page behavior. Before promotion,
retain the previously deployed commit/image. Roll back through the existing
deployment workflow using that known revision; route/DNS configuration is unchanged.
