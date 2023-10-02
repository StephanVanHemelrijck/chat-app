'use client';
import { useAuthContext } from '@/app/context/store';
import React, { useEffect, useState } from 'react';
import PendingRequest from './PendingRequest';

const Pending = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const { user, socket } = useAuthContext();

    useEffect(() => {
        if (!socket) return;

        const getPendingRequests = async () => {
            const response = await fetch(`/api/${user.uid}/friends/requests`);
            const data = await response.json();
            setPendingRequests([]);
            setPendingRequests(data);
        };
        getPendingRequests();

        socket.on('new-friend-request-received', () => {
            getPendingRequests();
        });

        socket.on('friend-request-rejected', () => {
            getPendingRequests();
        });

        socket.on('friend-request-accepted', () => {
            getPendingRequests();
        });
    }, [user, socket]);

    return (
        <div>
            <h2 className="text-sm font-bold ">PENDING - {pendingRequests.length}</h2>
            <hr className="border-t-2 border-t-slate-600 my-5" />
            {pendingRequests.length > 0 ? (
                pendingRequests.map((request, index) => (
                    <div key={index}>
                        <PendingRequest request={request} />
                        <hr className="border-t-slate-600 my-5" />
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-400 mb-5">No pending friend requests.</p>
            )}
        </div>
    );
};

export default Pending;
