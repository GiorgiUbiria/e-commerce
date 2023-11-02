import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../../server/src/index'

const app = edenTreaty<App>('http://localhost:3000')

export const load = async ({ cookies }: any) => {
    try {
        const { data, error } = await app.services.get({
            fetch: {
                credentials: 'include',
                headers: {
                    "Authorization": `${cookies.get('Authorization')}`,
                    "RefreshToken": `${cookies.get('RefreshToken')}`
                }
            }
        })

        if (!error) {
            return data;
        } else {
            let newError;
            switch (error.status) {
                case 400:
                case 401:
                    newError = error.value
                    break

                case 500:
                case 502:
                    newError = error.value
                    break

                default:
                    newError = error.value
                    break
            }

            throw newError
        }
    } catch (error) {
        console.log(error)
    }
}
