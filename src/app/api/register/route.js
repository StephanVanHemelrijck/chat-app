import registerUser from '../../../../utils/auth.js';

export async function POST(req) {
    const body = await req.json();

    const { email, username, password } = body;

    // Register user from function in auth.js
    const userCredential = await registerUser(email, username, password);

    return Response.json({ userCredential });
}
