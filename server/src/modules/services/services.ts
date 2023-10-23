import { Elysia, t } from "elysia"
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
            .get("/:id", async (context) => {
                const db = context.db;

                const id = context.params.id;

                const service: Service | Error = await db.getService(id);

                if (!service) {
                    return {
                        success: false,
                        data: null,
                        message: "Service not found",
                    }
                }

                return {
                    success: true,
                    data: service,
                    message: "Service retrieved",
                }
            })
            .use(isAuthenticated)
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
                {
                    body: t.Object({
                        serviceName: t.String(),
                        price: t.Number(),
                        description: t.String(),
                    }),
                    response: t.Object({
                        success: t.Boolean(),
                        data: t.Any(),
                        message: t.String(),
                    })
                }
            )
    )
