import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function POST(req) {
    try {
        const body = await req.json();

        const { username, requestTo } = body;

        // Add friend request in username and requestTo's friendRequests array
        let collRef = collection(firestore, 'users');

        // Get user document references
        // -> username (the sender)
        const qSender = query(collRef, where('username', '==', username));
        const querySnapshot = await getDocs(qSender);
        const senderDoc = { ...querySnapshot.docs[0]?.data() };

        // -> requestTo (the receiver)
        const qReceiver = query(collRef, where('username', '==', requestTo));
        const querySnapshot2 = await getDocs(qReceiver);
        const receiverDoc = { ...querySnapshot2.docs[0]?.data() };

        // Error handling if either user does not exist
        if (!Object.keys(senderDoc).length > 0) return Response.json({ error: 'Sender does not exist' });
        if (!Object.keys(receiverDoc).length > 0) return Response.json({ error: 'Receiver does not exist' });

        // Prepare friend request object
        const friendRequest = {
            sender: senderDoc.uid,
            receiver: receiverDoc.uid,
        };

        // Add friend request to both users
        senderDoc.friendRequests.push(friendRequest);
        receiverDoc.friendRequests.push(friendRequest);

        // Update both users
        await updateDoc(querySnapshot.docs[0].ref, senderDoc);
        await updateDoc(querySnapshot2.docs[0].ref, receiverDoc);

        // Return success message
        return Response.json({ success: 'Friend request sent' });
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
