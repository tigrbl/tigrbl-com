import { DEMOS } from "./demos";
import type { PageRecord } from "./types";

export const PAGES: PageRecord[] = [
  {
    path: "/",
    title: "Tigrbl — Define your API once. Project everywhere.",
    description:
      "A schema-first Python ASGI framework for explicit API operations, protocol bindings, lifecycle hooks, and pluggable engines.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/get-started",
    title: "Get started with Tigrbl",
    description:
      "Install the Python facade, create a health endpoint, and run your first Tigrbl ASGI application.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/how-it-works",
    title: "Tigrbl architecture, atoms, and execution",
    description:
      "Follow application authoring through specifications, kernel plans, lifecycle atoms, and runtime execution.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/ecosystem",
    title: "Tigrbl package ecosystem",
    description:
      "Explore the public facade, framework layers, operation packages, client tooling, and engine plugins.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/examples",
    title: "Tigrbl code examples",
    description:
      "Start with a REST endpoint, explore table-backed operations, and inspect runtime diagnostics.",
    family: "examples",
    indexable: true,
  },
  {
    path: "/demos",
    title: "Tigrbl demo catalog",
    description:
      "Explore engine laboratories, realtime showcases, WebDAV, and identity examples with source and local setup instructions.",
    family: "demos",
    indexable: true,
  },
  ...DEMOS.map((d) => ({
    path: `/demos/${d.id}`,
    title: `${d.title} — Tigrbl demo`,
    description: d.summary,
    family: "demos" as const,
    indexable: true,
  })),
  {
    path: "/releases",
    title: "Tigrbl releases",
    description:
      "Browse facade publications and distinguish release metadata from project maturity and support commitments.",
    family: "releases",
    indexable: true,
  },
  {
    path: "/support",
    title: "Tigrbl support and community",
    description:
      "Find documentation, community help, bug reporting, and project support expectations.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/security",
    title: "Report a Tigrbl security vulnerability",
    description:
      "Follow the project security policy and report suspected vulnerabilities privately.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/privacy",
    title: "Tigrbl website privacy",
    description:
      "How the Tigrbl website handles browser interactions, hosting requests, and links to hosted demos.",
    family: "pages",
    indexable: true,
  },
  {
    path: "/terms",
    title: "Tigrbl website and demo terms",
    description:
      "Conditions for using the Tigrbl website and public demonstration applications.",
    family: "pages",
    indexable: true,
  },
];
export const NOT_FOUND: PageRecord = {
  path: "/404",
  title: "Page not found — Tigrbl",
  description:
    "This Tigrbl page does not exist. Browse documentation, examples, and demos.",
  family: "pages",
  indexable: false,
};
export function normalizePath(path: string) {
  return path === "/" ? path : path.replace(/\/+$/, "");
}
export function resolvePage(path: string) {
  return PAGES.find((p) => p.path === normalizePath(path)) || NOT_FOUND;
}
