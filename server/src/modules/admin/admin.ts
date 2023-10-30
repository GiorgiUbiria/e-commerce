import { Elysia } from "elysia";

import { UserDto } from "../../types/types";

import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

export const adminRoute = (app: Elysia) =>
    app.group("admin", (app) =>
        app
            .get("/", async () => {
                return "Hello, World!"
            })
            .use(isAuthenticated)
            .get("/users", async (context) => {
                const authUserData = context.authUserData;
                const db = context.db;

                if (authUserData) {
                    const users: UserDto[] | Error = await db.getAllUsers();

                    if (!users) {
                        return {
                            success: true,
                            data: [],
                            message: "Users retrieved",
                        }
                    }

                    return {
                        success: true,
                        data: users,
                        message: "Users retrieved",
                    }
                }
            })
    )
