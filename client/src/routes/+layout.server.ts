import { redirect } from '@sveltejs/kit';

export async function load({ cookies }: any) {
    const authorization = cookies.get('Authorization');
    const refreshToken = cookies.get('RefreshToken');
    const userRole = cookies.get('userRole');

    if (authorization && refreshToken) {
        return {
            authorization,
            userRole,
        }
    } else if (authorization && !refreshToken) {
        cookies.delete('Authorization');
        throw redirect(303, '/sign-in')
    } else if (!authorization && refreshToken) {
        cookies.set('Authorization', refreshToken, {
            path: '/',
            maxAge: 30 * 60,
        })
    }
}
