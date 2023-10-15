import { Elysia } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { logger } from '@bogeychan/elysia-logger';

import { auth } from "./modules/auth/auth";
import { services } from "./modules/services/services";
import { admin } from "./modules/admin/admin";
import { ServiceDB } from "./db";

const app = new Elysia()
    .decorate("db", new ServiceDB())
    .use(swagger())
    .use(logger({
        level: "error",
    }))
    .use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    )
    .use(
        jwt({
            name: 'jwt',
            secret: 'afrikelBavshvebsWyaliAkliat'
        })
    )
    .use(cookie())
    .get("/", async () => {
        return "Hello, World!"
    })
    .use(auth)
    .use(services)
    .use(admin)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
