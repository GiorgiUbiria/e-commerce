import { redirect } from '@sveltejs/kit';
import { edenFetch } from '@elysiajs/eden'

import type { App } from '../../../../server/src/index'

const fetch = edenFetch<App>('http://localhost:3000/')

export const load = async ({cookies}: any) => {
    if (cookies.get("Authorization") || cookies.get("RefreshToken")) {
        console.log("redirecting")
        throw redirect(303, '/')
    }
}

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
                const accessToken = setCookie[0].split('=')[1].split(';')[0];
                const refreshToken = setCookie[1].split('=')[1].split(';')[0];

                cookies.set("Authorization", `Bearer ${accessToken}`, {
                    path: '/',
                    maxAge: 30 * 60,
                });
                cookies.set("RefreshToken", `Bearer ${refreshToken}`, {
                    path: '/',
                    maxAge: 7 * 60 * 60 * 24,
                });
                cookies.set("userRole", response.data.data);

                throw redirect(303, '/')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
};
