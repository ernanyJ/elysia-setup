import { Elysia, Context } from "elysia";
import { auth } from "./lib/auth";
import openapi from "@elysiajs/openapi";
import { betterAuth } from "./middlewares/better-auth";


const app = new Elysia()
  .use(betterAuth)
  .use(openapi())
  .get("/", () => "Hello World!", {
    auth: true
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);