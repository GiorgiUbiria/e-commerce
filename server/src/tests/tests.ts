import { Elysia } from "elysia"
import { describe, expect, it } from 'bun:test'

describe('Elysia', () => {
    it('return a response', async () => {
        const app = new Elysia()
              .get('/', () => 'hi')

        const response = await app.handle(
            new Request('http://localhost/')
        ).then(res => res.text())

        expect(response).toBe('hi')
    })
})
