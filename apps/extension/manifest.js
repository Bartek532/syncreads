/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: "en",
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: "__MSG_extensionName__",
  version: packageJson.version,
  description: "__MSG_extensionDescription__",
  permissions: ["activeTab"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  icons: {
    128: "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/contentInjected/index.js"],
      // KEY for cache invalidation
      // css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/contentUI/index.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["icon-128.png", "icon-34.png"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;