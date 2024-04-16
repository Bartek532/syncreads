export const PUPPETEER_PROVIDER_FACTORY_TOKEN = Symbol(
  "PUPPETEER_PROVIDER_FACTORY_TOKEN",
);

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

export const LISTS_TO_BLOCK_FROM = [
  "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt",
  "https://easylist.to/easylist/easylist.txt",
];

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
  margin: { top: 25, bottom: 25, left: 25, right: 25 },
  printBackground: true,
  timeout: 0,
} as const;
