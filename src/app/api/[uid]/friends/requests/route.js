import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const friendRequestsCollRef = collection(firestore, 'friendRequests');

        const q = query(friendRequestsCollRef, or(where('requestTo', '==', uid), where('requestFrom', '==', uid)));
        const querySnapshot = await getDocs(q);

        const friendRequests = [];
        querySnapshot.forEach((doc) => {
            friendRequests.push(doc.data());
        });

        return Response.json(friendRequests);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
