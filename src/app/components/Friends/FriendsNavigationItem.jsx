'use client';
import { useAuthContext } from '@/app/context/store';
import React, { useEffect, useState } from 'react';

const FriendsNavigationItem = ({ title, style = '', handleTabChange }) => {
    const { user, socket } = useAuthContext();
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        if (!socket) return;

        if (title === 'Pending') {
            const fetchFriendRequests = async () => {
                await fetch(`/api/${user.uid}/friends/requests`, {
                    method: 'GET',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) return console.log(data.error);

                        setFriendRequests(data);
                    })
                    .catch((err) => console.log(err));
            };

            socket.on('new-friend-request-received', (data) => {
                console.log(data);
                fetchFriendRequests();
            });

            return () => {
                socket.off('new-friend-request-received');
            };
        }
    }, [user, socket]);

    const handleTabChangeItem = (tab) => {
        handleTabChange(tab);
    };

    return (
        <div className="flex justify-center items-center px-2 py-1 gap-2 cursor-pointer hover:bg-slate-700 hover:rounded">
            <p onClick={() => handleTabChange(title)} className={`${style} text-md`}>
                {title}
            </p>
            {title === 'Pending' && friendRequests.length != 0 && (
                <div className="bg-red-500 rounded flex justify-center items-center">
                    <p className="text-xs text-white text-center px-1 py-0.5" style={{ minWidth: '30px' }}>
                        {friendRequests.length}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FriendsNavigationItem;
