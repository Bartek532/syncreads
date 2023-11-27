// https://stackoverflow.com/a/30753870
const focusableSelector = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(",");

const getFocusableElements = (container: HTMLElement = document.body) =>
  Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).sort(
    (a, b) =>
      Math.sign(
        (a.tabIndex || Number.MAX_SAFE_INTEGER) -
          (b.tabIndex || Number.MAX_SAFE_INTEGER),
      ),
  );

export const focusFirst = (container: HTMLElement) => {
  const elements = getFocusableElements(container);

  elements[0]?.focus();
};
