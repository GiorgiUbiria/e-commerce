export async function load({ cookies }: any) {
    console.log(cookies.get('Authorization'))
    const response = await fetch('http://localhost:3000/auth/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Authorization": `${cookies.get('Authorization')}`
        }
    });

    const data = await response.json();

    return {
       data 
    }
}
