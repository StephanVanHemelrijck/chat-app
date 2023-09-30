'use client';
import React, { useEffect, useState } from 'react';

const FriendsAdd = () => {
    const [username, setUsername] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;
        setUsername(value);
    };

    const handleSendFriendRequest = async (e) => {
        console.log(`Attempted to send friend request to ${username}`);
    };

    return (
        <div className="flex flex-col gap-5 ">
            <div>
                <h2 className="font-bold text-lg">ADD FRIEND</h2>
                <p className="font-light text-sm">You can add friends with their username.</p>
            </div>
            <form
                className="w-full bg-zinc-950 p-2 text-sm flex justify-between rounded"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendFriendRequest(e);
                }}
            >
                <input
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-transparent placeholder:text-gray-500 flex-1 focus:outline-none"
                    placeholder="You can add friends with their username."
                    maxLength="25"
                    autoComplete="new-password"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="none"
                />
                <button
                    disabled={username.length === 0}
                    type="submit"
                    className="bg-blue-500 px-3 py-1 rounded font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500"
                >
                    Send Friend Request
                </button>
            </form>
        </div>
    );
};

export default FriendsAdd;
