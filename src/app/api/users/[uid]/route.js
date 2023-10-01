import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const usersCollRef = collection(firestore, 'users');

        const q = query(usersCollRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        const user = querySnapshot.docs.map((doc) => doc.data())[0];

        return Response.json(user);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
