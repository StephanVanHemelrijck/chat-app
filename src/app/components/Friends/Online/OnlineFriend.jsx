import { useAuthContext } from '@/app/context/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OnlineFriend = ({ friend }) => {
    const { user } = useAuthContext();
    const { push } = useRouter();

    const handleInitiateMessage = async () => {
        if (!user) return;
        console.log(`message ${friend.username}`);

        const response = await fetch(`/api/${user.uid}/dm/${friend.uid}`, {
            method: 'POST',
        });

        const data = await response.json();

        // redirect to the new dm
        push(`/dm/${data.friendUid}`);
    };

    return (
        <div onClick={handleInitiateMessage} className="flex justify-between items-center py-5 px-2 hover:bg-slate-600 hover:rounded">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-bold">{friend.username}</p>
                <p className="text-xs font-normal italic">Friends since {new Date(friend.since).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default OnlineFriend;
