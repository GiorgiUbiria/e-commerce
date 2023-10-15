import { redirect } from '@sveltejs/kit';
import { edenFetch } from '@elysiajs/eden'
import type { App } from '../../../../server/src/index'

const fetch = edenFetch<App>('http://localhost:3000/')

export const actions = {
    default: async ({ request, cookies }: any) => {
        const data = await request.formData();

        const username = data.get('username');
        const password = data.get('password');

        try {
            const response = await fetch('auth/sign_in', {
                method: 'POST',
                body: {
                    username,
                    password,
                },
                credentials: 'include',
            })

            const setCookie = response.headers.getSetCookie();

            if (response?.data?.success) {
                console.log(setCookie[0].split('=')[1].split(';')[0])
                cookies.set("Authorization", `Bearer ${setCookie[0].split('=')[1].split(';')[0]}`);
                throw redirect(303, '/')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
};
