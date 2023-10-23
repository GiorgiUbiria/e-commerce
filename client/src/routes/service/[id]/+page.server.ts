export async function load({ params }: any) {
    try {
        const response = await fetch(`http://localhost:3000/services/${params.id}`, {
            method: 'GET',
            credentials: 'include',
        })

        if (response.status === 200) {
            const data = await response.json()

            return data.data
        }
    } catch (error) {
        console.log(error)
    }
}
