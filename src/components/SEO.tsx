/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";

interface SEOProps {
  currentView: string;
}

export function SEO({ currentView }: SEOProps) {
  useEffect(() => {
    // 1. Establish page-specific static metadata configurations
    let title = "Tigrbl (mdwrk) — Schema-First ASGI Python Framework";
    let description = "Schema-first ASGI framework and Python package family for defining operations once and projecting them across multiple protocols, validation, and execution engines.";
    let keywords = "tigrbl, mdwrk, python, asgi, schema-first, rest api, json-rpc, websocket, sse, openapi, postgres, orm, developer-framework";
    let ogType = "website";
    const canonicalBase = "https://tigrbl.com";
    let canonicalPath = "/";

    // Build unique page attributes based on navigation state
    switch (currentView) {
      case "home":
        title = "Tigrbl (mdwrk) — Schema-First ASGI Python Framework";
        description = "Define API operations once. Project transparently across REST, JSON-RPC, SSE, and WebSocket channels with compile-time ASGI execution plans.";
        canonicalPath = "/";
        break;
      case "how-it-works":
        title = "Technical Architecture — Tigrbl (mdwrk)";
        description = "Explore the progressive 4-Stage Intent Compilation Pipeline of the Tigrbl / mdwrk framework: Author, Describe, Plan, and Execute.";
        canonicalPath = "/how-it-works";
        ogType = "article";
        break;
      case "ecosystem":
        title = "Package Ecosystem Explorer — Tigrbl (mdwrk)";
        description = "Discover the modular packages comprising the Tigrbl/mdwrk family: core engines, declarative ORM, postgres transactors, and client SDKs.";
        canonicalPath = "/ecosystem";
        break;
      case "releases":
        title = "Release Registry & Changelogs — Tigrbl (mdwrk)";
        description = "Track release lifecycles, environment limits, stability grades, and detailed version change-sets. Recommended: stable Alpha release v0.4.4.";
        canonicalPath = "/releases";
        break;
      case "examples":
        title = "Interactive Python API Examples — Tigrbl (mdwrk)";
        description = "Learn from tested, ready-to-run Tigrbl code examples: Minimal health-checks, table CRUD, schema validation, compile-time plans, and SSE stream loops.";
        canonicalPath = "/examples";
        break;
      case "get-started":
        title = "Get Started & Installation Onboarding — Tigrbl (mdwrk)";
        description = "Verify prerequisite environments, install packages via pip/uv, and embark on our step-by-step interactive developer onboarding guide.";
        canonicalPath = "/get-started";
        break;
      default:
        break;
    }

    const fullUrl = `${canonicalBase}${canonicalPath}`;

    // 2. Perform DOM mutations for metadata headers
    document.title = title;

    // Helper to query/create/update tag
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    const setLinkTag = (relVal: string, hrefVal: string) => {
      let element = document.querySelector(`link[rel="${relVal}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relVal);
        document.head.appendChild(element);
      }
      element.setAttribute("href", hrefVal);
    };

    // Update standard headers
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // Update Open Graph (OG) headers
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", fullUrl);
    setMetaTag("property", "og:image", "https://tigrbl.com/favicon.svg");
    setMetaTag("property", "og:site_name", "Tigrbl (mdwrk)");

    // Update Twitter Card headers
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", "https://tigrbl.com/favicon.svg");

    // Set canonical link
    setLinkTag("canonical", fullUrl);

    // 3. Assemble and inject corresponding Schema.org JSON-LD scripts
    const schemas: any[] = [];

    // BASE ORGANIZATION SCHEMA (Appears globally)
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://tigrbl.com/#organization",
      "name": "Tigrbl Open Source Group",
      "alternateName": ["mdwrk team", "mdwrk group"],
      "url": "https://tigrbl.com",
      "logo": "https://tigrbl.com/favicon.svg",
      "sameAs": [
        "https://github.com/tigrbl"
      ]
    };
    schemas.push(orgSchema);

    // PAGE-SPECIFIC STRUCTURAL SCHEMAS
    if (currentView === "home") {
      // SoftwareApplication Schema (Primary)
      const appSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://tigrbl.com/#software-application",
        "name": "Tigrbl",
        "alternateName": ["mdwrk", "mdwrk framework", "tigrbl framework"],
        "operatingSystem": "Cross-platform",
        "applicationCategory": "DeveloperApplication",
        "downloadUrl": "https://pypi.org/project/tigrbl/",
        "softwareVersion": "0.4.4",
        "license": "https://opensource.org/licenses/Apache-2.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@id": "https://tigrbl.com/#organization"
        },
        "description": "Schema-first ASGI framework and Python package family for defining operations once and compiling/projecting them across REST, JSON-RPC, SSE, and WebSockets."
      };

      // SoftwareSourceCode Schema (Repository)
      const codeRepoSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": "Tigrbl Repository",
        "codeRepository": "https://github.com/tigrbl/tigrbl",
        "programmingLanguage": "Python",
        "runtimePlatform": "Python 3.10, Python 3.11, Python 3.12, Python 3.13, Python 3.14",
        "license": "https://opensource.org/licenses/Apache-2.0"
      };

      schemas.push(appSchema, codeRepoSchema);
    }

    else if (currentView === "how-it-works") {
      // TechArticle Schema for architecture documentation
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "The Four-Stage Intent Compilation Pipeline of the Tigrbl (mdwrk) Framework",
        "description": "An architectural breakdown of Tigrbl's progressive compilation pipeline which transforms Python decorators and schema models into optimized, statically verifiable pre-boot execution dispatch trees.",
        "datePublished": "2026-07-11",
        "dateModified": "2026-07-11",
        "author": {
          "@type": "Organization",
          "name": "Tigrbl Core Maintainers"
        },
        "publisher": {
          "@id": "https://tigrbl.com/#organization"
        },
        "articleSection": "Framework Compiler Architecture",
        "dependencies": "Python >= 3.10"
      };
      schemas.push(articleSchema);
    }

    else if (currentView === "ecosystem") {
      // SoftwareApplications for ecosystem packages
      const pkgCore = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "tigrbl-core",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cross-Platform",
        "description": "Underlying ASGI core wrappers, request validators, and global route compilers for the Tigrbl (mdwrk) suite.",
        "downloadUrl": "https://pypi.org/project/tigrbl-core/"
      };
      const pkgKernel = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "tigrbl-kernel",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cross-Platform",
        "description": "Pre-boot execution planner compiling operational signatures into step-by-step dispatch logs.",
        "downloadUrl": "https://pypi.org/project/tigrbl-kernel/"
      };
      const pkgOrm = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "tigrbl-orm",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cross-Platform",
        "description": "Declarative database schema builder compiling class properties into database tables and parameter validation structures."
      };
      schemas.push(pkgCore, pkgKernel, pkgOrm);
    }

    else if (currentView === "releases") {
      // SoftwareApplication focus on version release tracking
      const releaseSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Tigrbl Framework",
        "softwareVersion": "0.4.4",
        "releaseDate": "2026-06-27",
        "description": "Stable Alpha release solving version drift across PyPI modules, optimizing ORM schema boundary builders, and stabilizing WebSocket framing controls.",
        "downloadUrl": "https://pypi.org/project/tigrbl/0.4.4/",
        "license": "https://opensource.org/licenses/Apache-2.0"
      };
      schemas.push(releaseSchema);
    }

    else if (currentView === "examples") {
      // Multiple SoftwareSourceCode entries for the technical code playgrounds
      const codeEx1 = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": "Minimal Health Operation (Tigrbl)",
        "codeRepository": "https://github.com/tigrbl/tigrbl/blob/main/examples/health.py",
        "programmingLanguage": "Python",
        "runtimePlatform": "Python >= 3.10",
        "text": `from tigrbl import TigrblApp\n\napp = TigrblApp()\n\n@app.get("/health")\ndef health() -> dict[str, str]:\n    return {"status": "ok"}`
      };
      const codeEx2 = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": "Table-Backed Multi-Protocol CRUD (Tigrbl)",
        "codeRepository": "https://github.com/tigrbl/tigrbl/blob/master/examples/equivalence_contracts/src/tigrbl_equivalence_contracts/equivalences/rest_json_rpc_oltp_table/tigrbl_impl.py",
        "programmingLanguage": "Python",
        "runtimePlatform": "Python >= 3.10",
        "text": `from sqlalchemy import Column, String\nfrom tigrbl import RestJsonRpcTable, TigrblApp\n\nclass User(RestJsonRpcTable):\n    __tablename__ = "users"\n    id = Column(String, primary_key=True)\n    name = Column(String, nullable=False)\n\napp = TigrblApp(engine={"kind": "sqlite", "mode": "memory", "async": False})\napp.include_table(User)\napp.initialize()\napp.mount_jsonrpc(prefix="/rpc")`
      };
      schemas.push(codeEx1, codeEx2);
    }

    else if (currentView === "get-started") {
      // FAQPage schema reflecting the essential developer evaluation questions
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What Python versions are supported by Tigrbl (mdwrk)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tigrbl officially supports Python versions >= 3.10, and < 3.15, encompassing stable runtimes for Python 3.10, 3.11, 3.12, 3.13, and the 3.14 alpha release."
            }
          },
          {
            "@type": "Question",
            "name": "Under which open-source license is the Tigrbl package family distributed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tigrbl is distributed under the permissive Apache-2.0 open-source license, facilitating seamless commercial and personal usage."
            }
          },
          {
            "@type": "Question",
            "name": "Can I build a real, high-performance API quickly with the public facade?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Tigrbl features a unified high-level developer contract. You import directly from the main 'tigrbl' package, keeping secondary framework layers completely abstract until custom extensions demand them."
            }
          },
          {
            "@type": "Question",
            "name": "Can the framework align REST and JSON-RPC multi-protocol structures in one codebase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A semantic operation can carry both REST and JSON-RPC binding specifications. Verify the generated OpenAPI, OpenRPC, and runtime diagnostics for the Tigrbl version you deploy."
            }
          },
          {
            "@type": "Question",
            "name": "How does Tigrbl ensure execution predictability and trace auditing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tigrbl compiles route signatures and middleware bindings into statically queryable step-by-step pre-boot logs and execution logs prior tolive ASGI server startup, enabling thorough trace auditing and troubleshooting."
            }
          }
        ]
      };
      schemas.push(faqSchema);
    }

    // 4. Inject script tags containing JSON-LD schemas
    // Clean old schema scripts
    const oldScripts = document.querySelectorAll("script[data-schema-id^='seo-schema-']");
    oldScripts.forEach(script => script.remove());

    // Inject all compiled schemas
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema-id", `seo-schema-${index}`);
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const addedScripts = document.querySelectorAll("script[data-schema-id^='seo-schema-']");
      addedScripts.forEach(script => script.remove());
    };
  }, [currentView]);

  return null; // This is a utility header-injection component that renders no UI elements
}
