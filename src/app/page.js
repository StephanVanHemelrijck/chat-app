'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuthContext } from './context/store';

const Page = () => {
    const { user, setUser } = useAuthContext();

    useEffect(() => {}, []);

    return (
        <Link href="/login">
            <p>{user.email}</p>
        </Link>
    );
};

export default Page;
