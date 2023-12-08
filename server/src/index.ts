import { Elysia } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { logger } from '@bogeychan/elysia-logger';

import { auth } from "./modules/auth/auth";
import { user } from "./modules/user/user";
import { services } from "./modules/services/services";
import { adminRoute } from "./modules/admin/admin";

import { Service } from "./types/types"

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
            secret: Bun.env.JWT_TOKEN as string,
        })
    )
    .use(cookie())
    .get("/", async (context) => {
        const db = context.db;

        try {
            const services: Service[] | Error = await db.getAllServices();

            if (!services) {
                return {
                    success: true,
                    data: [],
                    message: "Services retrieved",
                }
            }

            return {
                success: true,
                data: services,
                message: "Services retrieved",
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error,
            }
        }
    })
    .use(user)
    .use(auth)
    .use(adminRoute)
    .use(services)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
