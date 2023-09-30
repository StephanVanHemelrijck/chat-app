import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from './database.js';
/**
 *
 * @param {string} email - Users email address
 * @param {string} username - Users username
 * @param {string} password = Users password
 *
 * @returns {Object} userCredential - Returns a userCredential object
 */
export async function registerUser(email, username, password) {
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

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw new Error(error);
    }
}

export async function logoutUser() {
    try {
        const userCredential = await signOut(auth);
        return userCredential;
    } catch (error) {
        throw new Error(error);
    }
}
