import { redirect } from '@sveltejs/kit';
import { edenFetch } from '@elysiajs/eden'
import type { App } from '../../../../server/src/index'

const fetch = edenFetch<App>('http://localhost:3000/')

export const actions = {
    default: async ({ request }: any) => {
        const data = await request.formData();

        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const email = data.get('email');
        const username = data.get('username');
        const password = data.get('password');

        console.log(firstName, lastName, email, username, password)

        try {
            const response = await fetch('auth/sign_up', {
                method: 'POST',
                body: {
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                },
                credentials: 'include',
            })

            if (response?.data?.success) {
                console.log("success")
                throw redirect(303, '/')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
};
