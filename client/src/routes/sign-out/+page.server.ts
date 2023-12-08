import { redirect } from '@sveltejs/kit';

export async function load({ cookies }: any) {
    const authorization = cookies.get('Authorization');

    if (!authorization) {
        throw redirect(303, '/')
    }

    await fetch('http://localhost:3000/auth/sign_out', {
        method: 'GET',
        credentials: 'include',
    })

    if (authorization) {
        cookies.delete('Authorization');
        cookies.delete('RefreshToken');
        cookies.delete("userRole")
        cookies.delete("userId")
        throw redirect(303, '/')
    }
}
