export const globalCss = `
p {
  margin-top: 1em;
  margin-bottom: 1em;
}

ul, ol {
  padding: 1em;
}

ul li, ol li {
  margin-left: 1.5em;
  padding-left: 0.5em;
}

figcaption {
  font-size: 0.5rem;
  font-style: italic;
}
`;

export const codeEnvironmentCss = `
pre, code {
  font-family: "Noto Mono", monospace;
  font-size: 0.8em;
  background-color: #f2f2f2;
}

pre {
  white-space: pre-wrap;
  text-align: left !important;
}
`;

export const css = globalCss + codeEnvironmentCss;
