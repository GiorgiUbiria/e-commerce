import { describe, expect, it } from 'bun:test'
import { ServiceDB } from '../db'
import { isAuthenticated } from '../middleware/auth/isAuthenticated'
import { jwt } from "@elysiajs/jwt"
import { Elysia } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { Service } from '../types/types'

const app = new Elysia()
    .decorate("db", new ServiceDB())
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_TOKEN as string,
    }))
    .use(cookie())
    .get("/services", async (context) => {
        const db = context.db;

        try {
            const services: Service[] | Error = await db.getAllServices();

            if (!services) {
                return {
                    success: true,
                    data: [],
                    message: "Services retrieved",
                }
            }

            return {
                success: true,
                data: services,
                message: "Services retrieved",
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error,
            }
        }
    })
    .get("/services/:id", async (context) => {
        const db = context.db;

        const id = context.params.id;

        const service: Service | Error = await db.getService(id);

        if (service instanceof Error) {
            return {
                success: false,
                data: null,
                message: "Service not found",
            }
        }

        return {
            success: true,
            data: service,
            message: "Service retrieved",
        }
    })

describe('Elysia', () => {
    it('return an array of services as a response if there are available services', async () => {
        const response = await app.handle(
            new Request('http://localhost:3000/services', {
                method: 'GET',
                credentials: 'include',
            })
        )

        const data = await response.json()

        expect(data.success).toBe(true)
    })

    it('return a service if the there is a correct id', async () => {
        const response = await app.handle(
            new Request('http://localhost:3000/services/1', {
                method: 'GET',
                credentials: 'include',
            })
        )

        const data = await response.json()

        expect(data.success).toBe(true)
    })

    it('return a fail if the there is not a correct id', async () => {
        const response = await app.handle(
            new Request('http://localhost:3000/services/9831532511', {
                method: 'GET',
                credentials: 'include',
            })
        )

        const data = await response.json()

        expect(data.success).toBe(false)
    })

    it('return a fail if the user is not authorized while creating the service', async () => {
        const response = await app.handle(
            new Request('http://localhost:3000/services/create_service', {
                method: 'GET',
                credentials: 'include',
            })
        )

        const data = await response.json()

        expect(data.success).toBe(false)
    })
})
