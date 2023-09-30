import React from 'react';

const FriendsNavigationItem = ({ title, style = '', handleTabChange }) => {
    const handleTabChangeItem = (tab) => {
        handleTabChange(tab);
    };

    return (
        <p onClick={() => handleTabChange(title)} className={`${style} px-2 py-1 cursor-pointer hover:bg-slate-700 text-md hover:rounded`}>
            {title}
        </p>
    );
};

export default FriendsNavigationItem;
