import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { firestore } from 'utils/database';

export async function GET(req, { params }) {
    try {
        const { uid } = params;

        const friendsCollRef = collection(firestore, 'friends');
        const userCollRef = collection(firestore, 'users');

        const q = query(friendsCollRef, or(where('userA', '==', uid), where('userB', '==', uid)));
        const querySnapshot = await getDocs(q);

        const friendsObjects = [];
        querySnapshot.forEach((doc) => {
            const friend = { ...doc.data(), id: doc.id };

            friendsObjects.push(friend);
        });

        // Use promise since async array filtering
        const friends = [];
        await Promise.all(
            friendsObjects.map(async (friendObject) => {
                // For each friend object, find the user linked to the friend object
                // ignore user that is requesting the friend list
                const friendId = friendObject.userA === uid ? friendObject.userB : friendObject.userA;

                // Retrieve user object for each friend
                const q = query(userCollRef, where('uid', '==', friendId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    const friend = { ...doc.data(), id: doc.id, since: friendObject.since };
                    friends.push(friend);
                });
            })
        );

        return Response.json(friends);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
