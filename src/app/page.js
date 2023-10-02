'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { logoutUser } from '../../utils/auth';
import { friendRequestsObserver } from '../../utils/observer';
import DirectMessagesSidebar from './components/DirectMessages/DirectMessagesSidebar';
import Friends from './components/Friends/Friends';
import { useAuthContext } from './context/store';

const Page = () => {
    const { user, setUser } = useAuthContext();

    return (
        <>
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                    <DirectMessagesSidebar />
                </div>
                <div className="col-span-5">
                    <Friends />
                </div>
            </div>

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
