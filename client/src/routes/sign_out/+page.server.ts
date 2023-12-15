import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }: any) => {
        /* @migration task: add path argument */ cookies.delete('Authorization');
        /* @migration task: add path argument */ cookies.delete('RefreshToken');
        /* @migration task: add path argument */ cookies.delete('userRole');
        redirect(303, '/');
    }
}
