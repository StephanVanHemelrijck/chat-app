import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from './database.js';

const auth = getAuth();

/**
 *
 * @param {string} email - Users email address
 * @param {string} username - Users username
 * @param {string} password = Users password
 *
 * @returns {Object} userCredential - Returns a userCredential object
 */
export default async function registerUser(email, username, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (userCredential) {
            let collRef = collection(firestore, 'users');
            let result = await addDoc(collRef, {
                email,
                username,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                uid: user.uid,
                friends: [],
                friendRequests: [],
                avatar: '',
                bio: '',
                status: '',
                notifications: [],
            });

            return userCredential;
        } else throw new Error('Failed to register a new user');
    } catch (error) {
        throw new Error(error);
    }
}
