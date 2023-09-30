'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { logoutUser } from '../../utils/auth';
import Friends from './components/Friends/Friends';
import { useAuthContext } from './context/store';

const Page = () => {
    const { user, setUser } = useAuthContext();

    return (
        <>
            <Friends />

            {Object.keys(user).length > 0 ? (
                <>
                    <p>{user.email}</p>
                    <button
                        onClick={async () => {
                            const user = await logoutUser();

                            if (!user) setUser({});
                        }}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <Link href="/login">
                    <button>Login</button>
                </Link>
            )}
        </>
    );
};

export default Page;
