export const load = async () => {
    const response = await fetch('http://localhost:3000/services')

    const services: any = await response.json()

    return {
        services
    }
}
