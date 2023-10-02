import React from 'react';
import FriendsNavigationItem from './FriendsNavigationItem';

const FriendsNavigation = ({ handleTabChange }) => {
    return (
        <div className="flex flex-row gap-6 px-10 py-2 border-b border-b-zinc-950">
            <p className="border-r-2 border-r-slate-600 pr-8 px-2 py-1 cursor-default">Friends</p>
            <FriendsNavigationItem handleTabChange={handleTabChange} title="Online" style="text-gray-400" />
            <FriendsNavigationItem handleTabChange={handleTabChange} title="All" style="text-gray-400" />
            <FriendsNavigationItem handleTabChange={handleTabChange} title="Pending" style="text-gray-400" />
            <FriendsNavigationItem handleTabChange={handleTabChange} title="Add Friend" style="text-green-500" />
        </div>
    );
};

export default FriendsNavigation;
