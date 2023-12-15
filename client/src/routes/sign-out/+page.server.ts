import { redirect } from '@sveltejs/kit';

export async function load({ cookies }: any) {
    const authorization = cookies.get('Authorization');

    if (!authorization) {
        redirect(303, '/');
    }

    await fetch('http://localhost:3000/auth/sign_out', {
        method: 'GET',
        credentials: 'include',
    })

    if (authorization) {
        /* @migration task: add path argument */ cookies.delete('Authorization');
        /* @migration task: add path argument */ cookies.delete('RefreshToken');
        /* @migration task: add path argument */ cookies.delete("userRole")
        /* @migration task: add path argument */ cookies.delete("userId")
        redirect(303, '/');
    }
}
