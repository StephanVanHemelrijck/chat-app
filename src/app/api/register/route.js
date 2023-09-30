import { registerUser } from '../../../../utils/auth.js';

export async function POST(req) {
    const body = await req.json();

    const { email, username, password } = body;

    // Register user from function in auth.js
    try {
        const userCredential = await registerUser(email, username, password);

        console.log(userCredential);

        // Return user credential
        return Response.json(userCredential);
    } catch (error) {
        console.log(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
