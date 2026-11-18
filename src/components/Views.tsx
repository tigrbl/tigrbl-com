import React, { useState } from "react";
import {
  SITE,
  FACADE,
  PACKAGES,
  VERIFIED_AT,
  FRAMEWORK_SOURCE,
} from "../content/site";
import { DEMOS } from "../content/demos";
import { EXAMPLES, HEALTH_CODE } from "../content/examples";
import { RELEASES, LATEST_RELEASE, isPrerelease } from "../content/releases";
import { POLICIES } from "../content/policies";
import checks from "../content/availability.json" with { type: "json" };
import type { Availability, DemoRecord, PageRecord } from "../content/types";
import { CodeBlock } from "./CodeBlock";

const availability = checks as Record<string, Availability>;
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="lede">{children}</div>}
    </div>
  );
}
export function DemoCard({ demo }: { demo: DemoRecord }) {
  const check = availability[demo.id];
  return (
    <article className="panel demo-card">
      <p className="eyebrow">{demo.category}</p>
      <h2>
        <a href={`/demos/${demo.id}`}>{demo.title}</a>
      </h2>
      <p>{demo.summary}</p>
      <div className="tags">
        {demo.protocols.map((p) => (
          <span key={p}>{p}</span>
        ))}
        <span>
          {!demo.liveUrl
            ? "Local setup"
            : !check
              ? "Host configured"
              : check.status === "reachable"
                ? "Page reachable"
                : "Host unavailable"}
        </span>
      </div>
      <a className="text-link" href={`/demos/${demo.id}`}>
        Explore demo →
      </a>
    </article>
  );
}
function Home() {
  const featured = [
    "tigrbl-restbulkcrudtable-postgres-demo",
    "tigrbl-realtime-wt-present2many-video-screen",
    "tigrbl-http-webdav-demo",
  ]
    .map((id) => DEMOS.find((d) => d.id === id)!)
    .filter(Boolean);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Schema-first ASGI · Python</p>
            <h1>
              Define your API once.
              <br />
              <span>Project everywhere.</span>
            </h1>
            <p className="lede">{SITE.description}</p>
            <div className="actions">
              <a className="button primary" href="/get-started">
                Build your first API →
              </a>
              <a className="button" href="/demos">
                Explore the demos
              </a>
            </div>
            <p className="muted">
              Latest PyPI release:{" "}
              <a href={`${SITE.pypi}${FACADE.publication.version}/`}>
                {FACADE.publication.version}
              </a>{" "}
              · Alpha · Python {FACADE.publication.python}
            </p>
          </div>
          <CodeBlock code={HEALTH_CODE} />
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From intent to execution</p>
            <h2>Keep the operation visible.</h2>
          </div>
          <a href="/how-it-works" className="text-link">
            Explore the architecture →
          </a>
        </div>
        <div className="grid three">
          {[
            [
              "Author the contract",
              "Start with the public tigrbl facade. Describe application operations, schemas, and hooks.",
            ],
            [
              "Inspect the plan",
              "Follow specifications through kernel planning and lifecycle atoms. Inspect diagnostics for your installed version.",
            ],
            [
              "Connect the runtime",
              "Choose protocol bindings and engine integrations appropriate to your application.",
            ],
          ].map(([title, text], i) => (
            <article className="panel" key={title}>
              <p className="step">0{i + 1}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Try it and inspect the source</p>
              <h2>Applications you can explore.</h2>
            </div>
            <a href="/demos" className="text-link">
              All {DEMOS.length} demos →
            </a>
          </div>
          <div className="grid three">
            {featured.map((d) => (
              <DemoCard key={d.id} demo={d} />
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="panel callout">
          <div>
            <p className="eyebrow">One starting point</p>
            <h2>Install the facade. Explore the ecosystem.</h2>
            <p>
              Application developers normally begin with <code>tigrbl</code>.
              Split packages expose framework layers, operation handlers, client
              tooling, and engine integrations.
            </p>
          </div>
          <div className="actions">
            <a className="button primary" href="/get-started">
              Get started
            </a>
            <a className="button" href="/ecosystem">
              Browse packages
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function Architecture() {
  return (
    <>
      <PageHeading
        eyebrow="Technical architecture"
        title="From application intent to execution."
      >
        <p>
          Tigrbl separates the application surface, framework specifications,
          kernel planning, and runtime execution. Follow the source for the
          version you use.
        </p>
      </PageHeading>
      <div className="grid two">
        {[
          [
            "01 · Author",
            "Use the public facade to define application operations, tables, schemas, and hooks.",
            "pkgs/80_facade/tigrbl",
          ],
          [
            "02 · Describe",
            "Core specifications make operation intent and protocol bindings explicit.",
            "pkgs/10_core/tigrbl_core",
          ],
          [
            "03 · Plan",
            "The kernel composes lifecycle work into execution plans.",
            "pkgs/45_kernel/tigrbl_kernel",
          ],
          [
            "04 · Execute",
            "The runtime bridges compiled plans to request and transport execution.",
            "pkgs/50_runtime/tigrbl_runtime",
          ],
        ].map(([title, text, path]) => (
          <section className="panel" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
            <a href={`${FRAMEWORK_SOURCE}/${path}`}>Inspect this layer ↗</a>
          </section>
        ))}
      </div>
      <section className="panel section" id="atoms">
        <p className="eyebrow">Lifecycle composition</p>
        <h2>Atoms are units of runtime work.</h2>
        <p>
          The <code>tigrbl-atoms</code> package owns stages, phases, typed
          contexts, event anchors, protocol execution, and composable pipeline
          algebra. Kernel planning and runtime execution use these lifecycle
          concepts; application authors normally start through the facade.
        </p>
        <p>
          Atoms describe framework execution. The{" "}
          <a href="/atom.xml">Atom feed</a> publishes website release updates.
        </p>
        <a href={`${FRAMEWORK_SOURCE}/pkgs/40_atoms/tigrbl_atoms`}>
          Read the atom package source ↗
        </a>
      </section>
      <section className="panel">
        <h2>Inspect actual output.</h2>
        <p>
          Routes, documents, hooks, and diagnostic output depend on the
          application and installed package versions. Use the executable
          examples and inspect generated output rather than treating a diagram
          as a conformance result.
        </p>
        <div className="actions">
          <a className="button" href="/examples">
            Code examples
          </a>
          <a className="button" href="/demos">
            Demo catalog
          </a>
        </div>
      </section>
    </>
  );
}
function GetStarted() {
  return (
    <>
      <PageHeading
        eyebrow="First application"
        title="Build a small API, then explore."
      >
        <p>
          Start with the published Python facade. The current publication
          declares Python {FACADE.publication.python} and an Alpha development
          classifier.
        </p>
      </PageHeading>
      <div className="reading">
        <section>
          <h2>1. Create an environment</h2>
          <p>
            Use a supported Python interpreter and install the version used by
            this website’s quickstart check.
          </p>
          <CodeBlock
            label="Shell"
            code={`uv init tigrbl-starter\ncd tigrbl-starter\nuv add "tigrbl==${FACADE.publication.version}" uvicorn`}
          />
          <p>
            Using pip instead? Create and activate a virtual environment, then
            run{" "}
            <code>
              python -m pip install "tigrbl=={FACADE.publication.version}"
              uvicorn
            </code>
            . An isolated pipx CLI install does not add application dependencies
            to your project.
          </p>
        </section>
        <section>
          <h2>2. Save an application</h2>
          <p>
            Create <code>app.py</code> with this endpoint.
          </p>
          <CodeBlock label="app.py" code={HEALTH_CODE} />
        </section>
        <section>
          <h2>3. Run and request it</h2>
          <CodeBlock
            label="Shell"
            code={
              "uv run uvicorn app:app --reload\n# In another terminal:\ncurl http://127.0.0.1:8000/health"
            }
          />
          <p>
            Expected JSON response: <code>{'{"status":"ok"}'}</code>. The
            repository quickstart check exercises this request over ASGI using
            the pinned facade.
          </p>
        </section>
        <section className="panel">
          <h2>Choose your next step.</h2>
          <p>
            Explore table-backed operations, engine integrations, or
            transport-specific applications. Follow each example’s own setup
            requirements.
          </p>
          <div className="actions">
            <a className="button" href="/examples">
              Examples
            </a>
            <a className="button" href="/demos">
              Demos
            </a>
            <a className="button" href={SITE.docs}>
              Documentation ↗
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
function Ecosystem() {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = PACKAGES.filter(
    (p) =>
      (group === "all" || p.group === group) &&
      `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Package ecosystem"
        title="Start with tigrbl. Go deeper when you need to."
      >
        <p>
          The facade is the normal application dependency. Narrower packages
          serve extension authors, framework maintainers, or specific engine
          integrations. Publication facts checked {VERIFIED_AT} (UTC).
        </p>
      </PageHeading>
      <div className="filters">
        <label>
          Search packages
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Package or responsibility"
          />
        </label>
        <label>
          Package group
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            {[
              ["all", "All packages"],
              ["facade", "Public facade"],
              ["core", "Framework layers"],
              ["op-pack", "Operations"],
              ["engine", "Engines"],
              ["tooling", "Client tooling"],
            ].map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="muted">
        {filtered.length} packages
      </p>
      <div className="grid two">
        {filtered.map((p) => (
          <article className="panel" key={p.name}>
            <p className="eyebrow">{p.group}</p>
            <h2 className="package-name">{p.name}</h2>
            <p>{p.description}</p>
            <p className="muted">
              {p.publication.version
                ? `PyPI ${p.publication.version} · Python ${p.publication.python}`
                : "Not found on PyPI at verification"}
            </p>
            {p.publication.version && (
              <CodeBlock label="Install" code={`uv add ${p.name}`} />
            )}
            <div className="actions">
              <a href={`${FRAMEWORK_SOURCE}/${p.sourcePath}`}>
                Pinned source ↗
              </a>
              {p.publication.version && (
                <a href={`https://pypi.org/project/${p.name}/`}>PyPI ↗</a>
              )}
              {DEMOS.some((d) =>
                d.packageNames.some(
                  (n) => n.replaceAll("_", "-") === p.name.replaceAll("_", "-"),
                ),
              ) && (
                <a
                  href={`/demos?engine=${encodeURIComponent(p.name.replace(/^tigrbl[-_]engine[-_]/, ""))}`}
                >
                  Related demos →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="panel">
          No matching packages. Try another search or package group.
        </p>
      )}
    </>
  );
}
function Examples() {
  return (
    <>
      <PageHeading
        eyebrow="Code recipes"
        title="Small examples with visible sources."
      >
        <p>
          Use a minimal endpoint to start, then follow pinned implementations
          for table-backed operations and diagnostics. Full applications live in
          the demo catalog.
        </p>
      </PageHeading>
      <div className="reading">
        {EXAMPLES.map((e) => (
          <article className="panel" id={e.id} key={e.id}>
            <p className="eyebrow">{e.protocol}</p>
            <h2>{e.title}</h2>
            <p>{e.description}</p>
            <CodeBlock
              code={e.code}
              label={e.id === "health" ? "Python" : "Reference"}
            />
            <p className="muted">{e.evidence}</p>
            <a href={e.sourceUrl}>Pinned source ↗</a>
            <div className="related">
              <h3>Related demos</h3>
              <ul>
                {DEMOS.filter((d) => d.relatedExampleIds.includes(e.id))
                  .slice(0, 3)
                  .map((d) => (
                    <li key={d.id}>
                      <a href={`/demos/${d.id}`}>{d.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
function Demos() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [protocol, setProtocol] = useState("All");
  const [engine, setEngine] = useState("All");
  const [status, setStatus] = useState("All");
  React.useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("engine");
    if (value && DEMOS.some((d) => d.engines.includes(value))) setEngine(value);
  }, []);
  const filtered = DEMOS.filter(
    (d) =>
      `${d.title} ${d.summary} ${d.packageNames.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (category === "All" || d.category === category) &&
      (protocol === "All" || d.protocols.includes(protocol)) &&
      (engine === "All" || d.engines.includes(engine)) &&
      (status === "All" ||
        (status === "Local setup"
          ? !d.liveUrl
          : status === "Page reachable"
            ? availability[d.id]?.status === "reachable"
            : !!d.liveUrl && availability[d.id]?.status !== "reachable")),
  );
  return (
    <>
      <PageHeading
        eyebrow="Demo catalog"
        title="Explore the application. Read the implementation."
      >
        <p>
          Engine labs, runtime probes, realtime showcases, file applications,
          and identity examples. HTTP checks describe page reachability, not
          complete functional conformance.
        </p>
      </PageHeading>
      <div className="filters demo-filters">
        <label>
          Search demos
          <input
            type="search"
            placeholder="Try PostgreSQL or video"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {[
          [
            "Category",
            category,
            setCategory,
            ["All", ...new Set(DEMOS.map((d) => d.category))],
          ],
          [
            "Protocol",
            protocol,
            setProtocol,
            ["All", ...new Set(DEMOS.flatMap((d) => d.protocols))],
          ],
          [
            "Engine",
            engine,
            setEngine,
            ["All", ...[...new Set(DEMOS.flatMap((d) => d.engines))].sort()],
          ],
          [
            "Availability",
            status,
            setStatus,
            [
              "All",
              "Page reachable",
              "Local setup",
              "Host unavailable or unchecked",
            ],
          ],
        ].map(([label, value, setter, options]) => (
          <label key={label as string}>
            {label as string}
            <select
              aria-label={label as string}
              value={value as string}
              onChange={(e) => (setter as (s: string) => void)(e.target.value)}
            >
              {(options as string[]).map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="section-heading">
        <p role="status">
          {filtered.length} of {DEMOS.length} demos
        </p>
        <button
          className="text-link"
          onClick={() => {
            setQuery("");
            setCategory("All");
            setProtocol("All");
            setEngine("All");
            setStatus("All");
          }}
        >
          Clear filters
        </button>
      </div>
      <div className="grid three">
        {filtered.map((d) => (
          <DemoCard demo={d} key={d.id} />
        ))}
      </div>
      {!filtered.length && (
        <p className="panel">
          No matching demos. Clear the filters or try another search.
        </p>
      )}
    </>
  );
}
function DemoDetail({ demo }: { demo: DemoRecord }) {
  const check = availability[demo.id];
  const publicSource = demo.sourceVisibility === "public";
  return (
    <>
      <a href="/demos" className="text-link">
        ← All demos
      </a>
      <PageHeading eyebrow={demo.category} title={demo.title}>
        <p>{demo.summary}</p>
      </PageHeading>
      <div className="detail-grid">
        <div>
          <section className="panel">
            <h2>Try this demonstration</h2>
            <ol>
              {demo.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="actions">
              {demo.liveUrl && (
                <a className="button primary" href={demo.liveUrl}>
                  {check?.status === "reachable"
                    ? "Launch demo"
                    : "Try configured host"}{" "}
                  ↗
                </a>
              )}
              {publicSource ? (
                <>
                  <a className="button" href={demo.repositoryUrl}>
                    View source ↗
                  </a>
                  <a className="button" href={demo.documentationUrl}>
                    Run locally ↗
                  </a>
                </>
              ) : (
                <a className="button" href="/support">
                  Ask about source access
                </a>
              )}
            </div>
          </section>
          <section className="panel">
            <h2>Before you start</h2>
            <ul>
              {demo.browserRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
            <p>
              Use synthetic data. Public demonstration data can be reset. See{" "}
              <a href="/privacy">privacy</a> and <a href="/terms">demo terms</a>
              .
            </p>
          </section>
          <section className="panel">
            <h2>
              {publicSource ? "Run locally" : "Source and local setup access"}
            </h2>
            <p>{demo.localRunInstructions}</p>
            {publicSource && (
              <>
                <CodeBlock
                  label="Git"
                  code={[
                    "git clone " + demo.repositoryUrl + ".git",
                    "cd " + demo.repositoryUrl!.split("/").pop(),
                    "git checkout " + demo.sourceRef,
                  ].join("\n")}
                />
                <a href={demo.documentationUrl}>
                  Open the pinned setup instructions ↗
                </a>
              </>
            )}
          </section>
        </div>
        <aside>
          <section className="panel">
            <h2>What the evidence covers</h2>
            <p>{demo.evidenceScope}</p>
            <dl>
              <dt>Protocols</dt>
              <dd>{demo.protocols.join(", ")}</dd>
              <dt>Engines</dt>
              <dd>{demo.engines.join(", ") || "Application-specific"}</dd>
              <dt>Source access</dt>
              <dd>
                {publicSource ? (
                  <a href={demo.repositoryUrl! + "/tree/" + demo.sourceRef}>
                    {demo.sourceRef!.slice(0, 12)} · Public source
                  </a>
                ) : (
                  "Private repository; access required."
                )}
              </dd>
              <dt>Hosted page</dt>
              <dd>
                {!demo.liveUrl
                  ? "No public host recorded."
                  : !check
                    ? "Configured; no HTTP observation recorded."
                    : (check.status === "reachable"
                        ? "Reachable"
                        : "Unavailable") +
                      " at " +
                      check.checkedAt +
                      " (HTTP check only)."}
              </dd>
            </dl>
          </section>
          <section className="panel">
            <h2>Related code</h2>
            <ul>
              {EXAMPLES.filter((example) =>
                demo.relatedExampleIds.includes(example.id),
              ).map((example) => (
                <li key={example.id}>
                  <a href={"/examples#" + example.id}>{example.title}</a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <section className="section">
        <h2>Explore related demos</h2>
        <div className="grid three">
          {DEMOS.filter(
            (other) => other.id !== demo.id && other.category === demo.category,
          )
            .slice(0, 3)
            .map((other) => (
              <DemoCard demo={other} key={other.id} />
            ))}
        </div>
      </section>
    </>
  );
}
function Releases() {
  const [showPre, setShowPre] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="Facade publications"
        title="Published versions. Explicit maturity."
      >
        <p>
          Publication metadata is sourced from PyPI, checked {VERIFIED_AT}{" "}
          (UTC). A non-prerelease version does not establish production
          readiness. Tigrbl’s current development classifier is Alpha.
        </p>
      </PageHeading>
      <section className="panel callout">
        <div>
          <p className="eyebrow">Latest non-prerelease on PyPI</p>
          <h2>Tigrbl {FACADE.publication.version}</h2>
          <p>
            Published {LATEST_RELEASE.publishedAt} · Python{" "}
            {FACADE.publication.python}
          </p>
          <p>
            No separate maintainer recommendation or long-term support
            commitment is asserted here.
          </p>
        </div>
        <CodeBlock
          label="Pinned install"
          code={`uv add "tigrbl==${FACADE.publication.version}"`}
        />
      </section>
      <p>
        <a href={`${SITE.repository}/releases`}>
          Read repository release notes ↗
        </a>{" "}
        · <a href="/rss.xml">RSS</a> · <a href="/atom.xml">Atom</a>
      </p>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={showPre}
          onChange={(e) => setShowPre(e.target.checked)}
        />{" "}
        Include prereleases
      </label>
      <div className="release-list">
        {RELEASES.filter((r) => showPre || !isPrerelease(r.version)).map(
          (r) => (
            <article className="panel release-row" key={r.version}>
              <div>
                <h2>
                  <a href={`${SITE.pypi}${r.version}/`}>tigrbl {r.version} ↗</a>
                </h2>
                <p>
                  {r.publishedAt} ·{" "}
                  {isPrerelease(r.version)
                    ? "Prerelease"
                    : "Non-prerelease publication"}
                  {r.yanked ? " · Yanked" : ""}
                </p>
              </div>
              <a href={`${SITE.pypi}${r.version}/`}>Version requirements ↗</a>
            </article>
          ),
        )}
      </div>
    </>
  );
}
export function View({ page }: { page: PageRecord }) {
  if (page.path === "/") return <Home />;
  if (page.path === "/404")
    return (
      <>
        <PageHeading eyebrow="404" title="This page does not exist.">
          <p>
            Browse the documentation, examples, or demo catalog to continue.
          </p>
        </PageHeading>
        <div className="actions">
          <a className="button primary" href="/">
            Home
          </a>
          <a className="button" href="/demos">
            Demos
          </a>
        </div>
      </>
    );
  if (page.path.startsWith("/demos/"))
    return (
      <DemoDetail demo={DEMOS.find((d) => `/demos/${d.id}` === page.path)!} />
    );
  if (POLICIES[page.path])
    return (
      <>
        <PageHeading eyebrow="Project information" title={page.title} />
        <div className="reading">
          {POLICIES[page.path].map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.links && (
                <ul>
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href}>
                        {l.label}
                        {l.href.startsWith("https:") ? " ↗" : ""}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </>
    );
  return page.path === "/get-started" ? (
    <GetStarted />
  ) : page.path === "/how-it-works" ? (
    <Architecture />
  ) : page.path === "/ecosystem" ? (
    <Ecosystem />
  ) : page.path === "/examples" ? (
    <Examples />
  ) : page.path === "/demos" ? (
    <Demos />
  ) : (
    <Releases />
  );
}
