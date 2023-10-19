export function load({ cookies }: any) {
    const authorization = cookies.get('Authorization');
    const refreshToken = cookies.get('RefreshToken');

    if (authorization && refreshToken) {
        return {
            authorization,
        }
    }
}
