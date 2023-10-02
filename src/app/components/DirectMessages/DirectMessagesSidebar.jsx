import { useAuthContext } from '@/app/context/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DirectMessagesUser from './DirectMessagesUser';

const DirectMessagesSidebar = () => {
    const { user, socket } = useAuthContext();
    const [directMessages, setDirectMessages] = useState([]);

    useEffect(() => {
        if (!user || !socket) return;

        const getDirectMessages = async () => {
            const response = await fetch(`/api/${user.uid}/dm`, {
                method: 'GET',
            });

            const data = await response.json();

            console.log(data);
            setDirectMessages(data);
        };

        getDirectMessages();
    }, [user, socket]);

    return (
        <div className="w-full h-screen bg-slate-800">
            <div className="px-10 py-2 border-b border-b-zinc-950">
                {/* nbsp = htmlcode for spacebar // whitespace */}
                <div className="py-1 select-none">&nbsp; </div>
            </div>
            <div className="sidebar-wrapper p-6 flex flex-col">
                <Link href="/">
                    <p className="hover:bg-slate-600 px-6 py-3 rounded">Friends</p>
                </Link>
                <div>
                    <h1 className="text-xs my-5 font-light">DIRECT MESSAGES</h1>
                    {directMessages.length > 0 ? (
                        directMessages.map((dm, index) => <DirectMessagesUser key={index} dm={dm} />)
                    ) : (
                        <p className="text-xs opacity-50">No direct messages yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DirectMessagesSidebar;
