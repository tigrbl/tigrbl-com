import siteContent from "../packages/site-content-pack/src/index";

const links = [
  { label: "Platform", href: "/platform/" },
  { label: "Proof", href: "/proof/" },
  { label: "Docs", href: "https://docs.tigrbl.com" }
];

const recentNotes = [
  {
    title: "Contract-first runtime surfaces",
    href: "/platform/",
    body: "Make operations, schemas, and service boundaries explicit before they become production behavior."
  },
  {
    title: "Traceable delivery",
    href: "/proof/",
    body: "Keep build, DNS, proxy, Docker, and release evidence close to the site that publishes it."
  },
  {
    title: "Docs for builders",
    href: "https://docs.tigrbl.com",
    body: "Use the docs site for implementation details, package guides, and runtime examples."
  }
];

function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="/" aria-label="Tigrbl home">
          <img src="/assets/brand/tigrbl/tigrbl-brand-lockup.svg" alt="Tigrbl" />
        </a>
        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>{siteContent.footer?.note}</p>
        <div>
          <a href="/">Home</a>
          <a href="/platform/">Platform</a>
          <a href="/proof/">Proof</a>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <SiteChrome>
      <section className="home-hero" aria-labelledby="hero-title">
        <p className="eyebrow">Tigrbl</p>
        <h1 id="hero-title">Governed API primitives for durable Python services.</h1>
        <p>
          Tigrbl makes service contracts, runtime operations, schemas, and delivery evidence visible enough
          for teams to build and review systems without guessing where behavior lives.
        </p>
      </section>
      <section className="article-list" aria-labelledby="articles-title">
        <div className="section-heading">
          <p className="eyebrow">Start here</p>
          <h2 id="articles-title">Core surfaces</h2>
        </div>
        <div className="articles">
          {recentNotes.map((item) => (
            <a className="article-link" href={item.href} key={item.href}>
              <span>Tigrbl</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </a>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}

function DetailPage({ kind }: { kind: "platform" | "proof" }) {
  const isPlatform = kind === "platform";
  return (
    <SiteChrome>
      <article className="article-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Tigrbl</a>
          <span>/</span>
          <span>{isPlatform ? "Platform" : "Proof"}</span>
        </nav>
        <header className="article-hero">
          <p className="article-kicker">{isPlatform ? "Platform" : "Proof"}</p>
          <h1>{isPlatform ? "Explicit runtime contracts." : "Build and deployment evidence."}</h1>
          <p className="article-excerpt">
            {isPlatform
              ? "Tigrbl is positioned around governed API/runtime surfaces that can be reviewed, tested, and shipped as durable service contracts."
              : "The site repository owns the static build, Docker service, DNS plan, proxy plan, and publication workflow for tigrbl.com."}
          </p>
        </header>
        <section className="article-content">
          <h2>{isPlatform ? "What it focuses on" : "What operators verify"}</h2>
          <ul>
            {(isPlatform
              ? ["Contract-shaped APIs", "Runtime operation boundaries", "Typed metadata and service discovery"]
              : ["npm run check", "npm run build", "Docker service restart", "DNS and proxy configuration"]).map((item) => (
                <li key={item}>{item}</li>
              ))}
          </ul>
        </section>
      </article>
    </SiteChrome>
  );
}

export function App() {
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  if (path.startsWith("/platform")) return <DetailPage kind="platform" />;
  if (path.startsWith("/proof")) return <DetailPage kind="proof" />;
  return <HomePage />;
}
