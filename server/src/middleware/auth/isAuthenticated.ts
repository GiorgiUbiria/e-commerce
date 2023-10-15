import { Elysia } from "elysia";

export const isAuthenticated = (app: Elysia) =>
    app.derive(async ({ db, cookie, jwt, set }: any) => {
        if (!cookie!.accessToken) {
            console.log("Access token not found");
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        console.log("Access token found");

        const { userId } = await jwt.verify(cookie!.accessToken);

        if (!userId) {
            console.log("User not found");
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        const user = await db.getUserById(userId);

        if (!user) {
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        return {
            user
        }
    })
