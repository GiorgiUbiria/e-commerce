import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }: any) => {
        const data = await request.formData()

        const serviceName = data.get('serviceName');
        const price = data.get('price');
        const description = data.get('description');

        try {
            const result = await fetch('http://localhost:3000/services/create_service', {
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
            
            if(result.status === 200) {
                throw redirect(303, '/services');
            } else {
                throw new Error(String(result.status))
            }
        } catch (error) {
            console.log(error)
        }
    }
};

