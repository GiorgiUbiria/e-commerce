import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }: { request: any }) => {
        const data = await request.formData();

        const name = data.get('name');
        console.log(name)

        /*
            const result = await fetch(`http://localhost:3000/sign-in`, {
                    method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                })
            })
        */

        const result = await fetch(`http://localhost:3000/sign-in/${name}`, {
            method: 'GET',
        })

        if (result.ok) {
            console.log(await result.text())
            throw redirect(303, '/');
        } else {
            throw redirect(303, '/sign-in');
        }
    }
};
