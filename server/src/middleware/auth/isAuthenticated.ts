import { Elysia } from "elysia";

export const isAuthenticated = (app: Elysia) =>
    app.derive(async ({ db, headers, jwt, set }: any) => {
        if (!headers!.authorization) {
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        const authorization = headers!.authorization.split(" ")[1];

        const { userId } = await jwt.verify(authorization);

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
