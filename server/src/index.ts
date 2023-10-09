import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { ServiceDB } from "./db";
import { cors } from "@elysiajs/cors";

/*
export async function authMiddleware({ jwt, set, cookie: { auth } }: any) {
    const profile = await jwt.verify(auth)

    if (!profile) {
        set.status = 401
        return 'Unauthorized'
    }

    return `Hello ${profile.name}`
}
*/

const app = new Elysia()
    .use(
        cors({
            origin: "*"
        })
    )
    .use(
        jwt({
            name: 'jwt',
            secret: 'africa'
        })
    )
    .use(cookie())
    .decorate("db", new ServiceDB())
    /* 
    .get("/", () => {
         return "";
     }, {
         beforeHandle: authMiddleware
     })
     */
    .get("/", async ({ jwt, set, cookie: { auth } }) => {
        const profile = await jwt.verify(auth)

        if (!profile) {
            set.status = 401
            return 'Unauthorized Vai'
        }

        return `Hello ${profile.name}`
    })
    .get("/services", async ({ jwt, set, cookie: { auth }, db }) => {
        const profile = await jwt.verify(auth)

        if (!profile) {
            set.status = 401
            return []
        }

        db.getAllServices()
    })
    .get("/admin/users", ({ db }) =>
        db.getAllUsers()
    )
    /*
    .post("/sign-in", async ({ jwt, cookie, setCookie, body }) => {
        const { email }: any = body;
        console.log(email)
        setCookie("auth", await jwt.sign(email), {
            httpOnly: true,
            maxAge: 7 * 86400,
        })

        console.log(cookie.auth)
        return `Hello ${cookie.auth}`
    })
    */
    .get("/sign-in/:name", async ({ jwt, cookie, setCookie, params }) => {
        console.log(params.name) //example@example.ex

        setCookie("auth", await jwt.sign(params), {
            httpOnly: true,
            maxAge: 7 * 86400,
        })

        console.log(cookie.auth) //eyJhsdaghf124324dfc.12313...
        return `Hello ${cookie.auth}`
    })
    .post(
        "/create_service",
        ({ db, body }: any) => {
            const { serviceName, price, description } = body;
            return db.createService({ serviceName, price, description });
        },
    )
    .post(
        "/create_user",
        ({ db, body }: any) => {
            const { firstName, lastName, password, username, email } = body;
            return db.createUser({ firstName, lastName, password, email, username });
        },
    )
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
