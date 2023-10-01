import { addDoc, and, collection, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function POST(req) {
    try {
        const body = await req.json();

        const { username, requestTo } = body;

        // Check if username and requestTo are identical
        if (username === requestTo) return Response.json({ error: 'You cannot send a friend request to yourself' });

        // Add friend request in username and requestTo's friendRequests array
        let usersCollRef = collection(firestore, 'users');

        // Get user document references
        // -> username (the sender)
        const qSender = query(usersCollRef, where('username', '==', username));
        const querySnapshot = await getDocs(qSender);
        const senderDoc = { ...querySnapshot.docs[0]?.data() };

        // -> requestTo (the receiver)
        const qReceiver = query(usersCollRef, where('username', '==', requestTo));
        const querySnapshot2 = await getDocs(qReceiver);
        const receiverDoc = { ...querySnapshot2.docs[0]?.data() };

        // Error handling if either user does not exist
        if (!Object.keys(senderDoc).length > 0) return Response.json({ error: 'Sender does not exist' });
        if (!Object.keys(receiverDoc).length > 0) return Response.json({ error: 'Receiver does not exist' });

        // Add friend request in friendrequests collection
        const friendRequestsCollRef = collection(firestore, 'friendRequests');

        // Check if friend request already exists
        const q = query(
            friendRequestsCollRef,
            where('requestFrom', 'in', [senderDoc.uid, receiverDoc.uid]),
            where('requestTo', 'in', [senderDoc.uid, receiverDoc.uid])
        );

        const querySnapshot3 = await getDocs(q);
        const friendRequestExists = querySnapshot3.docs[0]?.data();

        if (friendRequestExists) return Response.json({ error: 'Friend request already exists' });

        const friendRequestObject = {
            requestFrom: senderDoc.uid,
            requestTo: receiverDoc.uid,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: 'pending',
        };

        await addDoc(friendRequestsCollRef, friendRequestObject);

        // Return success message
        return Response.json({ success: 'Friend request sent' });
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
