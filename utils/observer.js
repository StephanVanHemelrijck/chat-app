import { collection, onSnapshot, or, query, where } from 'firebase/firestore';
import { firestore } from './database.js';

const friendRequestsObserver = (uid, socket) => {
    // Set up an observer for the "friend requests" collection
    const friendRequestsCollRef = collection(firestore, 'friendRequests');
    const q = query(friendRequestsCollRef, or(where('requestTo', '==', uid), where('requestFrom', '==', uid)));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // If a new friend request is added
            if (change.type === 'added') {
                const friendRequest = change.doc.data();

                socket.emit('new-friend-request-send', friendRequest);
            }
        });
    });
};

// Call the observer function
export { friendRequestsObserver };
