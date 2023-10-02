import { addDoc, collection, getDocs, limit, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';
import { getDirectMessageById } from './[id]/route';

const getDirectMessage = async (uid, friendUid) => {
    const collectionExists = await checkIfCollectionExists('directMessages');

    if (!collectionExists) return null;

    // get direct message object
    const directMessagesCollRef = collection(firestore, 'directMessages');

    const q = query(directMessagesCollRef, where('uid', 'in', [uid, friendUid]), where('friendUid', 'in', [uid, friendUid]));

    const querySnapshot = await getDocs(q);
    const dm = { ...querySnapshot.docs[0].data(), dmId: querySnapshot.docs[0].id };

    return dm;
};

// A function that checks if a collection exists in database
// necessary otherwise the query will crash
const checkIfCollectionExists = async (collectionName) => {
    const collectionRef = collection(firestore, collectionName);

    const querySnapshot = await getDocs(query(collectionRef, limit(1)));

    return !querySnapshot.empty; // true if collection exists, false if not
};

const getDirectMessagesFromUser = async (uid) => {
    const directMessagesCollRef = collection(firestore, 'directMessages');

    const q = query(directMessagesCollRef, or(where('uid', '==', uid), where('friendUid', '==', uid)));

    const querySnapshot = await getDocs(q);
    const dms = querySnapshot.docs.map((doc) => ({ dmId: doc.id, ...doc.data() }));

    return dms;
};

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const dms = await getDirectMessagesFromUser(uid);

        return Response.json(dms);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

export async function POST(req, { params }) {
    try {
        const { uid } = params;
        const body = await req.json();
        const { friendUid } = body;

        const dm = await getDirectMessage(uid, friendUid);

        console.log(dm);

        // check if dm already exists
        if (dm != null) return Response.json(dm);

        // If not exists, create dm
        const newDm = {
            uid,
            friendUid,
            messages: [],
        };

        // save dm object to database
        const directMessagesCollRef = collection(firestore, 'directMessages');

        await addDoc(directMessagesCollRef, newDm);

        // get direct message object from db
        const newDmObj = await getDirectMessage(uid, friendUid);

        return Response.json(newDmObj);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
