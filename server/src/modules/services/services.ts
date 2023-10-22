import { Elysia } from "elysia"
import jwt from "@elysiajs/jwt"
import cookie from "@elysiajs/cookie"
import { ServiceDB } from "../../db"
import { isAuthenticated } from "../../middleware/auth/isAuthenticated"
import { Service } from "../../types/types"

export const services = (app: Elysia) =>
    app.group("services", (app) =>
        app.use(jwt({
            name: 'jwt',
            secret: Bun.env.JWT_TOKEN as string,
        }))
            .use(cookie())
            .decorate("db", new ServiceDB())
            .use(isAuthenticated)
            .get("/", async (context) => {
                const authUserData = context.authUserData;
                const db = context.db;

                if (authUserData.role === "admin") {
                    const services: Service[] | Error = await db.getAllServices();

                    if (!services) {
                        return {
                            success: true,
                            data: null,
                            message: "Services retrieved",
                        }
                    }

                    return {
                        success: true,
                        data: services,
                        message: "Services retrieved",
                    }
                }
            })
            .post(
                "/create_service",
                async (context) => {
                    const authUserData = context.authUserData;
                    const db = context.db;
                    const body: any = context.body;

                    const { serviceName, price, description } = body;

                    if (authUserData.role !== "admin") {
                        return {
                            success: false,
                            data: null,
                            message: "Unauthorized",
                        }
                    } else {
                        const service = await db.createService({ serviceName, price, description });
                        return {
                            success: true,
                            data: service,
                            message: "Service created",
                        }
                    }
                },
            )
    )
