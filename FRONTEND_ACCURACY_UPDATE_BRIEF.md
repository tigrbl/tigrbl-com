# Tigrbl Frontend Accuracy Update Brief

Status: implementation brief
Prepared: 2026-07-11
Target: `tigrbl/tigrbl-com`
Audience: frontend engineering, UI/UX design, framework maintainers, technical marketing, and copywriting

## 1. Purpose

Update the current Tigrbl product frontend so that its community links, package explorer, installation guidance, examples, generated application specifications, protocol projections, and kernel-plan visualizations are true to the live Tigrbl repository and published package family.

This is an accuracy and product-comprehension pass, not merely a copy refresh. The website must stop presenting hand-authored simulations as framework-generated evidence. Anything labeled generated, compiled, supported, tested, stable, or verified must be sourced from an executable fixture, current repository documentation, governed evidence, or published package metadata.

## 2. Outcomes

After this update, a visitor must be able to:

1. Find Tigrbl's verified community and source links in the footer.
2. Understand which package an application developer installs and which split packages are maintainer or extension surfaces.
3. See only real published package names, paths, import roots, purposes, and install commands.
4. Understand when to use `uv`, `pipx`, or `pip` without confusing CLI isolation with application dependency management.
5. Follow multiple tables from app/router composition through operations, handlers, schemas, hooks, REST and JSON-RPC bindings, docs, diagnostics, and kernel planning.
6. Distinguish authored intent, generated application specifications, compiled kernel metadata, and runtime execution.
7. Inspect evidence that comes from a reproducible Tigrbl example rather than invented output strings.

## 3. Source-of-truth hierarchy

Use sources in this order:

1. Governed `.ssot/` entities, conformance documentation, and release evidence for support, certification, and maturity claims.
2. Live source and tests in `tigrbl/tigrbl` for exact APIs, package ownership, operation vocabulary, lifecycle phases, bindings, diagnostics, and behavior.
3. Package-local `README.md` and `pyproject.toml` files for distribution names, import roots, extras, console scripts, and package boundaries.
4. PyPI project metadata for the latest installable version, Python range, classifier, files, and publication date.
5. Root workspace README for orientation only; it may lag PyPI and must not override published release metadata.

Every factual content record should carry:

- `sourceUrl`
- `verifiedAt`
- `versionScope` when behavior depends on a release
- `evidenceKind`: `source`, `test`, `docs`, `ssot`, `pypi`, or `generated-fixture`

Do not use this brief itself as product evidence.

## 4. Footer and social links

### Required verified links

- Tigrbl GitHub repository: <https://github.com/tigrbl/tigrbl>
- Tigrbl GitHub organization: <https://github.com/tigrbl>
- Discord community: <https://discord.gg/K4YTAPapjR>
- PyPI facade package: <https://pypi.org/project/tigrbl/>
- License: <https://github.com/tigrbl/tigrbl/blob/master/LICENSE>
- Issues: <https://github.com/tigrbl/tigrbl/issues>

### Footer requirements

Organize links by intent:

- **Build:** Get started, Examples, PyPI, repository.
- **Learn:** How it works, Package explorer, Releases, workspace documentation.
- **Community:** Discord, GitHub organization, Issues.
- **Project:** License, Security, Contributing, release evidence.

Discord and GitHub are the currently verified social/community destinations. Do not add X/Twitter, LinkedIn, YouTube, Slack, email, or other profiles unless a maintainer supplies or verifies an official URL.

External links require an accessible name, visible external-link treatment, safe `rel` attributes, and an analytics event that records only the destination category—not user-identifying data.

## 5. Truthful package explorer

### Required framing

Lead with one rule:

> Application developers normally install and import `tigrbl`. Split packages are for intentionally narrow dependencies, extension work, boundary tests, or framework maintenance.

Do not present every published distribution as an equally recommended application dependency.

### Package groups

The explorer must derive its inventory from package manifests rather than a handwritten list. At minimum, represent these source-backed groups:

| Group | Distribution examples | Import roots | Honest purpose |
|---|---|---|---|
| Public facade | `tigrbl` | `tigrbl` | Application-facing app/router factories, decorators, shortcuts, schema helpers, engine helpers, compatibility imports, and CLI |
| Core specs | `tigrbl-core` | `tigrbl_core` | Specs, configuration resolution, operation vocabulary, and schema generation |
| Base contracts | `tigrbl-base` | `tigrbl_base` | Abstract contracts, mapping helpers, and inference boundaries |
| Concrete adapters | `tigrbl-concrete` | `tigrbl_concrete` | Concrete app/router/table/operation/docs/diagnostics/engine/transport adapters |
| Atoms | `tigrbl-atoms` | `tigrbl_atoms` | Lifecycle phase work, typed contexts, atoms, transactions, and runtime units |
| Kernel | `tigrbl-kernel` | `tigrbl_kernel` | Operation-view compilation, hook ordering, packed plans, protocol chains, lifecycle rows, labels, event keys, and capability masks |
| Runtime | `tigrbl-runtime` | `tigrbl_runtime` | Execution of compiled plans, routing, transport-unit handling, framing, and transaction progression |
| ORM | `tigrbl-orm` | `tigrbl_orm` | SQLAlchemy-facing table, mixin, column, and persistence helpers |
| OLTP operations | `tigrbl-ops-oltp` | `tigrbl_ops_oltp` | Canonical CRUD and transactional operation definitions |
| OLAP operations | `tigrbl-ops-olap` | `tigrbl_ops_olap` | Analytical operation definitions |
| Realtime operations | `tigrbl-ops-realtime` | `tigrbl_ops_realtime` | Realtime, streaming, pub/sub, and transport-oriented operation definitions |
| Client | `tigrbl-client` | `tigrbl_client` | Client helpers |
| Shared typing | `tigrbl-typing` | `tigrbl_typing` | Shared typing and vendor-compatible types |
| Spec support | `tigrbl_spec` | `tigrbl_spec` | Spec support package |
| Test support | `tigrbl_tests` | `tigrbl_tests` | Test harnesses, examples, conformance, and package tests |
| Engines | `tigrbl-engine-*` | manifest-specific | Backend-specific database, cache, queue, rate, bloom, dedupe, dataframe, warehouse, and related integrations |

The live source currently organizes the active family under `pkgs/core/*` and `pkgs/engines/*`, with deprecated packages separated under `pkgs/deprecated/*`.

### Current explorer records that must be removed or corrected

- Replace every `packages/...` GitHub source path with a verified live `pkgs/core/...` or `pkgs/engines/...` path.
- Remove `tigrbl-crud-pack`; the source-backed transactional operation package is `tigrbl-ops-oltp`.
- Remove `tigrbl-postgres` unless a live manifest proves that exact distribution. Engine distributions use the `tigrbl-engine-*` family and must be enumerated from manifests.
- Replace `tigrbl-test` with the verified distribution/import pair from package metadata; the upstream workspace documents `tigrbl_tests`.
- Do not describe `tigrbl-typing` as a mypy/pyright plugin unless its package source explicitly provides those plugins. The upstream description is shared typing and vendor-compatible types.
- Remove package-specific `Beta` or `Stable` badges unless governed release evidence supports them. Use `Published`, `Prerelease`, `Deprecated`, `Internal`, or a source-backed maturity value instead.
- Do not claim that a package is installable unless a current PyPI project or build manifest is linked.

### Package card fields

Each card must show:

- distribution name;
- import root;
- layer/group;
- one-sentence responsibility;
- intended user: application, extension, maintainer, or testing;
- source path;
- PyPI link when published;
- latest version and publication status from PyPI;
- supported Python range from the package metadata;
- install command appropriate to the package;
- evidence date.

Avoid marketing adjectives in package descriptions. Package cards are an inventory and boundary guide.

## 6. Installer hierarchy

### Required order

1. **Primary: uv**
2. **Secondary: pipx**, only for isolated CLI use
3. **Tertiary: pip**, preferably through `python -m pip`

### Correct usage

For an application project:

```bash
uv add tigrbl
```

For an isolated global Tigrbl CLI:

```bash
pipx install tigrbl
tigrbl --help
```

For a conventional virtual environment:

```bash
python -m pip install tigrbl
```

For workspace contributors:

```bash
git clone https://github.com/tigrbl/tigrbl.git
cd tigrbl
uv sync --all-extras --dev
```

### Guardrails

- Do not recommend `pipx` for importing `tigrbl` into an application. `pipx` isolates applications and is only the secondary path for the published console script.
- Do not label `pip` the standard or preferred installer.
- Make `uv run ...` the primary execution pattern in examples.
- Optional extras must be read from the current facade manifest. The upstream documentation presently lists `postgres`, `servers`, `templates`, and `tests`, but the site must not assume those remain current indefinitely.
- Version-pinned commands should use the stable facade version sourced from PyPI; prerelease instructions require an explicit opt-in treatment.

Update install commands consistently in the header, hero, Get Started, Releases, package cards, code examples, copy-to-clipboard controls, metadata, and `llms.txt`.

## 7. Multi-table showcase

### Goal

Replace the single fictional `UserTable` demo with one coherent application fixture containing multiple related tables. The fixture should demonstrate composition and scope rather than repeating isolated snippets.

### Recommended domain fixture

Use a small order-management domain because it naturally demonstrates collection/member operations, relationships, policy, and analytical/realtime extensions:

- `Customer`
- `Product`
- `Order`
- `OrderLine`
- optional `AuditEvent` for a non-primary or append-oriented table

The exact declarations, field helpers, profiles, and relationship syntax must be copied from or tested against the current facade API. Do not invent `Table`, column, decorator, or relationship syntax based on another ORM.

### What the showcase must reveal

- One `TigrblApp` containing at least two `TigrblRouter` scopes.
- Multiple tables included through the public composition API.
- Shared policy or engine intent at app/router scope.
- Table-specific operations and schemas at table scope.
- An operation-specific override showing the precedence chain.
- Canonical operations: `create`, `read`, `update`, `replace`, `delete`, `list`, and `clear` where legal.
- One custom domain operation, such as `Order.submit`, that is not represented as improvised REST-only code.
- One non-persistence operation to show that operations are broader than database CRUD.

Use the documented configuration precedence in the explainer:

```text
per-request overrides > operation spec > column spec > table spec > router spec > app spec > framework defaults
```

## 8. App, router, table, and operation bindings

### Required mental model

The visualization should communicate composition and derivation:

```text
TigrblApp
  └─ TigrblRouter
       └─ Table
            └─ Operation identity
                 ├─ handler
                 ├─ request/response schemas
                 ├─ lifecycle hooks
                 └─ protocol bindings
                      ├─ REST / HTTP
                      └─ JSON-RPC / HTTP

Operation view + hooks + bindings + capabilities
  └─ kernel planning
       └─ runtime execution
```

### Exact vocabulary

Use the framework's public and diagnostic names where applicable:

- `.ops`
- `.handlers`
- `.schemas`
- `.bindings`
- `op_ctx`
- `hook_ctx`
- `schema_ctx`
- `bind(...)` and `rebind(...)` only where the live API demonstrates them

Operation identity must remain the same across handlers, schemas, hooks, bindings, REST, JSON-RPC, generated docs, diagnostics, and tests. Do not portray each protocol as independently authored behavior.

### Binding families

The source-backed binding vocabulary includes:

- `RestBindingSpec`
- `HttpJsonRpcBindingSpec`
- `HttpStreamBindingSpec`
- `SseBindingSpec`
- `WebSocketBindingSpec`
- `WebTransportBindingSpec`

The first implementation should go deep on REST and JSON-RPC. Streaming, SSE, WebSocket, and WebTransport may appear as additional binding families, but the UI must not assert a specific framing or capability without governed evidence.

## 9. REST and JSON-RPC projection

### Canonical operation mapping

Use this repository-documented mapping as the initial display model, then verify it with the executable fixture:

| Operation | REST shape | JSON-RPC shape | Scope |
|---|---|---|---|
| `create` | `POST /{resource}` | `Model.create` | collection |
| `read` | `GET /{resource}/{id}` | `Model.read` | member |
| `update` | `PATCH /{resource}/{id}` | `Model.update` | member |
| `replace` | `PUT /{resource}/{id}` | `Model.replace` | member |
| `delete` | `DELETE /{resource}/{id}` | `Model.delete` | member |
| `list` | `GET /{resource}` | `Model.list` | collection |
| `clear` | `DELETE /{resource}` | `Model.clear` | collection |
| custom | operation-defined | operation-defined | operation-defined |

The interface must explain that REST path conflicts can exist while JSON-RPC methods remain independently addressable. Do not fabricate exact pluralization, path prefixes, aliases, or method casing; capture those from the generated fixture output.

### Protocol projector requirements

For a selected table and operation, show:

1. Authored table/operation intent.
2. Semantic operation identity and alias.
3. Handler association.
4. Request and response schema names.
5. REST binding and generated OpenAPI fragment.
6. JSON-RPC binding and generated OpenRPC fragment.
7. Attached lifecycle hooks.
8. Kernel/lifecycle plan reference.

The current projector's hand-authored `@app.crud(...)`, source paths, OpenAPI objects, RPC methods, and boot log must be replaced by captured or serialized framework output.

## 10. Hooks and lifecycle

Use the documented runtime phases rather than invented step names:

- `INGRESS_BEGIN`
- `INGRESS_PARSE`
- `INGRESS_DISPATCH`
- `PRE_TX_BEGIN`
- `START_TX`
- `PRE_HANDLER`
- `HANDLER`
- `POST_HANDLER`
- `PRE_COMMIT`
- `TX_COMMIT`
- `POST_COMMIT`
- `EGRESS_SHAPE`
- `EGRESS_FINALIZE`
- `POST_RESPONSE`
- phase-specific `ON_*_ERROR` with `ON_ERROR` fallback
- `TX_ROLLBACK`

Show at least three concrete hook purposes across the multi-table fixture:

- authorization or validation at `PRE_HANDLER`;
- auditing or normalization at `POST_HANDLER` or `POST_COMMIT`;
- masking or response shaping at `EGRESS_SHAPE`;
- optional after-response telemetry at `POST_RESPONSE`.

Do not show application hooks directly committing, flushing, or managing sessions. Transaction progression belongs to framework phases and atoms.

## 11. Generated schemas and application specifications

### Definitions

- **Authored intent:** app, router, table, column, operation, hook, binding, engine, storage, IO, request, response, and docs specs supplied by the author.
- **Generated application specifications:** normalized inventories and documents derived from authored intent, including operations, methods, hooks, schemas, bindings, OpenAPI, OpenRPC, and diagnostics.
- **Compiled kernel plan:** kernel-owned operation views, lifecycle rows, hook ordering, protocol chains, labels, capability masks, dispatch metadata, and packed plans used by runtime execution.

Do not collapse these three layers into a single “compiler output” animation.

### Required generated views

The UI should expose, for the executable fixture:

- operation inventory;
- handler inventory;
- schema inventory;
- binding inventory;
- hook inventory;
- OpenAPI output for REST;
- OpenRPC output for JSON-RPC;
- `/system/methodz` diagnostic output;
- `/system/hookz` diagnostic output;
- `/system/kernelz` diagnostic output;
- package/version metadata used to generate the fixture.

Use `get_schema(...)` or the current facade schema helper in the source fixture where appropriate. Do not handwrite Pydantic-like request/response models and describe them as generated Tigrbl schemas.

### UI behavior

- Allow selection by router, table, and operation.
- Keep the selected semantic operation synchronized across every tab.
- Provide a diff view comparing two tables or two operations.
- Label raw captured JSON separately from a human-readable explanation.
- Display capture version, commit, command, and timestamp.
- Provide links to the fixture source and the relevant upstream owner package.

## 12. Compiled kernel-plan showcase

### Replace the current simulation

Remove claims and examples based on `app.compile_plan()`, `plan.steps`, `tigrbl.kernel.steps.parse_http`, or other names unless the exact installed facade exposes them. The current plan display is illustrative and must not be presented as actual runtime output.

### Required plan content

Use actual `/system/kernelz` output or a documented serialization API from the tested fixture. The visualization should show:

- selected app/router/table/operation identity;
- protocol binding and exchange/framing information;
- ordered lifecycle rows;
- hook placement and priority/order;
- atom or execution-unit identifiers exposed by the diagnostic payload;
- transaction boundaries;
- request and response schema references;
- capability masks or fail-closed legality decisions where present;
- source package ownership for each part of the plan.

### Visual treatment

Use a deterministic plan inspector, not an animated fake terminal. Recommended layout:

- left: app → router → table → operation tree;
- center: ordered lifecycle timeline;
- right: selected phase details, hooks, schemas, binding, capability evidence, and source link;
- bottom: raw diagnostic payload and reproduction command.

If a field is not exposed by the diagnostic payload, omit it or label it “not exposed”; never infer hidden runtime internals.

## 13. Reproducible evidence fixture

Create a versioned fixture or generation script owned by `tigrbl-com` that:

1. Creates an isolated environment with `uv`.
2. Installs the selected stable `tigrbl` facade version.
3. Builds the verified multi-table application using public facade imports.
4. Binds REST and JSON-RPC through documented Tigrbl APIs.
5. Collects operation, handler, schema, binding, hook, OpenAPI, OpenRPC, method, hook, and kernel diagnostics.
6. Writes deterministic JSON snapshots consumed by the frontend.
7. Records package version, Python version, upstream commit or release, generation command, and timestamp.
8. Fails when expected identities disappear or protocol/schema/hook relationships no longer agree.

Recommended repository layout:

```text
fixtures/
  multi_table_app/
    app.py
    README.md
    expected/
      app-spec.json
      openapi.json
      openrpc.json
      methodz.json
      hookz.json
      kernelz.json
scripts/
  generate-tigrbl-evidence.*
```

Frontend production builds should use committed, reviewed snapshots. Network access must not be required to render the site.

## 14. Content-model updates

Replace the current broad `PACKAGES`, `EXAMPLES`, and projector-local handwritten records with typed evidence models:

```text
PackageRecord
  distributionName
  importRoot
  group
  audience
  responsibility
  sourcePath
  pypiUrl?
  installable
  version?
  pythonRange?
  publicationStatus
  evidence

ApplicationFixture
  id
  tigrblVersion
  pythonVersion
  generatedAt
  sourceUrl
  routers[]
  tables[]
  operations[]
  handlers[]
  schemas[]
  hooks[]
  bindings[]
  docs
  diagnostics

EvidenceRef
  sourceUrl
  verifiedAt
  versionScope?
  evidenceKind
```

Build-time validation must reject:

- duplicate package/import identities;
- source paths that do not resolve to the expected upstream layout;
- “published” records without a PyPI URL;
- operation views missing handler/schema/binding references;
- REST and JSON-RPC views that point to different semantic operation identities;
- generated snapshots without version and command provenance;
- maturity or performance claims without evidence.

## 15. Page-level changes

### Header and hero

- Make `uv add tigrbl` the copyable primary command.
- Retain Get Started, GitHub, and Discord actions.
- Do not crowd the header with `pipx` and `pip`; explain alternatives in Get Started.

### Home

- Replace the fictional projector with the captured multi-table application story.
- Keep the first view simple: select `Order.create` and show its REST, JSON-RPC, schema, hook, and kernel relationships.
- Add “Generated from Tigrbl {version}” provenance.

### How it works

- Explain app → router → table → operation composition.
- Separate authored intent, generated specs, kernel planning, and runtime execution.
- Use exact lifecycle phases and configuration precedence.

### Ecosystem / package explorer

- Generate inventory from verified manifests.
- Group packages by facade, framework layers, operation packs, support, and engines.
- Remove unsupported maturity labels and invented packages.
- Provide source/PyPI links and intended audience.

### Examples

- Lead with `uv` setup and `uv run` execution.
- Include one app/router composition example, one multi-table CRUD/projection example, one custom operation, one hook/schema example, and one diagnostics/plan-inspection example.
- Put `pipx` in a clearly labeled CLI-only example and `python -m pip` in a tertiary virtual-environment example.
- Mark an example `Tested` only when CI runs the exact source against the displayed version.

### Releases

- Use `uv add tigrbl=={version}` as the primary pinned command.
- Offer `pipx install tigrbl=={version}` only under “Install the CLI in isolation.”
- Offer `python -m pip install tigrbl=={version}` as the tertiary environment command.
- Do not invent release notes; link or summarize only source-backed release evidence.

### Footer

- Add the verified community and project links from Section 4.
- Include the current evidence verification date.
- Remove unsupported performance-budget claims from public-facing footer copy unless the site publishes measured results.

## 16. Role-specific requirements

### Framework maintainer

- Approve exact facade code, table syntax, binding APIs, aliases, diagnostic payloads, package boundaries, and lifecycle explanations.
- Identify which engine packages and transport combinations are governed as supported.
- Approve every `Tested`, `Generated`, `Compiled`, and maturity label.

### Frontend engineer

- Implement evidence-backed typed models and snapshot loaders.
- Keep selection synchronized across app/router/table/operation, schemas, bindings, hooks, docs, and kernel plan.
- Add provenance and stale-evidence states.
- Replace every `pip install` default with the installer hierarchy in this brief.
- Preserve static generation, accessibility, responsive behavior, Docker/nginx deployment, and existing validation commands.

### UI/UX designer

- Design the multi-level application explorer and kernel-plan inspector without overwhelming first-time visitors.
- Provide compact mobile alternatives for trees, matrices, JSON, and timelines.
- Distinguish authored, generated, compiled, and executed states visually and textually—not by color alone.
- Design missing, unsupported, stale, prerelease, and unverified evidence states.

### Technical marketer and copywriter

- Describe “define once, project across protocols” as a model and evidence trail, not a guarantee that every protocol exposes every operation identically.
- Avoid `100% aligned`, `guaranteed predictability`, `zero drift`, `high-performance`, and similar absolutes without benchmarks or governed proof.
- Use “schema-first Python framework for REST and JSON-RPC APIs, typed contracts, runtime pipelines, engine plugins, and optional Rust runtime bindings” as the current workspace-level category description.
- Keep optional Rust work separate from the primary Python application story.

## 17. Acceptance criteria

This update is ready when:

- the footer exposes only verified social/community/project URLs;
- `uv` is primary, `pipx` is explicitly CLI-only and secondary, and `python -m pip` is tertiary everywhere;
- no source link uses the obsolete `packages/...` layout;
- no invented distribution or unsupported package maturity label remains;
- the explorer inventory can be regenerated from live package manifests;
- at least four related tables are represented in one tested application fixture;
- app, router, table, operation, handler, schema, hook, and binding identities remain linked in the content model;
- REST and JSON-RPC projections preserve one semantic operation identity;
- canonical CRUD names match `create`, `read`, `update`, `replace`, `delete`, `list`, and `clear`;
- hook views use documented lifecycle phases;
- generated schema/docs/diagnostic views are captured from the declared Tigrbl version;
- the kernel plan comes from `/system/kernelz` or another documented serialization surface, not fabricated terminal text;
- every tested example is executed in CI with `uv` against the displayed stable facade version;
- release summaries and package metadata are source-backed;
- frontend typecheck, build, accessibility, responsive, broken-link, and deployment checks pass.

## 18. Sources reviewed

- Tigrbl workspace and package catalog: <https://github.com/tigrbl/tigrbl>
- Tigrbl authoring policy: <https://github.com/tigrbl/tigrbl/blob/master/docs/developer/AUTHORING_BCP.md>
- Tigrbl PyPI package: <https://pypi.org/project/tigrbl/>
- Existing frontend data and examples: `src/data.ts`
- Existing package explorer: `src/components/EcosystemView.tsx`
- Existing protocol projector: `src/components/ProtocolProjector.tsx`
- Existing Get Started flow: `src/components/GetStartedView.tsx`
- Existing kernel explanation: `src/components/HowItWorksView.tsx`
- Existing footer/community implementation: `src/components/Footer.tsx`

All APIs, package lists, versions, extras, source paths, and generated payload shapes must be revalidated when implementation begins.
