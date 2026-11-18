import React from "react";
import { Header, Footer } from "./components/Shell";
import { View } from "./components/Views";
import { resolvePage } from "./content/pages";
export default function App({ path = "/" }: { path?: string }) {
  const page = resolvePage(path);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={page.path} />
      <main
        id="main"
        className={page.path === "/" ? "" : "wrap page"}
        tabIndex={-1}
      >
        <View page={page} />
      </main>
      <Footer />
    </>
  );
}
