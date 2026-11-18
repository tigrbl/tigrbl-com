import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./theme.css";
document.documentElement.classList.add("js");
const legacy = window.location.hash.slice(1);
if (
  window.location.pathname === "/" &&
  [
    "home",
    "get-started",
    "how-it-works",
    "ecosystem",
    "examples",
    "demos",
    "releases",
  ].includes(legacy)
) {
  window.location.replace(legacy === "home" ? "/" : `/${legacy}`);
} else {
  const root = document.getElementById("root")!;
  const app = (
    <StrictMode>
      <App path={window.location.pathname} />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
