import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import "@/pages/panel/index.css";
import Panel from "@/pages/panel/Panel";

refreshOnUpdate("pages/panel");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
