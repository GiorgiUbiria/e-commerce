import { Elysia } from "elysia"
import jwt from "@elysiajs/jwt"
import cookie from "@elysiajs/cookie"
import { ServiceDB } from "../../db"

export const services = (app: Elysia) =>
    app.group("services", (app) =>
        app.use(jwt({
            name: 'jwt',
            secret: 'afrikelBavshvebsWyaliAkliat'
        }))
            .use(cookie())
            .decorate("db", new ServiceDB())
            .get("/", async ({ jwt, set, cookie: { auth }, db }) => {
                const profile = await jwt.verify(auth)

                if (!profile) {
                    set.status = 401
                    return []
                }

                db.getAllServices()
            })
    )
