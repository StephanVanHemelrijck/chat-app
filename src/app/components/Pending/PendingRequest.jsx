import { useAuthContext } from '@/app/context/store';
import React, { useEffect, useState } from 'react';

const PendingRequest = ({ request }) => {
    const { user } = useAuthContext();
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            // switch case for requestFrom and requestTo
            switch (user.uid) {
                case request.requestFrom: {
                    const response = await fetch(`/api/users/${request.requestTo}`);
                    const data = await response.json();
                    setUserDetails(data);
                    break;
                }
                case request.requestTo: {
                    const response = await fetch(`/api/users/${request.requestFrom}`);
                    const data = await response.json();
                    setUserDetails(data);
                    break;
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [user]);

    return (
        <>
            {!loading && (
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold">{userDetails?.username}</p>
                        <p className="text-xs font-normal">{user.uid === request.requestFrom ? 'Outgoing Friend Request' : 'Incoming Friend Request'}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-green-500 rounded px-2 py-1 text-white text-sm">Accept</button>
                        <button className="bg-red-500 rounded px-2 py-1 text-white text-sm">Decline</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PendingRequest;
