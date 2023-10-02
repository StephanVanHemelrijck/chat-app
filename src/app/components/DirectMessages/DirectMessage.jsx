import React, { useEffect, useState } from 'react';

const DirectMessage = ({ message, handleIdToUsername }) => {
    const [senderUsername, setSenderUsername] = useState('');
    const [dateString, setDateString] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            return `Today at ${date.toLocaleTimeString(undefined, options)}`;
        } else {
            // Format the date as a different format for other days
            const dateFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };
            return date.toLocaleDateString(undefined, dateFormatOptions);
        }
    };

    useEffect(() => {
        setSenderUsername(handleIdToUsername(message.sender));

        const date = new Date(message.sentAt);

        const formattedDate = formatDate(date);

        setDateString(formattedDate);
    }, []);

    return (
        <div className="mt-3">
            <h2>
                {senderUsername} <span className="text-xs opacity-50 ml-2">{dateString}</span>
            </h2>
            <p className="text-sm font-light">{message.message}</p>
        </div>
    );
};

export default DirectMessage;
