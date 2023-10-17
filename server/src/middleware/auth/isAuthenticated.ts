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

        console.log("authorization header: ", authorization)

        const { userId } = await jwt.verify(authorization);

        console.log("userId: ", userId)

        if (!userId) {
            console.log("User not found");
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

        console.log("returning user")

        return { authUserData }
    })
