import { Elysia, t } from "elysia";
import { User } from "../../types/types";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated"

export const user = (app: Elysia) =>
    app.group("user", (app) =>
        app
            .use(isAuthenticated)
            .get("/:id", async (context) => {
                const authUserData = context.authUserData;
                const db = context.db;
                console.log(authUserData)

                if(!authUserData) {
                    console.log("No authUserData")
                    return {
                        success: false,
                        data: null,
                        message: "Unauthorized",
                    }
                } else if(authUserData.id != context.params.id) {
                    console.log("ids are not the same")
                    return {
                        success: false,
                        data: null,
                        message: "Unauthorized",
                    }
                } else {
                    const id = context.params.id;

                    const user: User | Error = await db.getUserById(id);

                    if (!user) {
                        return {
                            success: false,
                            data: null,
                            message: "User not found",
                        }
                    }

                    return {
                        success: true,
                        data: user,
                        message: "User retrieved",
                    }
                }
            }, {
                response: t.Object({
                    success: t.Boolean(),
                    data: t.Optional(t.Object({
                        id: t.Number(),
                        firstName: t.String(),
                        lastName: t.String(),
                        password: t.String(),
                        passwordSalt: t.String(),
                        username: t.String(),
                        email: t.String(),
                        role: t.String(),
                        createdAt: t.String(),
                    })),
                    message: t.String(),
                }),
            })
    )
