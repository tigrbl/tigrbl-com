export const siteContent = {
  product: {
    name: "Tigrbl",
    slug: "tigrbl-com",
    tagline: "Governed API and runtime primitives for durable Python systems.",
    description: "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications.",
    category: "Product website",
    canonicalUrl: "https://tigrbl.com"
  },
  theme: { id: "default", label: "Default", mode: "light", tokens: { accent: "#111827" } },
  nav: {
    primary: [
      { label: "Platform", href: "/platform/" },
      { label: "Proof", href: "/proof/" },
      { label: "Docs", href: "https://docs.tigrbl.com" }
    ],
    cta: { label: "Get started", href: "/platform/" }
  },
  footer: {
    note: "Tigrbl is maintained by tigrbl.",
    links: [
      { label: "GitHub", href: "https://github.com/tigrbl/tigrbl-com" },
      { label: "Docs", href: "https://docs.tigrbl.com" }
    ]
  },
  ai: {
    llmsTxtTitle: "Tigrbl",
    coreFacts: [
      "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications.",
      "The canonical website is https://tigrbl.com.",
      "The site is deployed as a self-hosted Docker static site."
    ]
  },
  pages: [
    {
      slug: "/",
      kind: "home",
      title: "Tigrbl | Governed API and runtime primitives for durable Python systems.",
      description: "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications.",
      h1: "Tigrbl",
      intro: "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications. The site packages product positioning, structured metadata, and deployment evidence in a standalone MdWrk lander repository.",
      sections: [
        { id: "hero", kind: "hero", eyebrow: "Tigrbl", title: "Governed API and runtime primitives for durable Python systems.", subtitle: "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications." },
        { id: "platform", kind: "feature_grid", title: "What this site owns", items: [
          { title: "Product narrative", description: "Canonical product messaging, audience positioning, and calls to action for tigrbl.com." },
          { title: "Structured discovery", description: "Search, assistant, social, and linked-data metadata generated from the content pack." },
          { title: "Independent deploys", description: "CI, Docker deployment, and Namecheap DNS live in this repository." }
        ] },
        { id: "proof", kind: "proof_matrix", title: "Operational proof", items: [
          { claim: "The site is independently buildable.", status: "planned", evidence: "npmctl build delegates to the local npm build and Docker image build." },
          { claim: "DNS ownership is explicit.", status: "planned", evidence: "site.manifest.json records the Namecheap zone and records owned by this repository." }
        ] },
        { id: "cta", kind: "cta", title: "Build from source", body: "Use npmctl install, npmctl check, npmctl build, npmctl dns:plan, and npmctl deploy:dry-run before publishing." }
      ],
      schema: [
        { kind: "Organization", data: { name: "Tigrbl", url: "https://tigrbl.com" } },
        { kind: "WebSite", data: { name: "Tigrbl", url: "https://tigrbl.com" } }
      ]
    },
    {
      slug: "/platform/",
      kind: "feature",
      title: "Tigrbl platform",
      description: "Platform overview for Tigrbl.",
      h1: "Platform",
      intro: "This page captures the platform surface that the Tigrbl website introduces to operators, builders, and technical evaluators.",
      sections: [
        { id: "details", kind: "feature_detail", title: "Repository-owned site system", body: "The lander is intentionally thin: the application host renders a typed content pack, while metadata, sitemap, robots, and Docker deployment remain repo-local.", items: [
          { title: "MdWrk lander", description: "Reusable page sections and structured-data support." },
          { title: "Content pack", description: "Product-specific content, navigation, metadata, and discovery outputs." }
        ] },
        { id: "faq", kind: "faq", title: "Platform FAQ", items: [
          { question: "Where is this site deployed?", answer: "It is built as a static site and served by a self-hosted Docker service." },
          { question: "Who owns DNS?", answer: "This repository owns its declared Namecheap records through the DNS workflow." }
        ] }
      ]
    },
    {
      slug: "/proof/",
      kind: "package",
      title: "Tigrbl proof",
      description: "Build, DNS, and deployment proof for Tigrbl.",
      h1: "Proof",
      intro: "The proof page gives operators a quick inventory of the commands and artifacts required before publication.",
      sections: [
        { id: "commands", kind: "package_grid", title: "Verification commands", packages: [
          { name: "Install", description: "Install deterministic dependencies.", install: "npmctl install", api: ["npm ci"] },
          { name: "Check", description: "Run type and content-pack checks.", install: "npmctl check", api: ["npm run check"] },
          { name: "Build", description: "Build the content pack and static site.", install: "npmctl build", api: ["npm run build"] },
          { name: "DNS plan", description: "Render the Namecheap record plan.", install: "npmctl dns:plan", api: ["npm run dns:plan"] }
        ] }
      ]
    }
  ]
};

export default siteContent;
