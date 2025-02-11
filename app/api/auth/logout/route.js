
export async function GET(req) {
    const response = new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    // Clear the token by setting an expired cookie
    response.headers.append('Set-Cookie', 'token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:01 GMT;');

    return response;
}
