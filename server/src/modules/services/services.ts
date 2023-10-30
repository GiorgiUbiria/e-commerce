import { Elysia, t } from "elysia"
import { isAuthenticated } from "../../middleware/auth/isAuthenticated"
import { isFormValidated } from "../../middleware/validation/isServiceFormValid"
import { Service } from "../../types/types"

export const services = (app: Elysia) =>
    app.group("services", (app) =>
        app.get("/", async (context) => {
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
        }, {
            response: t.Object({
                success: t.Boolean(),
                data: t.Optional(t.Array(t.Object({
                    serviceName: t.String(),
                    description: t.String(),
                    price: t.Number(),
                }))),
                message: t.String(),
            }),
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
            }, {
                response: t.Object({
                    success: t.Boolean(),
                    data: t.Optional(t.Object({
                        serviceName: t.String(),
                        description: t.String(),
                        price: t.Number(),
                    })),
                    message: t.String(),
                }),
            })
            .use(isFormValidated)
            .use(isAuthenticated)
            .post(
                "/create_service",
                async (context) => {
                    const authUserData = context.authUserData;
                    const db = context.db;

                    const { success, data, message }: { success: boolean, data: null | { serviceName: string; description: string; price: string; }, message: string } = context.formValidationResponse!;

                    if (authUserData.role !== "admin") {
                        return {
                            success: false,
                            data: null,
                            message: "Unauthorized",
                        }
                    } else {
                        if (success === false) {
                            return {
                                success: false,
                                data: null,
                                message: message,
                            }
                        } else {
                            let { serviceName, description, price } = data!;
                            const service = await db.createService({ serviceName, price, description });
                            return {
                                success: true,
                                data: service,
                                message: message,
                            }
                        }
                    }
                })
    )
