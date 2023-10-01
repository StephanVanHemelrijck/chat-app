import { useAuthContext } from '@/app/context/store';
import React, { useEffect, useState } from 'react';
import OnlineFriend from './OnlineFriend';

const Online = () => {
    const [onlineFriends, setOnlineFriends] = useState([]);
    const { user, socket } = useAuthContext();

    useEffect(() => {
        if (!socket || !user) return;

        const getOnlineFriends = async () => {
            const response = await fetch(`/api/${user.uid}/friends/online`);
            const data = await response.json();

            console.log(data);

            setOnlineFriends([]);
            setOnlineFriends(data);
        };

        getOnlineFriends();
    }, [user, socket]);

    return (
        <div>
            <h2 className="text-sm font-bold">ONLINE - {onlineFriends.length}</h2>
            <hr className="border-t-gray-700 mt-5" />
            {onlineFriends.length > 0 ? (
                onlineFriends.map((friend, index) => (
                    <div key={index}>
                        <OnlineFriend friend={friend} />
                        <hr className="border-t-gray-700" />
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-400 mb-5">No online friends.</p>
            )}
        </div>
    );
};

export default Online;
