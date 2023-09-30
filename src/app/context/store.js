'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    user: {},
    setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
