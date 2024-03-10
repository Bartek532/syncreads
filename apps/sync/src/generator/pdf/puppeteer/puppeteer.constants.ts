export const PUPPETEER_PROVIDER_FACTORY_TOKEN = Symbol(
  "PUPPETEER_PROVIDER_FACTORY_TOKEN",
);

export const BROWSER_CONFIG = [
  // Required for Docker version of Puppeteer
  "--no-sandbox",
  "--disable-setuid-sandbox",
  // This will write shared memory files into /tmp instead of /dev/shm,
  // because Docker’s default for /dev/shm is 64MB
  "--disable-dev-shm-usage",
];

export const PDF_OPTIONS = {
  format: "A4",
  margin: { top: 20, bottom: 20, left: 20, right: 20 },
  printBackground: true,
  timeout: 0,
} as const;
