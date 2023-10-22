import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

import { ServiceDB } from "../../db";

import { UserDto } from "../../types/types";

import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

export const adminRoute = (app: Elysia) =>
    app.group("admin", (app) =>
        app
            .use(jwt({
                name: 'jwt',
                secret: Bun.env.JWT_TOKEN as string,
            }))
            .use(cookie())
            .decorate("db", new ServiceDB())
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
                            data: null,
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
