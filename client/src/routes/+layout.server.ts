import { redirect } from '@sveltejs/kit';

export function load({ cookies }: any) {
    const authorization = cookies.get('Authorization');
    const refreshToken = cookies.get('RefreshToken');
    const userRole = cookies.get('userRole');

    if (authorization && refreshToken) {
        return {
            authorization,
            userRole,
        }
    }
}
