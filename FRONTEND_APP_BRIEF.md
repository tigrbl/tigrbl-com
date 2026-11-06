# Tigrbl Portfolio Website — Application Brief

Status: implementation brief  
Prepared: 2026-07-11  
Restored: 2026-11-05  
Target repository: `tigrbl/tigrbl-com`  
Audience: frontend engineering, UI/UX design, copywriting, Technical Marketing, Developer Relations, Sales/Account Management, and GTM Strategy

## Executive summary

The current website is primarily a repository-oriented lander. Its strongest content explains how the website itself builds, deploys, manages DNS, and manages proxy state. The replacement must be a credible product portfolio for Tigrbl itself: what it is, what developers can build with it, how its authoring and runtime model works, which packages and protocols are available, what is stable, and how a visitor can evaluate it.

The website should optimize first for qualified developer evaluation—not enterprise lead capture. A successful visitor can identify the product category, understand the differentiated authoring model, inspect proof, run a verified example, and reach the correct docs, PyPI package, repository, or release evidence.

The central product story is:

> Define application behavior once through Tigrbl-owned operations, schemas, bindings, hooks, and engine specifications; project that behavior consistently into protocols, contracts, documentation, diagnostics, and runtime execution.

All public claims must be traceable to current package metadata, source, tests, governed documentation, or release evidence. The site must clearly distinguish the public `tigrbl` facade from lower-level distributions and distinguish stable facade releases from prereleases and individual package releases.

## 1. Product definition

### Canonical description

Tigrbl is a schema-first ASGI framework and Python package family for REST, JSON-RPC, streaming, SSE, WebSocket, and WebTransport-aware runtime planning. Its public facade provides application-facing authoring primitives for typed validation, generated contracts and documentation, lifecycle hooks, diagnostics, canonical operations, and engine-backed execution.

Tigrbl should not be presented as:

- a thin FastAPI wrapper;
- merely an ORM;
- a vague “governance platform” without concrete developer behavior;
- production-mature or enterprise-proven while published maturity remains Alpha;
- a Rust application framework unless a separately verified public Rust authoring surface is approved for promotion.

### Product architecture to communicate

Use progressive disclosure rather than exposing the package graph immediately:

1. **Author:** application developers use the public `tigrbl` facade, including apps, routers, tables, decorators, operations, schemas, hooks, bindings, and engine helpers.
2. **Describe:** application intent is captured in explicit specifications instead of repeated across routes, validation, documentation, and persistence code.
3. **Plan:** atoms and kernel layers build ordered, inspectable lifecycle and dispatch plans.
4. **Execute:** runtime layers execute those plans across request, stream, message, session, and transport-unit flows.
5. **Extend:** operation packs and engine plugins add CRUD, analytics, realtime, streaming, pub/sub, databases, caches, queues, and other backends.

### Product surfaces to review and represent

The portfolio content model must cover:

- the public facade and narrower distributions;
- canonical CRUD, bulk, analytical, realtime, stream, transfer, and datagram operation families where verified;
- REST, JSON-RPC, OpenAPI, OpenRPC, HTTP streaming, SSE, WebSocket, and WebTransport-aware planning where verified;
- tables, operations, schemas, hooks, bindings, engines, diagnostics, and runtime plans;
- package examples, reference applications, tests, conformance evidence, and release artifacts;
- governed features, profiles, claims, tests, evidence, risks, boundaries, and releases when exported for public use;
- CLI and interactive developer tooling that is genuinely supported by the current facade.

## 2. Audiences and visitor jobs

### Primary audiences

- Python application developers building typed APIs and services.
- Platform teams standardizing service authoring, runtime behavior, and documentation.
- Service owners who need REST, RPC, realtime, or streaming behavior to stay aligned.

### Secondary audiences

- Extension authors building operation packs, engines, or transport integrations.
- Framework maintainers working on narrow package boundaries.
- Technical evaluators assessing maturity, compatibility, architecture, and project health.

### Visitor profiles

| Visitor | Question the site must answer | Required proof | Primary action |
| --- | --- | --- | --- |
| Python developer | Can I build a working API quickly with the public facade? | Verified quickstart, expected output, generated REST/RPC surfaces | Copy install command / Get started |
| Platform lead | Can this standardize contracts and runtime behavior? | Architecture model, lifecycle diagram, capability matrix | Read How it works / inspect source |
| Extension author | Where do operations, engines, and transports belong? | Package map, extension points, maturity and ownership | Explore Ecosystem / contributing docs |
| Technical evaluator | Is this real, current, and suitable for evaluation? | Release, maturity, Python support, license, security and evidence links | Review Releases / evaluation guide |
| Existing user | What changed and what is canonical now? | Facade-filtered releases, migration notes, verified docs | Release detail / docs |

These profiles prioritize content. They must not invent company sizes, industries, procurement requirements, or adoption patterns without supporting research.

## 3. Positioning and message hierarchy

### Positioning

Position Tigrbl as a schema-first, multi-protocol Python application framework with an explicit runtime model. Emphasize:

- one operation model projected across multiple protocols;
- generated contracts and documentation aligned with runtime behavior;
- visible lifecycle hooks and inspectable execution plans;
- declarative engine and transaction binding;
- a stable application facade over a modular package family.

### Homepage direction

Eyebrow: `Schema-first ASGI framework for Python`

Headline direction: `Define your API once. Run it across every protocol.`

Supporting direction: `Tigrbl keeps operations, validation, generated docs, lifecycle hooks, and engine-backed execution aligned across REST, JSON-RPC, streaming, SSE, WebSocket, and WebTransport-aware runtimes.`

Primary CTA: `Get started`  
Secondary CTA: `Read the docs`  
Utility action: copy `pip install tigrbl`

This is message direction, not final copy. Every protocol and behavior named in final copy must be verified against the promoted version and evidence source.

### Proof before persuasion

Prefer:

- current PyPI facade version and release date;
- supported Python versions;
- license and published maturity;
- tested examples and expected outputs;
- concrete protocol, operation, and engine capability records;
- links to source, docs, issues, security policy, and release evidence.

Avoid unsupported terms such as “fastest,” “production-ready,” “enterprise-grade,” “zero drift,” or “build any API.” Do not publish customer logos, adoption numbers, testimonials, SLAs, or roadmap promises without approval and evidence.

## 4. Release and trust baseline

The following was verified on **2026-07-11** and is a historical snapshot, not a claim of current status on 2026-11-05:

- latest stable facade release observed: `tigrbl 0.4.4`, published 2026-06-27;
- prereleases `0.4.5.dev1` and `0.4.5.dev4` were also listed and were not the recommended stable target;
- Python range observed: `>=3.10,<3.15`;
- maturity classifier observed: Alpha;
- license observed: Apache-2.0;
- facade extras observed: `postgres`, `servers`, `templates`, and `tests`.

Before implementation or publication, regenerate this snapshot from PyPI and verify it against the upstream repository. PyPI is authoritative for the current installable facade. GitHub’s release stream includes automated releases for many packages, so the newest repository release must never be labeled “latest Tigrbl” unless it is filtered to the `tigrbl` facade.

Required release-data behavior:

- fetch and normalize facade metadata during a controlled update/build step;
- filter stable versus PEP 440 prerelease versions;
- keep a checked-in last-known-good snapshot so builds do not require network access;
- show a visible `verifiedAt` date;
- distinguish facade, framework-layer, operation-pack, engine, and support-package releases;
- fail clearly on malformed or expired data instead of silently claiming stale data is current.

## 5. Information architecture

### Global navigation

- Product
- How it works
- Examples
- Ecosystem
- Releases
- Docs (external)
- GitHub (external)

Persistent primary action: **Get started**.

### Home

Required sections:

1. Category-level hero, explanation, install command, Docs and GitHub actions.
2. “Define once, project everywhere” protocol visualization.
3. Minimal verified example using public facade imports only.
4. Value pillars: aligned contracts, multi-protocol operations, explicit lifecycle/runtime, declarative engines.
5. Author → Describe → Plan → Execute explanation.
6. Capability matrix for protocols, docs, hooks, diagnostics, operations, and engines.
7. Trust strip: stable version, verification date, Python support, license, maturity, repository.
8. Final Get started CTA.

### Product / How it works

Show one real operation flowing through authoring, canonical resolution, REST and JSON-RPC projection, generated schemas/docs, hooks, planning, and runtime execution. Include both table-backed canonical operations and a custom non-persistence operation. State clearly that application developers normally import through the facade.

### Examples and demos

Provide a curated, versioned gallery rather than exposing all repository examples equally. Each example requires:

- audience and use case;
- difficulty;
- protocol and engine requirements;
- facade/package version scope;
- tested status and verification date;
- source link;
- run instructions and expected output;
- named maintenance owner.

Initial gallery:

- minimal health/hello operation;
- table-backed CRUD projected to REST and JSON-RPC;
- custom non-persistence operation;
- lifecycle hook example;
- one verified engine-backed example;
- one realtime or streaming example only when the stable public path is executable and documented.

Do not imply a hosted sandbox exists. Phase one should use deterministic walkthroughs, recorded request/response fixtures, or locally runnable examples. An in-browser runner requires separate ownership for isolation, abuse protection, operating cost, observability, and updates.

### Interactive tooling

Prioritize small tools that improve comprehension:

1. Accessible copyable install/run commands.
2. Protocol projector: one operation → REST route, JSON-RPC method, generated contract, lifecycle plan.
3. Example explorer filtered by protocol, operation family, engine, and difficulty.
4. Package explorer grouped by developer task and maturity.
5. Release explorer separating facade/package and stable/prerelease records.
6. Evidence links from every capability and factual claim.

Interactive elements need no-JavaScript or static explanatory fallbacks. Do not build a decorative pseudo-IDE.

### Ecosystem

Group packages by task:

- Public facade
- Framework layers
- Operation packs
- Engine plugins
- Client, typing, testing, examples, and tooling

Each item needs package name, purpose, intended audience, availability/maturity where known, install command, source link, PyPI link, documentation link, and verification date. Do not imply all packages have equal support or are normal application dependencies.

### Releases

Show the stable facade first, then recent stable facade releases. Exclude prereleases by default but make them discoverable with clear labels. Put individual engine and framework-package releases in a separate filtered view. Link to PyPI history/files and relevant GitHub evidence.

### Get started

Include prerequisites, `uv` and `pip` installation, a verified public-facade example, run/verify instructions, expected result, troubleshooting, and links to deeper docs. Do not use lower-layer imports in the primary path.

### Community / Project

Link to GitHub, issues, contributing guidance, security policy, license, and verified community channels. Do not invent response times, support commitments, community size, or commercial services.

### Existing site content

The current `/proof/` page and repository-publication articles explain this website’s build, Docker, DNS, and proxy lane. Remove these from primary product navigation. Retain operational detail in repository documentation unless a deliberate transparency story and audience demand justify publication.

## 6. Feature, profile, claim, and proof governance

Marketing copy must not become a second source of product truth.

### Typed records

- **Feature:** supported capability with audience value, owner, maturity, version scope, protocols/engines, source/docs links, and verification date.
- **Claim:** publishable statement derived from features, with allowed contexts, evidence, reviewer, approval status, version scope, and reverification/expiry date.
- **Proof item:** executable example/test, package metadata, generated contract, release artifact, security policy, conformance record, or governed evidence.
- **Profile:** a grouping of verified features for a visitor task or evaluation path; it cannot manufacture new certification or maturity.

Only approved, in-scope claims may render publicly. Stale, draft, superseded, unverified, or failed evidence must fail content validation or render an explicit non-promotional state.

Repository SSOT records may inform the public site, but the frontend should consume a reviewed export or checked-in snapshot. Do not parse internal governance files at runtime. Public records should include safe source URLs and omit internal-only notes, paths, and identifiers.

## 7. UX/UI requirements

### Experience principles

- Technical, direct, and inspectable.
- Value first, mechanism second, package detail third.
- Code, diagrams, and evidence are primary content.
- Every important capability leads to source, docs, test, example, package, or release evidence.
- Preserve the dark brand foundation while adding clear hierarchy, accessible accent color, and readable typography.

### Required components

- Responsive header with active state and accessible mobile navigation.
- Install-command component with copy feedback announced to assistive technology.
- Syntax-highlighted code with language labels and copy control.
- Protocol-projection diagram with static text equivalent.
- Capability matrix with usable mobile layout.
- Version/status group with source and last-verified date.
- Example and package filters with empty states and shareable URLs.
- Release list with stable/prerelease and facade/package distinctions.
- Consistent external-link treatment.
- Stale, unavailable, loading, and validation-error states.

### Design system

Define color, typography, spacing, grids, radii, borders, elevation, icons, code tokens, status colors, and interactive states. Use Aldrich only as a restrained display accent if readability testing supports it. Use a proper monospace typeface for code. Respect `prefers-reduced-motion`; every explanatory animation needs a no-motion equivalent.

### Accessibility and responsiveness

- Target WCAG 2.2 AA.
- Full keyboard operation and visible focus.
- Correct landmarks, headings, labels, and announcements.
- Practical 44×44 CSS-pixel touch targets.
- Text contrast ≥4.5:1; large text and meaningful graphics ≥3:1.
- No page-level horizontal scrolling at 320 CSS pixels.
- Deliberate contained overflow for code/tables where unavoidable.
- Test 320, 375, 768, 1024, and 1440 CSS-pixel widths.
- Support current evergreen desktop/mobile browsers and Safari.
- Never encode stable/prerelease, maturity, or proof status by color alone.

## 8. Frontend engineering requirements

### Preserve the delivery contract

The repository currently uses React, TypeScript, Vite, a typed local content pack, static generation, Docker/nginx deployment, and repository-owned deployment configuration. Preserve:

- deterministic `npm ci`;
- passing `npm run check` and `npm run build` gates;
- static output compatible with nginx;
- deep-link output for every public route;
- repository-owned sitemap, robots, metadata, structured data, Docker, DNS, and proxy configuration as applicable to the current repository state;
- safe content editing by non-engineers.

### Architecture

- Replace manual `window.location.pathname` matching with a small explicit router or build-time page registry.
- Provide real 404 handling, canonical URLs, active navigation, and reliable static generation.
- Keep copy, pages, metadata, packages, releases, examples, features, claims, profiles, and proof in typed content structures.
- Add build-time schema validation and cross-record reference validation.
- Do not hard-code factual claims in components.
- Enforce UTF-8 and reject mojibake in content checks.

### SEO and discovery

Each indexable route requires a unique title, description, canonical URL, Open Graph/Twitter metadata, and social image. Generate sitemap and robots data from the page registry. Use accurate JSON-LD such as `Organization`, `WebSite`, `SoftwareApplication`/`SoftwareSourceCode`, `TechArticle`, and `BreadcrumbList`. Do not invent ratings, pricing, customers, or unsupported attributes. Generate `llms.txt` from the same verified content records; it is not an independent claim store.

### Performance and security

- Target Core Web Vitals “good” thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile.
- Target initial JavaScript ≤150 kB gzip unless measured interaction needs justify more.
- Dimension and optimize images; prefer the existing SVG brand assets.
- Self-host fonts or use system fallbacks.
- Avoid third-party tracking in the initial release.
- Do not render unsanitized runtime HTML.
- Use safe external-link behavior.
- Add and test CSP, `X-Content-Type-Options`, `Referrer-Policy`, and frame restrictions in nginx.

### Testing and definition of done

- Typecheck and content/schema validation.
- Unit tests for version filtering, route normalization, content references, claim eligibility, and copy controls.
- Integration checks for every route and external link shape.
- Automated accessibility plus manual keyboard and screen-reader spot checks.
- Responsive visual regression for core page templates.
- Broken-link scan over generated output.
- Execute displayed install and code examples against the displayed stable facade.
- Record performance evidence for key templates.
- Pass build, Docker build, static deep links, and current proxy/deployment validation before release.

## 9. Stakeholder requirements

### Technical Marketing

Own positioning, audience prioritization, technical comparison framing, launch/distribution, and measurement. Compare Tigrbl with the work of assembling lower-level frameworks, validation, ORM, protocol handlers, docs, hooks, and runtime conventions—not an unsupported feature war.

Deliver:

- audience/message matrix;
- evidence-backed capability and alternatives matrix;
- channel plan spanning website, PyPI, GitHub, docs, technical communities, and owned content;
- event taxonomy for install-copy, docs, source, PyPI, examples, releases, and community actions;
- baseline measurement plan before setting percentage targets.

### Developer Relations

Own the shortest credible journey from discovery to a successful local evaluation. Curate and verify public-facade examples, demos, tutorials, workshops, and maintainer feedback loops.

Deliver:

- versioned learning path from quickstart through extension authoring;
- executable example repositories/fixtures with pinned dependencies and expected output;
- example-quality rubric and maintenance ownership;
- tutorial, workshop, livestream, and community distribution plan;
- feedback taxonomy for docs, API, onboarding, and example friction;
- release checklist that revalidates learning assets when the facade changes.

### Sales and Account Management

Own technical-evaluation support and honest expectation setting. The site must provide a shareable path through category, use cases, maturity, compatibility, security/release evidence, source, and documentation. Until commercial packaging exists, do not imply paid plans, procurement readiness, SLAs, customer proof, deployment guarantees, or roadmap commitments.

Deliver:

- evaluator one-pager assembled from approved claims;
- discovery-question guide for protocols, engines, lifecycle needs, maturity tolerance, and proof requirements;
- maintainer-reviewed objection/answer library;
- technical evaluation checklist and follow-up links;
- gap log for requested capabilities, integrations, proof, security, and commercial requirements;
- account feedback that separates validated demand from anecdotes.

### GTM Strategy

Own audience sequencing, channel roles, conversion definitions, launch stages, and learning agenda. The initial motion optimizes for qualified developer evaluation. Commercial conversion should be introduced only when an offer, owner, and response process exist.

Deliver:

- ICP and audience hypotheses explicitly marked as assumptions until validated;
- developer, platform lead, extension author, and evaluator journeys;
- channel architecture for the site, docs, GitHub, PyPI, community, and follow-up;
- launch stages with entry/exit criteria for foundation, developer activation, ecosystem proof, and commercial evaluation;
- metrics for qualified visits, install copies, docs/source progression, example completion, return visits, and evaluation requests;
- recurring evidence review that promotes, revises, or retires hypotheses.

### Copywriter

Own concise, technically accurate page copy with maintainer review. Lead with developer outcomes, then explain the mechanism. Define specialist terms on first use. Use terminology consistently: schema-first ASGI framework, operation, public facade, generated contracts/docs, lifecycle hooks, runtime plans, and engine plugins.

Deliver:

- final copy and metadata for every route;
- CTA and microcopy for copy success, errors, empty states, prereleases, and stale data;
- terminology and glossary sheet;
- claims ledger linking factual statements to evidence and verification dates;
- social-card copy and release-detail template.

Avoid inward-facing phrases such as “repository surface,” “publication lane,” DNS ownership, and site build commands on product pages. Avoid unexplained “governed primitives.”

## 10. Delivery instructions

### Frontend engineer

Own the typed page/content model, page registry, components, release snapshot/update mechanism, interactive tools, accessibility behavior, SEO output, performance, security headers, and automated checks.

Deliver:

- architecture note and route map;
- typed content schemas and validation rules;
- responsive component implementation;
- release and claims snapshot/update jobs;
- test suite and release checklist;
- editor guide for content contributors.

### UI/UX designer

Own journey design, information hierarchy, responsive layouts, component states, diagrams, filtering interactions, and design-system specification. Use realistic copy and code—never lorem ipsum—for comprehension tests.

Deliver:

- sitemap and primary flows;
- content-first wireframes;
- high-fidelity mobile and desktop templates for Home, How it works, Examples, Ecosystem, Releases, and Get started;
- component/state library and tokens;
- accessible diagram specifications;
- annotated handoff covering focus order, overflow, motion, loading, empty, error, and stale-data states.

Validate that a Python developer can explain Tigrbl and find a credible next step after a five-second scan and two-minute exploration.

### Copywriter

Work in the typed content model rather than supplying disconnected documents. Each factual statement must carry an evidence source, version scope where relevant, reviewer, and verification date. Coordinate code examples with DevRel and frontend engineering so displayed copy and executable behavior remain synchronized.

## 11. Cross-functional workflow

1. Technical Marketing, GTM Strategy, and a framework maintainer lock initial audience hypotheses, positioning, conversion definitions, and claims policy.
2. Developer Relations inventories and verifies examples, demos, documentation paths, and community entry points.
3. Sales/Account Management contributes evaluator questions and objections while separating observed demand from assumptions.
4. Copy and UX create content-first outlines and journeys.
5. UX tests comprehension with realistic copy, code, diagrams, and proof.
6. Engineering validates examples, capabilities, claims, routes, and data sources before high-fidelity implementation is locked.
7. Design and engineering agree on responsive behavior, accessibility, fallbacks, and stale/error handling.
8. Copy receives technical and claims-ledger review against the promoted facade.
9. GTM and Technical Marketing derive channel assets only from approved content; DevRel validates learning paths; Sales validates evaluation usability.
10. The team runs acceptance checks, records evidence, assigns owners, and removes or qualifies unresolved claims before publication.

### Decisions requiring explicit approval

- Where Alpha status appears in the primary journey.
- Whether the current docs site is ready to be a primary CTA.
- Whether any Rust surface is public and stable enough to promote.
- Which engine and operation packages are supported/promoted versus merely published.
- Which community channels are active and maintained.
- Whether a hosted demo or code runner has an owner and security/operations plan.
- Whether a commercial evaluation or contact CTA exists and who responds.

## 12. Acceptance criteria

The portfolio is ready when:

- a Python developer can identify the category, differentiator, supported surfaces, maturity, and next step without reading repository internals;
- all public claims trace to current PyPI metadata, source, tests, governed docs, or reviewed evidence;
- the recommended install path and displayed examples execute against the displayed stable facade;
- stable facade releases cannot be confused with prereleases or individual packages;
- examples, packages, profiles, features, and claims display version scope and verification status where relevant;
- primary pages meet responsive, keyboard, contrast, semantic, and reduced-motion requirements;
- every indexable route has validated metadata, canonical URL, structured data, and static output;
- release data has a maintained update path, checked-in fallback, and visible verification date;
- no unsupported customer, performance, maturity, security, support, or production-readiness claims remain;
- existing build, static generation, Docker, and current delivery validation workflows pass.

## 13. Sources and evidence reviewed

- Upstream workspace: <https://github.com/tigrbl/tigrbl>
- GitHub releases: <https://github.com/tigrbl/tigrbl/releases>
- PyPI facade package: <https://pypi.org/project/tigrbl/>
- Website source: `src/App.tsx`, `src/styles.css`, `packages/site-content-pack/src/index.ts`
- Website delivery/configuration: `package.json`, `site.manifest.json`, Docker/nginx files, static-generation scripts, workflows, and repository deployment configuration

Time-sensitive facts must be reverified before implementation and publication. Product capability claims should ultimately cite package-local documentation, source, tests, or executable examples—not this brief alone.
