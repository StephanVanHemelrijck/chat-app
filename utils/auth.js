import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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
            const userObject = {
                email,
                username,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                uid: user.uid,
                avatar: '',
                bio: '',
                status: '',
            };

            await addDoc(collRef, userObject);

            const q = query(collRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const userRef = querySnapshot.docs[0].data();

            return userRef;
        } else throw new Error('Failed to register a new user');
    } catch (error) {
        throw new Error(error);
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Fetch the logged in user from the database
        const collRef = collection(firestore, 'users');

        if (!userCredential) throw new Error('Failed to login user');

        const q = query(collRef, where('uid', '==', userCredential.user.uid));
        const querySnapshot = await getDocs(q);
        const userRef = querySnapshot.docs[0].data();

        return userRef;
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
