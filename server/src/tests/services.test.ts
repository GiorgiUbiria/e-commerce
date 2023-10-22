import { describe, expect, it } from 'bun:test'
import { ServiceDB } from '../db'
import { isAuthenticated } from '../middleware/auth/isAuthenticated'
import { jwt } from "@elysiajs/jwt"
import { Elysia } from 'elysia'
import { UserDto } from '../types/types'

const app = new Elysia()
    .decorate("db", new ServiceDB())
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_TOKEN as string,
    }))
    .use(isAuthenticated)
    .get('/users', async (context) => {
        const authUserData = context.authUserData;
        const db = context.db;

        if (authUserData) {
            const users: UserDto[] | Error = await db.getAllUsers();

            return {
                success: true,
                data: users,
                message: "Users retrieved",
            }
        } else {
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            }
        }

    })

describe('Elysia', () => {
    it('return a fail response when unauthorized user tries to access the users', async () => {
        const response = await (await app.handle(
            new Request('http://localhost:3000/users')
        )).json()

        expect(response.success).toBe(false)
    })

    it('return an array of users as a response when the user is authorized and is an admin', async () => {
        const response = await (await app.handle(
            new Request('http://localhost:3000/users', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.PhbC76jfrlBAXgnbeSTgq9BzrkSGXrMhVftlrWAYWt0',
                    'RefreshToken': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.PhbC76jfrlBAXgnbeSTgq9BzrkSGXrMhVftlrWAYWt0'
                }
            })
        )).json()

        expect(response.success).toBe(true)
    })
})
