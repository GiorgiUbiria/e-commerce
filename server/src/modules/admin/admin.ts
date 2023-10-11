import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { ServiceDB } from "../../db";

export const admin = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: 'afrikelBavshvebsWyaliAkliat'
    }))
    .use(cookie())
    .decorate("db", new ServiceDB())
    .get("/admin/users", ({ db }) =>
        db.getAllUsers()
    )
    .post(
        "/create_service",
        ({ db, body }: any) => {
            const { serviceName, price, description } = body;
            return db.createService({ serviceName, price, description });
        },
    )
