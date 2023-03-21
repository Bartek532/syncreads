import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createServer } from "http";
import next from "next";
import { parse } from "url";
import ws from "ws";

import { createContext } from "./src/server/trpc/context";
import { appRouter } from "./src/server/trpc/router/_app";

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url ?? "", true);

      void handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const wss = new ws.Server({ server });
  const handler = applyWSSHandler({ wss, router: appRouter, createContext });

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
  });

  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  wss.on("connection", (ws) => {
    ws.on("error", console.error);
  });

  server.listen(port, () => {
    console.log(`> Server listening on port ${port}`);
  });
});
