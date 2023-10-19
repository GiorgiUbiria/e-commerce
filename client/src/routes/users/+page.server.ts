export async function load({ cookies }: any) {
    const response = await fetch('http://localhost:3000/admin/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Authorization": `${cookies.get('Authorization')}`,
            "RefreshToken": `${cookies.get('RefreshToken')}`
        }
    });

    const data = await response.json();

    return {
       data 
    }
}
