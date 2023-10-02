import { useAuthContext } from '@/app/context/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DirectMessagesUser = ({ dm }) => {
    const [friend, setFriend] = useState({});
    const { user, socket } = useAuthContext();
    const { push } = useRouter();

    useEffect(() => {
        if (!user) return;

        // set friendUid to the friendUid that is not the user's uid
        const friendUid = dm.friendUid === user.uid ? dm.uid : dm.friendUid;

        const getFriend = async () => {
            const response = await fetch(`/api/users/${friendUid}`, {
                method: 'GET',
            });

            const data = await response.json();

            setFriend(data);
        };

        getFriend();
    }, [user]);

    const handleStartDm = () => {
        console.log('start dm');

        //
        push(`/dm/${dm.dm_id}`);

        // emit to socket
        socket.emit('start-dm', { dmId: dm.dm_id });
    };

    return (
        <div onClick={handleStartDm}>
            <p className="hover:bg-slate-600 px-2 py-3 rounded">{friend.username}</p>
        </div>
    );
};

export default DirectMessagesUser;
