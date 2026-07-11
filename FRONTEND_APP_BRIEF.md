# Tigrbl Frontend Application Brief

Status: implementation brief
Audience: frontend engineering, UI/UX design, copywriting, technical marketing, Developer Relations, Sales/Account Management, and GTM Strategy
Prepared: 2026-07-11
Target repository: `tigrbl/tigrbl-com`

## 1. Objective

Replace the current repository-centric lander with a credible product website for Tigrbl: a schema-first ASGI framework and Python package family for defining an operation once and projecting it across protocols, validation, generated documentation, lifecycle hooks, diagnostics, and engine-backed execution.

The site must help a technical visitor answer, in order:

1. What is Tigrbl?
2. Why would I use it instead of assembling lower-level components directly?
3. Can it support my protocol, persistence, and runtime needs?
4. What does authoring with it look like?
5. Is it real, current, and trustworthy?
6. How do I install it, read the docs, or participate?

The primary conversion is a qualified developer beginning evaluation: copy the install command, open the documentation, or visit the GitHub repository. The site is not an enterprise lead-generation funnel in this phase.

## 2. Source-backed product definition

### Canonical definition

Tigrbl is a schema-first ASGI framework for Python. Its public `tigrbl` facade gives application developers one authoring surface for REST, JSON-RPC, HTTP streaming, SSE, WebSocket, and WebTransport-aware runtime planning, together with OpenAPI, OpenRPC, typed validation, hooks, diagnostics, and engine plugins.

The core product idea is not merely “another Python web framework.” Application intent is expressed once through Tigrbl-owned tables, operations, schemas, bindings, handlers, hooks, and engine specifications. The framework compiles that intent into reviewable plans and projects it consistently into transport, documentation, validation, and execution surfaces.

### Product architecture to communicate

Use a progressive model rather than presenting the package graph all at once:

- **Author:** applications use the stable `tigrbl` facade, including `TigrblApp`, `TigrblRouter`, decorators, table helpers, operation specs, schema helpers, hooks, bindings, and engine helpers.
- **Describe:** schema and operation intent is captured in explicit specs rather than duplicated across routes, validation models, documentation, and persistence code.
- **Plan:** atoms and the kernel create ordered, inspectable lifecycle and dispatch plans.
- **Execute:** runtime packages execute those plans across request, stream, message, session, and transport-unit flows.
- **Extend:** operation packs and engine plugins provide canonical CRUD, analytics, realtime, streaming, pub/sub, WebTransport control-plane behavior, persistence, cache, queues, rate controls, and other integrations.

Detailed package boundaries belong on an Architecture or Ecosystem page, not in the home-page hero.

### Audience

Primary:

- Python application developers building typed APIs and services.
- Platform teams standardizing service authoring, runtime behavior, and documentation.
- Service owners who need REST, RPC, realtime, or streaming behavior to remain aligned.

Secondary:

- Extension authors building operation packs or engine integrations.
- Framework maintainers who need narrow, testable package boundaries.

### Visitor profiles and jobs to be done

The site should adapt its evidence path to visitor intent without splitting into disconnected microsites:

| Visitor profile | Question to answer | Required proof | Primary next action |
| --- | --- | --- | --- |
| Python application developer | Can I build a real API quickly with the public facade? | Runnable quickstart, generated REST/RPC surfaces, typed schemas | Copy install command / open Get started |
| Platform or architecture lead | Can this standardize contracts and runtime behavior across services? | Author → plan → execute model, lifecycle diagram, protocol/capability matrix | Read How it works / inspect source |
| Framework or extension author | Where do new operations, engines, or transports belong? | Package map, extension points, maturity and ownership labels | Open Ecosystem / contributing docs |
| Technical evaluator or buyer | Is the project credible, current, and suitable for evaluation? | Stable release, Alpha status, Python support, license, security and release evidence | Review releases / start technical evaluation |
| Existing user | What changed, and where is the canonical documentation? | Facade-filtered release history, migration notes when available, verified docs links | Open release detail / docs |

Profiles are navigation and content-prioritization aids, not unsupported personas. Do not invent company sizes, industries, procurement needs, or adoption patterns without research.

### Positioning

Position Tigrbl as a schema-first, multi-protocol application framework with an explicit runtime model. Emphasize:

- one operation model projected across multiple protocols;
- generated contracts and documentation that stay aligned with runtime behavior;
- visible lifecycle hooks and reviewable execution plans;
- declarative engine and transaction binding;
- a stable application-facing facade over a modular package family.

Do not position Tigrbl as:

- a thin FastAPI wrapper;
- a database ORM;
- a generic “governance platform” without explaining the concrete framework behavior;
- production-mature or enterprise-proven while its published classifier remains **Alpha**;
- a Rust framework. The upstream repository description mentions a Python and Rust workspace in one location, but the current public package and authoring contract are Python-first; any Rust claim requires a separately verified public surface.

## 3. Release and trust baseline

As verified on 2026-07-11:

- Latest stable PyPI release: `tigrbl 0.4.4`, published 2026-06-27.
- PyPI also lists `0.4.5.dev1` and `0.4.5.dev4` prereleases from 2026-06-27; these are not the recommended install target.
- Supported Python range: `>=3.10,<3.15` (3.10 through 3.14).
- Project status classifier: Alpha.
- License: Apache-2.0.
- Stable install: `pip install tigrbl` or `uv add tigrbl`.
- Optional extras currently exposed by the facade: `postgres`, `servers`, `templates`, and `tests`.
- The public facade is backed by split core, base, concrete, atoms, kernel, runtime, ORM, operation-pack, client, typing, test, and engine distributions.

The GitHub release stream contains automated, per-package releases as well as facade releases. The frontend must distinguish the **recommended facade release** from individual plugin/package releases. Do not present the newest repository release entry as “latest Tigrbl” without filtering by package.

There is documented version drift today: the upstream repository README says the current package line is `0.4.1`, while PyPI shows `0.4.4`. PyPI is the authority for the current installable facade version. Any version shown on the site must come from a single structured content source with an owner and update path; a build-time PyPI lookup with a checked-in fallback is preferred.

## 4. Information architecture

### Global navigation

- Product
- How it works
- Ecosystem
- Releases
- Docs (external)
- GitHub (external)

Persistent primary action: **Get started**. On desktop it opens the getting-started page; on compact layouts it remains visible in the navigation menu. A copyable `pip install tigrbl` control may appear beside it in the hero.

### Required pages

#### Home

Purpose: establish the category, differentiated model, proof, and next action within one scan.

Required sections:

1. Hero with category-level headline, one-sentence explanation, install command, Docs and GitHub actions.
2. “Define once, project everywhere” protocol visualization.
3. Minimal working example using the public facade only.
4. Three-to-four value pillars: aligned contracts, multi-protocol operations, explicit lifecycle/runtime, declarative engines.
5. How it works: Author → Describe → Plan → Execute.
6. Capability matrix for protocols, generated docs, hooks, diagnostics, and engines.
7. Trust strip: current stable version, Python support, license, development status, repository link.
8. Final get-started call to action.

#### Product / How it works

Explain the authoring model with a real operation flowing to REST, JSON-RPC, generated schemas/docs, hooks, and runtime execution. Include table-backed canonical operations and custom non-persistence operations. Make clear that application developers normally import from the facade.

#### Ecosystem

Present the package family in task-oriented groups, not as an undifferentiated package dump:

- Public facade
- Framework layers
- Operation packs
- Engine plugins
- Client, typing, testing, and examples

Each item needs package name, purpose, maturity/availability when known, install command, and canonical source/PyPI link. Do not imply every repository package is equally supported for application developers.

#### Releases

Show the current stable facade release first, then recent stable facade versions. Prereleases must be visibly labeled and excluded by default. Provide links to PyPI files/history and GitHub release evidence. Individual engine/package releases may appear in a separate filtered view.

#### Get started

Include prerequisites, `uv` and `pip` commands, a minimal public-facade example, run/verify instructions that have been tested against the current stable release, and links to deeper documentation. Avoid lower-layer imports in the primary path.

#### Examples and demos

Create a curated, versioned gallery rather than exposing every repository example equally. Each entry needs an audience, use case, difficulty, protocol, engine, package/version scope, tested status, source link, and expected output. The first release should include:

- a minimal health or hello operation using only the public facade;
- a table-backed CRUD example showing generated REST and JSON-RPC behavior from one model;
- a custom non-persistence operation;
- a lifecycle-hook example;
- one engine-backed example whose dependency and maturity are explicit;
- one realtime or streaming example only if the current stable facade path is executable and documented.

Demos must never imply a hosted production sandbox unless one exists and has an owner, abuse controls, uptime expectations, and a maintenance plan. Prefer deterministic browser-side walkthroughs, recorded request/response fixtures, or locally runnable repositories for the initial release.

#### Interactive tooling

Interactive elements should teach the authoring model and help evaluation, not imitate a full IDE. Prioritize:

1. Copyable install and run commands with accessible success/error feedback.
2. A protocol projector that pairs one operation definition with its REST route, JSON-RPC method, generated contract, and lifecycle plan.
3. An example explorer filterable by protocol, operation family, engine, and difficulty.
4. A release/package explorer that clearly separates the `tigrbl` facade from split distributions and stable versions from prereleases.
5. Deep links from every capability or claim to its code, docs, test, PyPI, or governed evidence source.

Do not add an in-browser code runner in phase one. Reconsider it only after examples are stable, sandbox security and operating cost are owned, and telemetry shows that static walkthroughs do not satisfy evaluation needs.

#### Community / Project

Link to GitHub, issues, contributing guidance, security policy, license, and Discord if the invite is verified at publication time. Do not invent support SLAs, adoption claims, testimonials, customers, or community size.

### Existing editorial pages

The current `/proof/` page and two repository-publication articles focus on how `tigrbl.com` itself builds, deploys, manages DNS, and manages proxy state. That material is operator documentation, not a buyer/developer product narrative. Remove it from primary navigation. Retain useful deployment detail in the site repository README or an internal operations document; only publish it if there is a deliberate transparency story and demonstrated audience demand.

## 5. Homepage content direction

### Recommended message hierarchy

Eyebrow: `Schema-first ASGI framework for Python`

Headline direction: `Define your API once. Run it across every protocol.`

Supporting copy direction: `Tigrbl keeps operations, validation, generated docs, lifecycle hooks, and engine-backed execution aligned across REST, JSON-RPC, streaming, SSE, WebSocket, and WebTransport-aware runtimes.`

Primary CTA: `Get started`
Secondary CTA: `Read the docs`
Utility action: copy `pip install tigrbl`

This is a direction, not locked final copy. Final language must be checked against current package behavior and tested for comprehension with Python API developers.

### Minimum credible code example

Use public facade imports and keep the first example short:

```python
from tigrbl import TigrblApp, get

app = TigrblApp()

@get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
```

Before publication, engineering must execute the exact displayed example against the pinned stable release. Do not use illustrative APIs that merely look plausible.

### Proof before persuasion

Prefer verifiable proof:

- current PyPI version and release date;
- supported Python versions;
- Apache-2.0 license;
- linked repository, docs, issue tracker, security policy, and release history;
- tested code samples;
- concrete protocol and package capability tables derived from source.

Avoid unsupported superiority claims such as “fastest,” “production-ready,” “enterprise-grade,” “zero drift,” or “build any API.”

## 6. UI/UX requirements

### Experience principles

- Technical, direct, and inspectable; never vague or cyberpunk for its own sake.
- Progressive disclosure: value first, mechanism second, package detail third.
- Code and diagrams are primary content, not decoration.
- Every capability claim should lead to evidence: example, docs, source, release, or package.
- The dark brand can remain, but legibility and hierarchy must replace the current near-monochrome sameness.

### Key components

- Responsive global header with current-page state and accessible mobile navigation.
- Copyable install command with success feedback announced to assistive technology.
- Syntax-highlighted code blocks with language labels and copy controls.
- Protocol projection diagram that remains understandable as text/list without animation.
- Capability matrix that collapses cleanly on mobile.
- Version/status badge group with source links and “last verified” date.
- Package cards with filters for framework, operations, and engines.
- Release list with stable/prerelease and facade/package distinctions.
- Clear external-link treatment for Docs, GitHub, PyPI, and Discord.

### Visual direction

Retain the existing Tigrbl logo assets and dark foundation. Introduce a restrained accent color for actions, focus, and information hierarchy; do not rely on white/gray alone. Use a highly legible UI sans for prose and a proper monospace family for code. The existing Aldrich-led typography may remain as a limited display accent only if readability testing supports it.

The design system must define color, typography, spacing, radii, borders, elevation, icon rules, code tokens, data/status colors, hover/focus/pressed/disabled states, and responsive behavior. Respect `prefers-reduced-motion` and provide a no-motion equivalent for all explanatory animation.

### Accessibility and responsive acceptance criteria

- Target WCAG 2.2 AA.
- Full keyboard operation and visible focus states.
- Semantic landmarks and heading order.
- Minimum 44×44 CSS-pixel touch targets where practical.
- Text contrast at least 4.5:1; large text at least 3:1; meaningful UI graphics at least 3:1.
- No horizontal page scrolling at 320 CSS pixels; tables/code use deliberate contained overflow where unavoidable.
- Support current evergreen desktop/mobile browsers and Safari.
- Test at 320, 375, 768, 1024, and 1440 CSS pixels.
- Do not encode stable/prerelease status by color alone.

## 7. Frontend engineering requirements

### Preserve the current delivery contract

The repository currently uses React 19, TypeScript 5.8, Vite 6, a typed local content pack, static generation, Docker/nginx deployment, and desired-state DNS/proxy workflows. The implementation may evolve the UI architecture but must preserve:

- deterministic `npm ci` installation;
- `npm run check` and `npm run build` as passing quality gates;
- static output compatible with the existing nginx container;
- deep-link generation for every public route;
- repository-owned sitemap, robots, metadata, structured data, Docker, DNS, and proxy artifacts;
- content separation sufficient for non-engineers to edit product copy safely.

### Routing and rendering

The current application matches `window.location.pathname` manually and serves plain anchors. Replace this with a small, explicit route system or a build-time page registry that provides 404 handling, canonical URLs, active navigation state, and reliable static generation. Avoid adding a large framework solely for routing unless the SEO/rendering benefit is demonstrated.

### Content and release data

- Keep copy, navigation, metadata, capability records, packages, releases, and code samples in typed content structures.
- Add schema validation for content at build time.
- Model factual claims with `sourceUrl`, `verifiedAt`, and optional `versionScope` fields.
- Generate release data from PyPI's public project metadata at build/update time, filtering for the `tigrbl` facade and stable PEP 440 versions.
- Commit a last-known-good release snapshot so builds do not depend on network availability.
- Fail clearly on malformed data; do not silently show stale version labels as current.
- Fix the existing mojibake apostrophes (`Tigrblâ€™s`, `siteâ€™s`) and enforce UTF-8.

### Features, claims, profiles, and proof data

Treat features and marketing claims as separate typed records:

- A **feature** describes a supported capability and includes audience value, package owner, maturity, version scope, protocols/engines, docs/source links, and last verification date.
- A **claim** is publishable language derived from one or more features and includes claim text, allowed contexts, evidence links, reviewer, approval status, version scope, and expiry/reverification date.
- A **proof item** is concrete evidence: an executable test/example, package metadata, generated docs, release artifact, security policy, or governed SSOT evidence.
- A **profile** groups verified features for a visitor task or evaluation path; it must not create new product truth or imply certification that the underlying evidence does not support.

Only approved claims may render on public pages. Missing, stale, draft, superseded, or failed evidence must fail the content check or render a deliberate non-promotional state; it must not silently appear as current. Repository SSOT claims and profiles may inform the site, but the frontend should consume a reviewed export or content snapshot rather than parsing internal governance structures at runtime.

### SEO and discovery

Every indexable page requires a unique title, meta description, canonical URL, Open Graph/Twitter metadata, and social image. Generate sitemap and robots files from the page registry. Use appropriate JSON-LD (`Organization`, `WebSite`, `SoftwareApplication` or `SoftwareSourceCode`, `TechArticle`, `BreadcrumbList`) without inventing ratings, pricing, or unsupported attributes. Maintain `llms.txt` only from the same verified content source; it must not become a separate claim store.

### Performance and security budgets

- Aim for Core Web Vitals “good” thresholds at the 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- Initial page JavaScript target: ≤150 kB gzip unless measured interaction needs justify more.
- Optimize and dimension images; prefer existing SVG brand assets where appropriate.
- Self-host fonts or use system fallbacks; avoid render-blocking third-party font calls.
- Avoid third-party trackers in the initial release. If analytics is later approved, use privacy-conscious, consent-appropriate instrumentation with a documented event taxonomy.
- No runtime HTML injection for content. Sanitize any future Markdown/HTML pipeline.
- External links opened in a new tab must use safe `rel` attributes and disclose the behavior accessibly.
- Add security headers in nginx, including a tested Content Security Policy, `X-Content-Type-Options`, `Referrer-Policy`, and frame restrictions.

### Testing and definition of done

- Typecheck and content schema validation.
- Unit tests for version filtering, path normalization, content rendering, and copy/install controls.
- Integration tests for every route and external-link target shape.
- Automated accessibility checks plus keyboard and screen-reader spot checks.
- Responsive visual regression coverage for home, product, ecosystem, releases, and get-started pages.
- Broken-link scan over generated output.
- Execute all displayed code/install examples against the declared stable version.
- Lighthouse/Pagespeed evidence recorded for key templates.
- `npm run check`, `npm run build`, Docker build, proxy validation, and static deep links pass before release.

## 8. Role-specific instructions

### Frontend engineer

Own the typed page/content model, route/static-generation architecture, component implementation, live-with-fallback release data, accessibility behavior, SEO outputs, performance budgets, security headers, and automated checks. Treat PyPI as the facade-version authority and GitHub/source docs as capability evidence. Preserve current deployment and operator commands. Do not hard-code product claims inside components.

Deliver:

- implementation architecture note;
- route map and typed content schema;
- component inventory;
- responsive application;
- PyPI snapshot/update mechanism;
- test suite and release checklist;
- short editor guide for content contributors.

### UI/UX designer

Own the visitor journey, information hierarchy, interaction patterns, responsive layouts, accessible component states, protocol/architecture visualizations, and design-system specification. Prototype the home, product, ecosystem, release, and getting-started templates at mobile and desktop widths. Validate whether a Python developer can correctly explain Tigrbl and find a next step after a five-second scan and a two-minute exploration.

Deliver:

- sitemap and primary user flows;
- low-fidelity content-first wireframes;
- high-fidelity responsive templates;
- component/state library and tokens;
- accessible diagram specifications;
- annotated handoff covering behavior, focus order, overflow, motion, and empty/error/stale-data states.

### Technical marketer

Own positioning, audience prioritization, competitive context, conversion paths, launch/distribution plan, and measurement. Frame alternatives as assembling FastAPI/Starlette, Pydantic, SQLAlchemy, protocol-specific handlers, docs generation, hooks, and runtime conventions—not as an unsupported feature-war. Identify where Tigrbl genuinely reduces duplicated contracts and operational ambiguity. Keep alpha maturity visible and turn it into an honest early-adopter invitation rather than hiding it.

Deliver:

- positioning and messaging matrix by audience;
- evidence-backed capability/alternative matrix;
- launch-channel plan for PyPI, GitHub, documentation, technical communities, and owned content;
- event taxonomy for install-copy, docs, GitHub, PyPI, release, and community actions;
- baseline and 30/60/90-day targets after analytics and traffic baselines exist.

Do not set arbitrary performance percentages before baseline data is collected.

### Developer Relations

Own the shortest credible path from discovery to a successful local evaluation. Curate examples from the upstream repository, validate public-facade usage, identify documentation gaps, and turn maintainer knowledge into tutorials, demos, workshops, and community feedback loops. DevRel should not promote every package equally or publish examples that bypass the recommended authoring model.

Deliver:

- a versioned quickstart and example curriculum from beginner through extension-author paths;
- executable demo repositories or fixtures with pinned dependencies and expected outputs;
- an example-quality rubric covering facade imports, accuracy, accessibility, maintenance owner, and verification date;
- tutorial, livestream, workshop, and technical-community distribution plans;
- a feedback taxonomy that routes documentation, API, example, and onboarding friction to maintainers;
- a release enablement checklist that updates examples and learning assets when the stable facade changes.

### Sales and Account Management

Own technical-evaluation support and expectation setting, not unverified enterprise positioning. The site must give this team a shareable, accurate evaluation path: category, supported use cases, current maturity, compatibility, security/reporting links, release status, and clear routes to source and documentation. Until commercial packaging exists, do not imply paid tiers, procurement readiness, support SLAs, customer logos, deployment guarantees, or roadmap commitments.

Deliver:

- an evaluator one-pager assembled from approved site claims;
- a discovery-question guide covering protocols, data engines, lifecycle needs, maturity tolerance, and required proof;
- an objection/answer library reviewed by a maintainer;
- a technical-evaluation checklist and follow-up link set;
- a gap log for requested capabilities, integrations, proof, security artifacts, and commercial requirements;
- account-feedback summaries that separate validated demand from anecdotal requests.

### GTM strategist

Own audience sequencing, channel roles, conversion definitions, launch stages, and the learning agenda. The initial motion should optimize for qualified developer evaluation and evidence collection, with commercial conversion added only when an actual offer, owner, and response process exist. Coordinate the website, PyPI, GitHub, docs, release notes, technical content, community, and direct evaluation materials as one journey.

Deliver:

- an ICP/hypothesis matrix explicitly labeled as assumptions until validated;
- journey maps for developer, platform lead, extension author, and technical evaluator;
- channel/content architecture defining the role of the website, docs, GitHub, PyPI, community, and outbound follow-up;
- launch stages with entry/exit criteria for foundation, developer activation, ecosystem proof, and commercial evaluation;
- measurement definitions for qualified visits, install copies, docs/source progression, example completion, return visits, and evaluation requests;
- a monthly evidence review that promotes, revises, or retires audience and message hypotheses.

### Copywriter

Own concise, technically accurate page copy in collaboration with a framework maintainer. Lead with outcomes, then explain the mechanism. Use “schema-first ASGI framework,” “operation,” “public facade,” “generated docs/contracts,” “lifecycle hooks,” and “engine plugins” consistently. Define specialist terms on first use. Keep headlines concrete and body copy scannable. All API, protocol, compatibility, version, and maturity claims require technical review and a source.

Deliver:

- final page copy and metadata for every route;
- CTA and microcopy set, including copy-success, errors, empty states, prerelease labels, and stale-data notices;
- glossary and terminology sheet;
- claims ledger mapping factual statements to source URLs and verification dates;
- social-card copy and release-page template.

Avoid the current inward-facing language about “repository surfaces,” “publication lanes,” DNS ownership, and site build commands on product pages. Avoid unexplained “governed primitives,” which obscures the concrete developer benefit.

## 9. Cross-functional workflow

1. Technical marketing, GTM Strategy, and the framework maintainer lock the initial audience hypotheses, positioning, conversion definition, and claims ledger.
2. Developer Relations inventories and verifies examples, demos, documentation paths, and community entry points against the stable facade.
3. Sales/Account Management contributes evaluator questions and objections, clearly separating observed demand from assumptions.
4. Copy and UX create content-first page outlines and profile journeys together.
5. UX tests comprehension using wireframes and realistic copy/code, not placeholder text.
6. Engineering validates every example, capability record, claim, route, and data-source assumption before high-fidelity implementation is locked.
7. Design and engineering agree on responsive component behavior, interactive-tool fallbacks, accessibility states, and stale/error handling.
8. Copy undergoes technical and claims-ledger review against the stable package and source repository.
9. GTM and Technical Marketing finalize channel assets only from approved page content; DevRel validates learning paths and Sales validates evaluation usability.
10. The team runs the acceptance checklist, records evidence, assigns content/release owners, and publishes only after unresolved claim gaps are removed or visibly qualified.

Decisions that require explicit owner approval:

- whether to advertise alpha status in the hero trust strip or only in release/get-started contexts;
- whether Docs is ready to be a primary CTA, because `docs.tigrbl.com` was not reliably retrievable during this review;
- whether any Rust surface is public and stable enough to mention;
- which engine plugins are supported/promoted versus merely published;
- whether Discord is an active supported community channel.

## 10. Acceptance criteria

The frontend is ready when:

- a Python API developer can identify the category, differentiator, supported protocols, maturity, and next step without reading repository internals;
- all public claims trace to current PyPI metadata, source, tests, or governed documentation;
- the recommended install path and samples run against the displayed stable version;
- stable facade releases are not confused with prereleases or engine-package releases;
- primary pages meet responsive, keyboard, contrast, semantic, and reduced-motion requirements;
- every indexable route has validated metadata, canonical URL, structured data, and static output;
- release data has a working update path and a visible verification date;
- no unsupported customer, performance, maturity, or production-readiness claims remain;
- the existing build, static generation, Docker, DNS, and proxy validation workflows still pass.

## 11. Sources reviewed

- Upstream repository and workspace README: <https://github.com/tigrbl/tigrbl>
- GitHub releases: <https://github.com/tigrbl/tigrbl/releases>
- PyPI facade package and release history: <https://pypi.org/project/tigrbl/>
- Current website repository source: `src/App.tsx`, `src/styles.css`, `packages/site-content-pack/src/index.ts`
- Current website delivery/configuration: `package.json`, `site.manifest.json`, Docker/nginx files, static-generation scripts, and desired-state DNS/proxy files

Facts in this brief should be re-verified at implementation and publication time. Product capability claims should ultimately cite package-local documentation or executable examples, not this brief alone.
