import React, { useMemo } from "react";
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-http";
import type { Token, TokenStream } from "prismjs";

// React owns the token spans in both static HTML and hydration. Never mutate the DOM.
Prism.manual = true;
Prism.languages.insertBefore("bash", "function", {
  "project-command": {
    pattern: /(^|[\s;|&])(?:uv|pip|pipx|python|python3|uvicorn)(?=$|[\s;|&])/,
    lookbehind: true,
    alias: "function",
  },
});
// Diagnostic request lists intentionally omit the HTTP-version suffix.
Prism.languages.insertBefore("http", "request-line", {
  "request-method": {
    pattern: /^(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)(?=\s)/m,
    alias: "keyword",
  },
  "request-path": {
    pattern: /(^|[ \t])\/[^\s]+/m,
    lookbehind: true,
    alias: "string",
  },
});
export type CodeLanguage = "python" | "bash" | "json" | "http";
function renderTokens(tokens: TokenStream): React.ReactNode {
  if (typeof tokens === "string") return tokens;
  if (Array.isArray(tokens))
    return tokens.map((token, index) => (
      <React.Fragment key={index}>{renderTokens(token)}</React.Fragment>
    ));
  const token = tokens as Token;
  const aliases =
    typeof token.alias === "string" ? [token.alias] : token.alias || [];
  return (
    <span className={["token", token.type, ...aliases].join(" ")}>
      {renderTokens(token.content)}
    </span>
  );
}
export function SyntaxCode({
  code,
  language,
  inline = false,
}: {
  code: string;
  language: CodeLanguage;
  inline?: boolean;
}) {
  const tokens = useMemo(
    () => Prism.tokenize(code, Prism.languages[language]),
    [code, language],
  );
  return (
    <code
      className={`${inline ? "inline-code " : ""}language-${language}`}
      data-language={language}
    >
      {renderTokens(tokens)}
    </code>
  );
}
