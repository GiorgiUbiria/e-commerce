export async function load({ cookies }: any) {
    try {
        const response = await fetch('http://localhost:3000/admin/users', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Authorization": `${cookies.get('Authorization')}`,
                "RefreshToken": `${cookies.get('RefreshToken')}`
            }
        });

        if (response.status === 200) {
            const data = await response.json();

            return data;
        } else {
            throw new Error(response.statusText)
        }
    } catch (error) {
        console.log(error)
    }
}
