import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

import { initDatabase } from "./database/database.js";
import setMemberRoutes from "./route/member.route.js";

initDatabase();

const router = new Router();
const app = new Application();
app.use(oakCors());

setMemberRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

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
app.listen({ port: 8000 });