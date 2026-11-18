import React, { useState } from "react";
import { NAV, SITE, FACADE } from "../content/site";

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a href="/" className="brand" aria-label="Tigrbl home">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          <span>TIGRBL</span>
          <small>Alpha · {FACADE.publication.version}</small>
        </a>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}
        </button>
        <nav
          id="primary-nav"
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {NAV.map((n) => (
            <a
              key={n.path}
              href={n.path}
              aria-current={
                path === n.path || path.startsWith(n.path + "/")
                  ? "page"
                  : undefined
              }
            >
              {n.label}
            </a>
          ))}
          <a href={SITE.docs}>Docs ↗</a>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  const groups = [
    {
      title: "Build",
      links: [
        ...NAV.filter((n) =>
          ["/get-started", "/examples", "/demos", "/ecosystem"].includes(
            n.path,
          ),
        ),
        { path: SITE.pypi, label: "PyPI" },
        { path: SITE.repository, label: "Source code" },
      ],
    },
    {
      title: "Learn",
      links: [
        { path: SITE.docs, label: "Documentation" },
        { path: "/how-it-works", label: "Architecture" },
        { path: "/releases", label: "Releases" },
        { path: "/rss.xml", label: "RSS feed" },
        { path: "/atom.xml", label: "Atom feed" },
      ],
    },
    {
      title: "Community",
      links: [
        { path: SITE.discord, label: "Discord" },
        { path: SITE.organization, label: "GitHub organization" },
        { path: SITE.issues, label: "Issues" },
        { path: "/support", label: "Support" },
        { path: "/security", label: "Security" },
      ],
    },
    {
      title: "Website",
      links: [
        { path: "/privacy", label: "Privacy" },
        { path: "/terms", label: "Terms" },
        { path: SITE.license, label: "Software license" },
        { path: "/sitemap.xml", label: "Sitemap" },
        { path: "/llms.txt", label: "LLM index" },
      ],
    },
  ];
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="/" className="brand">
              TIGRBL
            </a>
            <p>
              Explicit contracts.
              <br />
              Reviewable execution.
              <br />
              Python applications.
            </p>
            <p className="muted">Open-source project · Alpha</p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.path}>
                    <a href={link.path}>
                      {link.label}
                      {link.path.startsWith("https:") ? " ↗" : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="footer-note">
          Tigrbl project. Package licenses apply to their respective software.{" "}
          <a href="/support">Contact the maintainers</a>.
        </p>
      </div>
    </footer>
  );
}
