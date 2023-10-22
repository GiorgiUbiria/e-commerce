export const load = async ({ cookies }: any) => {
    try {
        const response = await fetch('http://localhost:3000/services/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Authorization": `${cookies.get('Authorization')}`,
                "RefreshToken": `${cookies.get('RefreshToken')}`
            }
        })

        if(response.status === 200) {
            const data = await response.json()

            return data
        }
    } catch (error) {
        console.log(error)
    }
}
