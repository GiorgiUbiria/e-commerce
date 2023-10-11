export async function load() {
    const response = await fetch('http://localhost:3000/');

    const text = await response.text();

    return {
        text
    }
}
