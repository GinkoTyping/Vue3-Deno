import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

import { initDatabase } from "./database/database.js";

initDatabase();

const router = new Router();
router.get('/', context => {
  context.response.body = "Welcome to dinosaur API!";
});
router.get('/login', context => {
  context.response.body = 'login now';
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  try {
    await next();
  } catch(e) {
    console.log(e.message);
  }
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});
app.listen({ port: 8000 });