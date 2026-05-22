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
    compactLinks: [
      { label: "Platform", href: "/platform/" },
      { label: "Docs", href: "https://docs.tigrbl.com" },
      { label: "Reviewable contracts", href: "/articles/contract-first-apis-stay-reviewable/" },
      { label: "Publication lane", href: "/articles/the-tigrbl-site-proves-its-own-publication-lane/" }
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
        { id: "hero", kind: "hero", eyebrow: "Contract-first runtime", title: "Governed API and runtime primitives for durable Python systems.", subtitle: "Tigrbl brings explicit contracts, runtime operations, and traceable service surfaces to Python applications." },
        { id: "platform", kind: "feature_grid", title: "What this site owns", items: [
          { title: "Product narrative", description: "Canonical product messaging, audience positioning, and calls to action for tigrbl.com." },
          { title: "Structured discovery", description: "Search, assistant, social, and linked-data metadata generated from the content pack." },
          { title: "Independent deploys", description: "CI, Docker deployment, and Namecheap DNS live in this repository." }
        ] },
        { id: "proof", kind: "proof_matrix", title: "Operational proof", items: [
          { claim: "The site is independently buildable.", status: "planned", evidence: "npm run build produces the local static artifact and Docker image build input." },
          { claim: "DNS ownership is explicit.", status: "planned", evidence: "site.manifest.json records the Namecheap zone and records owned by this repository." }
        ] },
        { id: "cta", kind: "cta", title: "Build from source", body: "Use npm ci, npm run check, npm run build, npm run dns:plan, and npm run proxy:plan before publishing." }
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
          { name: "Install", description: "Install deterministic dependencies.", install: "npm ci", api: ["npm ci"] },
          { name: "Check", description: "Run type and content-pack checks.", install: "npm run check", api: ["npm run check"] },
          { name: "Build", description: "Build the content pack and static site.", install: "npm run build", api: ["npm run build"] },
          { name: "DNS plan", description: "Render the Namecheap record plan.", install: "npm run dns:plan", api: ["npmctl plan desired-state/dns.yaml"] }
        ] }
      ]
    },
    {
      slug: "/articles/contract-first-apis-stay-reviewable/",
      kind: "feature",
      title: "Contract-first APIs stay reviewable | Tigrbl",
      description: "Why Tigrbl emphasizes explicit contracts, runtime operations, and visible service boundaries before publication.",
      h1: "Contract-first APIs stay reviewable.",
      intro: "Tigrbl’s core value is not just that it can power Python services. The stronger value is that service behavior stays reviewable because contracts, runtime operations, and publication evidence remain explicit instead of being reconstructed later from code and infrastructure drift.",
      sections: [
        { id: "surface", kind: "feature_detail", title: "The public surface starts with explicit contracts", body: "The repo copy, the platform page, and the operator commands all point in the same direction: Tigrbl is about making API and runtime boundaries visible enough to inspect. That makes contracts durable, keeps runtime behavior legible, and lowers the amount of guesswork required during change review.", items: [
          { title: "Contract-shaped APIs", description: "The product is framed around explicit interfaces and runtime surfaces rather than ad hoc service behavior." },
          { title: "Visible operations", description: "Runtime behavior is treated as something that should be reviewable, not merely observed after deployment." },
          { title: "Close-coupled proof", description: "Build, Docker, proxy, and DNS evidence live beside the site that describes the product." }
        ] },
        { id: "proof", kind: "proof_matrix", title: "Signals already present in the repo", items: [
          { claim: "The content model is typed and buildable.", status: "observed", evidence: "The site requires the content pack to build and test before the app build completes." },
          { claim: "Operators get named pre-publication commands.", status: "observed", evidence: "The repo exposes `check`, `build`, `dns:plan`, and `proxy:plan` instead of hiding publication behind one opaque script." },
          { claim: "Publication boundaries remain explicit.", status: "observed", evidence: "The Docker service, desired-state files, and GitHub workflows all live in the repo." }
        ] },
        { id: "faq", kind: "faq", title: "What this means for teams", items: [
          { question: "Why does contract-first matter at the site layer?", answer: "Because the site is part of the same trust boundary. If the product claims explicit contracts, the publication lane should be explicit too." },
          { question: "What does Tigrbl optimize for?", answer: "Reviewable service behavior, stable boundaries, and runtime operations that can be inspected before they become production assumptions." },
          { question: "What should a reader take away?", answer: "That Tigrbl is intended for teams who want Python service behavior to stay durable and explainable over time." }
        ] }
      ]
    },
    {
      slug: "/articles/the-tigrbl-site-proves-its-own-publication-lane/",
      kind: "feature",
      title: "The tigrbl.com site proves its own publication lane | Tigrbl",
      description: "How the tigrbl.com repository keeps build, Docker, DNS, proxy, and deploy state close to the public site.",
      h1: "The tigrbl.com site proves its own publication lane.",
      intro: "The tigrbl.com repository is not only a content host. It is also the place where the public site’s build, Docker target, proxy state, and DNS state are defined and checked. That keeps the publication lane auditable and consistent with the product’s contract-first posture.",
      sections: [
        { id: "ownership", kind: "feature_detail", title: "Publication evidence belongs with the published surface", body: "When DNS and proxy state live outside the repo, reviewers need to trust undocumented operator context. This repository reduces that gap by keeping the deployment surface local: the site has its own Docker service, deploy helper scripts, desired-state files, and CI/deploy workflows.", items: [
          { title: "Dedicated Docker target", description: "The repo deploys the `tigrbl-com` service explicitly." },
          { title: "Separate DNS and deploy workflows", description: "The publication path is split into named workflow lanes instead of being implied." },
          { title: "Desired-state operations", description: "Proxy and DNS changes are represented as plan/apply flows over checked-in files." }
        ] },
        { id: "commands", kind: "package_grid", title: "Operator commands called out by the repo", packages: [
          { name: "Check", description: "Verifies the content pack and application surface.", install: "npm run check", api: ["npm run check"] },
          { name: "Build", description: "Produces the static site and the Docker input surface.", install: "npm run build", api: ["npm run build"] },
          { name: "DNS plan", description: "Shows intended DNS changes before apply.", install: "npm run dns:plan", api: ["npmctl plan desired-state/dns.yaml"] },
          { name: "Proxy plan", description: "Shows intended proxy changes before apply.", install: "npm run proxy:plan", api: ["npmctl plan desired-state/proxy.yaml"] }
        ] },
        { id: "cta", kind: "cta", title: "Read the repo as operational proof", body: "For Tigrbl, the site repo is part of the product argument. It shows that the publication lane can be named, inspected, and reviewed instead of being treated as invisible operator glue." }
      ]
    }
  ]
};

export default siteContent;
