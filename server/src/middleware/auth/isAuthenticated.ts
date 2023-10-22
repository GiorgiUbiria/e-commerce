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

        const authorizationToken = headers!.authorization.split(" ")[1];

        const { userId } = await jwt.verify(authorizationToken);
        
        if (!userId) {
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        const authUserData = await db.getUserById(userId);

        if (!authUserData) {
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

        console.log("returning authenticated user data")
        return { authUserData }
    })
