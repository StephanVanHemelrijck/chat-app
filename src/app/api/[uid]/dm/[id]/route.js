import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

const getDirectMessage = async (uid, friendUid) => {
    // get direct message object
    const directMessagesCollRef = collection(firestore, 'directMessages');

    const q = query(directMessagesCollRef, where('uid', 'in', [uid, friendUid]), where('friendUid', 'in', [uid, friendUid]));

    const querySnapshot = await getDocs(q);
    const dm = querySnapshot.docs[0]?.data();

    return dm;
};

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const dmCollRef = collection(firestore, 'directMessages');

        const docRef = doc(dmCollRef, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return Response.json({ error: 'No direct message found.' });
        }

        const dm = { ...docSnap.data(), id: docSnap.id };

        return Response.json(dm);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

export async function POST(req, { params }) {
    try {
        const { uid, friendUid } = params;

        const dm = await getDirectMessage(uid, friendUid);

        // check if dm already exists
        if (dm) return Response.json(dm);

        // If not exists, create dm
        const newDm = {
            uid,
            friendUid,
            messages: [],
        };

        // save dm object to database
        const directMessagesCollRef = collection(firestore, 'directMessages');

        await addDoc(directMessagesCollRef, newDm);

        return Response.json(newDm);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
