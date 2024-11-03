import { Application } from 'https://deno.land/x/oak/mod.ts';
import { Router } from "https://deno.land/x/oak/router.ts";

import { initDatabase } from "./database/database.js";

initDatabase();

const app = new Application();
const router = new Router();

router.get('/login', context => {
  context.response.body = 'login now';
});

// handle error
app.use(async (context, next) => {
  try {
    await next();
  } catch(e) {
    console.log(e.message);
  }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });