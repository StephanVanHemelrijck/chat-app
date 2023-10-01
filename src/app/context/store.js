'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { friendRequestsObserver } from '../../../utils/observer';

const AuthContext = createContext({
    user: {},
    setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user.uid) {
            // create socket connection with headers
            const newSocket = io('http://localhost:1337', {
                extraHeaders: {
                    uid: `${user.uid}`,
                },
            });
            setSocket(newSocket);

            // Set up the observer once the user is logged in
            friendRequestsObserver(user.uid, newSocket);

            // Clean up the socket connection when the user logs out
            return () => newSocket.close();
        }
    }, [user]);

    return <AuthContext.Provider value={{ user, setUser, socket }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
