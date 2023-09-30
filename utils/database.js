// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDPvaoMpzcGn6nZugog0EzZhQgiOkl0GDs',
    authDomain: 'chat-app-4ff7f.firebaseapp.com',
    projectId: 'chat-app-4ff7f',
    storageBucket: 'chat-app-4ff7f.appspot.com',
    messagingSenderId: '299642455890',
    appId: '1:299642455890:web:302ffd76d0d47eea199c8b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const firestore = getFirestore(app);

// auth export
export const auth = getAuth(app);
