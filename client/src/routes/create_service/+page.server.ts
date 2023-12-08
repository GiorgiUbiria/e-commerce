import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }: any) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const data = await request.formData()

        try {
            const serviceName = data.get('serviceName');
            const price = data.get('price');
            const description = data.get('description');

            await fetch('http://localhost:3000/services/create_service', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${cookies.get('Authorization')}`,
                    "RefreshToken": `${cookies.get('RefreshToken')}`
                },
                body: JSON.stringify({
                    serviceName,
                    price,
                    description
                }),
                credentials: 'include',
            })
        } catch (error) {
            return fail(422, {
                description: (error as Error).message,
                error: (error as Error).message
            })
        }
    }
};
