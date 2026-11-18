// Build-only module. Keep the schema builder library out of browser bundles.
import {
  organizationNode,
  webSiteSchema,
  webPageSchema,
  collectionPageNode,
  breadcrumbListSchema,
  softwareApplicationNode,
  softwareSourceCodeNode,
  itemListNode,
  techArticleNode,
  jsonLdGraph,
  stableId,
} from "@mdwrk/structured-data";
import { SITE, FACADE } from "./site";
import { DEMOS } from "./demos";
import type { PageRecord } from "./types";

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function pageGraph(page: PageRecord) {
  const url = new URL(page.path, SITE.origin).href;
  const organizationId = stableId(SITE.origin, "organization");
  const siteId = stableId(SITE.origin, "website");
  const breadcrumbs = [
    { label: "Home", href: `${SITE.origin}/` },
    ...(page.path.startsWith("/demos/")
      ? [{ label: "Demos", href: `${SITE.origin}/demos` }]
      : []),
    ...(page.path === "/" ? [] : [{ label: page.title, href: url }]),
  ];
  const nodes = [
    organizationNode({
      id: organizationId,
      name: SITE.name,
      url: SITE.origin,
      logo: `${SITE.origin}/favicon.svg`,
      sameAs: [SITE.organization, SITE.repository],
    }),
    webSiteSchema({
      id: siteId,
      name: SITE.name,
      url: `${SITE.origin}/`,
      publisher: organizationId,
    }),
    breadcrumbListSchema({
      id: stableId(url, "breadcrumbs"),
      items: breadcrumbs,
    }),
  ];
  const list =
    page.path === "/demos"
      ? itemListNode({
          id: stableId(url, "list"),
          name: "Tigrbl demo catalog",
          items: DEMOS.map((d) => ({
            name: d.title,
            url: `${SITE.origin}/demos/${d.id}`,
          })),
        })
      : undefined;
  const demo = DEMOS.find((d) => `/demos/${d.id}` === page.path);
  const primaryId =
    demo && demo.sourceVisibility === "public"
      ? stableId(url, "source")
      : page.path === "/"
        ? stableId(SITE.origin, "software")
        : (list?.["@id"] as string | undefined);
  const pageInput = {
    id: stableId(url, "page"),
    name: page.title,
    description: page.description,
    url,
    isPartOf: siteId,
    breadcrumb: stableId(url, "breadcrumbs"),
    mainEntity: primaryId,
  };
  nodes.push(list ? collectionPageNode(pageInput) : webPageSchema(pageInput));
  if (list) nodes.push(list);
  if (page.path === "/")
    nodes.push(
      softwareApplicationNode({
        id: primaryId,
        name: "Tigrbl",
        description: SITE.description,
        url: SITE.origin,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        softwareVersion: FACADE.publication.version,
        downloadUrl: SITE.pypi,
        license: SITE.license,
        publisher: organizationId,
      }),
    );
  if (demo && demo.sourceVisibility === "public")
    nodes.push(
      softwareSourceCodeNode({
        id: primaryId,
        name: demo.title,
        description: demo.summary,
        url,
        codeRepository: demo.repositoryUrl,
        programmingLanguage: "Python",
        codeSampleType: "Demonstration",
        version: demo.sourceRef,
      }),
    );
  if (page.path === "/how-it-works")
    nodes.push(
      techArticleNode({
        id: stableId(url, "article"),
        name: page.title,
        headline: page.title,
        description: page.description,
        url,
        mainEntityOfPage: stableId(url, "page"),
        publisher: organizationId,
      }),
    );
  return jsonLdGraph(nodes);
}
export function headHtml(page: PageRecord) {
  const url = new URL(page.path, SITE.origin).href;
  const image = SITE.origin + SITE.socialImage;
  const meta = (attribute: "name" | "property", key: string, value: string) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    meta("name", "description", page.description),
    meta(
      "name",
      "robots",
      page.indexable ? "index, follow" : "noindex, follow",
    ),
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<link rel="alternate" type="application/rss+xml" title="Tigrbl releases (RSS)" href="${SITE.origin}/rss.xml">`,
    `<link rel="alternate" type="application/atom+xml" title="Tigrbl releases (Atom)" href="${SITE.origin}/atom.xml">`,
    ...Object.entries({
      "og:title": page.title,
      "og:description": page.description,
      "og:type": page.path === "/how-it-works" ? "article" : "website",
      "og:url": url,
      "og:site_name": SITE.name,
      "og:locale": "en_US",
      "og:image": image,
      "og:image:secure_url": image,
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": SITE.socialImageAlt,
    }).map(([key, value]) => meta("property", key, value)),
    ...Object.entries({
      "twitter:card": "summary_large_image",
      "twitter:title": page.title,
      "twitter:description": page.description,
      "twitter:image": image,
      "twitter:image:alt": SITE.socialImageAlt,
    }).map(([key, value]) => meta("name", key, value)),
    `<script type="application/ld+json">${JSON.stringify(pageGraph(page))
      .replace(/</g, "\\u003c")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")}</script>`,
  ].join("\n");
}
