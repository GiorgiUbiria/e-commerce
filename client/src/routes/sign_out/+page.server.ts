import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }: any) => {
        cookies.delete('Authorization');
        cookies.delete('RefreshToken');
        cookies.delete('userRole');
        throw redirect(303, '/');
    }
}
