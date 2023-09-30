'use client';
import React, { useEffect, useState } from 'react';
import FriendsAdd from './FriendsAdd';
import FriendsNavigation from './FriendsNavigation';

const Friends = () => {
    const [selectedTab, setSelectedTab] = useState('add-friend');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="w-screen h-screen ">
            <FriendsNavigation handleTabChange={handleTabChange} />
            <div className="w-3/4 mx-auto m-10">{selectedTab === 'Add Friend' && <FriendsAdd />}</div>
            {selectedTab === 'Add Friend' && <hr className="border-t-gray-700" />}
        </div>
    );
};

export default Friends;
