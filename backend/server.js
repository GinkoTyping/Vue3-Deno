import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

import { initDatabase } from "./database/database.js";
import setMemberRoutes from "./route/member.route.js";
import setLinkRoutes from "./route/link.route.js";

initDatabase();

const router = new Router();
const app = new Application();
app.use(oakCors());

// Set routes
setMemberRoutes(router);
setLinkRoutes(router);
app.use(router.routes());
app.use(router.allowedMethods());

// Consoles
app.addEventListener("error", (evt) => {
  console.log(evt.error);
});
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

// Start sever
app.listen({ port: 8000 });