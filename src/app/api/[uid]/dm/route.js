import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

const getDirectMessages = async (uid) => {
    const directMessagesCollRef = collection(firestore, 'directMessages');

    const q = query(directMessagesCollRef, or(where('uid', '==', uid), where('friendUid', '==', uid)));

    const querySnapshot = await getDocs(q);
    const dms = querySnapshot.docs.map((doc) => ({ dm_id: doc.id, ...doc.data() }));

    return dms;
};

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const dms = await getDirectMessages(uid);

        return Response.json(dms);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
