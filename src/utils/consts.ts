import { env } from "../env/server.mjs";

export const PDF_OPTIONS = {
  format: "A4",
  margin: { top: 30, bottom: 30, left: 30, right: 30 },
  printBackground: true,
} as const;

export const BROWSER_OPTIONS = {
  executablePath: env.CHROME_BIN,
  args: [
    // Required for Docker version of Puppeteer
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    "--disable-dev-shm-usage",
  ],
};
