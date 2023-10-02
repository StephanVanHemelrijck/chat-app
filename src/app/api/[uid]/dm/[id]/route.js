import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export const getDirectMessageById = async (id) => {
    const dmCollRef = collection(firestore, 'directMessages');

    const docRef = doc(dmCollRef, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return Response.json({ error: 'No direct message found.' });
    }

    const dm = { ...docSnap.data(), dmId: docSnap.id };

    return dm;
};

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const dm = await getDirectMessageById(id);

        return Response.json(dm);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
