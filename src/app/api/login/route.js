import { loginUser } from '../../../../utils/auth';

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

    try {
        const userCredential = await loginUser(email, password); // Return user credential

        return Response.json(userCredential);
    } catch (error) {
        console.log(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
