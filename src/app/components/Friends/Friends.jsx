'use client';
import React, { useEffect, useState } from 'react';
import Pending from '../Pending/Pending';
import Add from './Add/Add';
import All from './All/All';
import FriendsNavigation from './FriendsNavigation';
import Online from './Online/Online';

const Friends = () => {
    const [selectedTab, setSelectedTab] = useState('Add Friend');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="w-full h-screen">
            <FriendsNavigation handleTabChange={handleTabChange} />
            <div className="w-3/4 my-10 px-10">
                {selectedTab === 'Add Friend' && <Add />}
                {selectedTab === 'Pending' && <Pending />}
                {selectedTab === 'All' && <All />}
                {selectedTab === 'Online' && <Online />}
            </div>
            {selectedTab === 'Add Friend' && <hr className="border-t-2 border-t-slate-600" />}
        </div>
    );
};

export default Friends;
