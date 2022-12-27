import type { PDFOptions } from "puppeteer";

export const PDF_OPTIONS = {
  margin: { top: "25px", right: "15px", bottom: "25px", left: "15px" },
  printBackground: true,
  format: "A4",
} as PDFOptions;
