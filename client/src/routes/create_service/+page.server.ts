import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }: { request: any }) => {
        const data = await request.formData();

        const serviceName = data.get('serviceName');
        const price = data.get('price');
        const description = data.get('description');

        const result = await fetch('http://localhost:3000/create_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceName,
                price,
                description
            })
        })
    
        throw redirect(303, '/services');
    }
};

