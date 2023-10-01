import React from 'react';

const OnlineFriend = ({ friend }) => {
    const handleInitiateMessage = () => {
        console.log(`message ${friend.username}`);
    };

    return (
        <div onClick={handleInitiateMessage} className="flex justify-between items-center py-5 px-2 hover:bg-slate-700 hover:rounded">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-bold">{friend.username}</p>
                <p className="text-xs font-normal italic">Friends since {new Date(friend.since).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default OnlineFriend;
