import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const friendRequestsCollRef = collection(firestore, 'friendRequests');

        const q = query(friendRequestsCollRef, or(where('requestTo', '==', uid), where('requestFrom', '==', uid)));
        const querySnapshot = await getDocs(q);

        const friendRequests = [];
        querySnapshot.forEach((doc) => {
            const friendRequest = { ...doc.data(), id: doc.id };
            friendRequests.push(friendRequest);
        });

        return Response.json(friendRequests);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const { friendRequestId } = body;

        const friendRequestsCollRef = collection(firestore, 'friendRequests');

        const friendRequestRef = await getDoc(doc(friendRequestsCollRef, friendRequestId));

        if (!friendRequestRef.exists()) {
            throw new Error('Friend request not found');
        }

        const friendRequest = { ...friendRequestRef.data(), id: friendRequestRef.id };

        const friendsCollRef = collection(firestore, 'friends');

        // Add userA and userB as friends
        await addDoc(friendsCollRef, { userA: friendRequest.requestFrom, userB: friendRequest.requestTo, since: Date.now() });

        // Delete friend request from friendRequests collection
        await deleteDoc(doc(friendRequestsCollRef, friendRequest.id));

        return Response.json({ message: 'Friend request accepted' });
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { id } = body;

        const friendRequestsCollRef = collection(firestore, 'friendRequests');

        await deleteDoc(doc(friendRequestsCollRef, id));

        return Response.json({ message: 'Friend request deleted' });
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
