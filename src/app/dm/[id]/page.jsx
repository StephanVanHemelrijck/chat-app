'use client';
import DirectMessage from '@/app/components/DirectMessages/DirectMessage';
import DirectMessagesSidebar from '@/app/components/DirectMessages/DirectMessagesSidebar';
import { useAuthContext } from '@/app/context/store';
import React, { useEffect, useRef, useState } from 'react';

const Dm = ({ params }) => {
    const { user, socket } = useAuthContext();
    const [friend, setFriend] = useState({});
    const [dmObject, setDmObject] = useState({});
    const [inputMessage, setInputMessage] = useState('');
    const [inputCharacters, setInputCharacters] = useState(0);
    const textareaRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getDm = async () => {
            // Fetch dm object so we can use the friendUid to fetch the friend's username
            const response = await fetch(`/api/${user.uid}/dm/${params.id}`, {
                method: 'GET',
            });

            const data = await response.json();

            setDmObject(data);

            // set friendUid to the friendUid that is not the user's uid
            const friendUid = data.friendUid === user.uid ? data.uid : data.friendUid;
            const response2 = await fetch(`/api/users/${friendUid}`, {
                method: 'GET',
            });
            const data2 = await response2.json();

            setFriend(data2);
        };

        getDm();
    }, []);

    useEffect(() => {
        if (!user || !socket) return;

        socket.on('new-dm-message', (data) => {
            console.log('data', data);

            // create new date now
            const date = Date.now();

            const newMessage = {
                ...data,
                sentAt: date,
            };

            setMessages((messages) => [...messages, newMessage]);
        });

        return () => {
            socket.off('new-dm-message');
        };
    }, [user, socket]);

    const handleInputChange = (e) => {
        if (textareaRef.current) {
            textareaRef.current.style.minHeight = '2.5rem';
            textareaRef.current.style.maxHeight = '20rem';
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${e.target.scrollHeight - 16}px`;
        }

        if (e.target.value.length > 250) return;
        setInputMessage(e.target.value);
        setInputCharacters(e.target.value.length);
    };

    const handleSendMessage = async () => {
        socket.emit('new-dm-message', { dmId: dmObject.dmId, message: inputMessage, sender: user.uid });

        setInputMessage('');
    };

    const handleIdToUsername = (id) => {
        console.log(id);

        if (id === user.uid) return user.username;
        if (id === friend.uid) return friend.username;
    };

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1">
                <DirectMessagesSidebar />
            </div>
            <div className="col-span-5">
                <div className="w-full h-screen flex flex-col justify-between">
                    <div className="px-10 py-2 border-b border-b-zinc-950">
                        <div className="py-1 select-none">{friend.username}</div>
                    </div>
                    <div className="m-10 p-2">
                        <div className="flex flex-col overflow-y-auto my-5" style={{ maxHeight: 'calc(100vh - 30vh)' }}>
                            {messages.length > 0 ? (
                                messages.map((message, index) => <DirectMessage key={index} message={message} handleIdToUsername={handleIdToUsername} />)
                            ) : (
                                <p className="text-xs opacity-50">No messages yet</p>
                            )}
                        </div>
                        <div className="bg-slate-500 relative rounded">
                            <p className="absolute bottom-2 right-4 text-xs opacity-50">{inputCharacters}/250</p>
                            <textarea
                                type="text"
                                name="message"
                                id="message"
                                placeholder={`Message ${friend.username}`}
                                className="w-11/12 bg-transparent px-4 py-2 text-base outline-none resize-none overflow-hidden flex flex-col justify-center items-center max-h-30"
                                value={inputMessage}
                                onChange={handleInputChange}
                                rows={1}
                                ref={textareaRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault(); // Prevents the Enter key from adding a new line
                                        handleSendMessage();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dm;
