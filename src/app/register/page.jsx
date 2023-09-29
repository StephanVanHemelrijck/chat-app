'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Register = () => {
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('credentials', credentials);

        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-gray-900 p-8 w-1/2">
                <h1 className="text-center text-2xl font-bold">Create an account</h1>
                <form onSubmit={(e) => handleRegister(e)} className="flex flex-col gap-4 mt-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-xs">
                            EMAIL <span className="text-red-700">*</span>
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="email"
                            id="email"
                            className="text-sm p-2 font-normal bg-zinc-950 focus:outline-none rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="username" className="font-medium text-xs">
                            USERNAME <span className="text-red-700">*</span>
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="username"
                            id="username"
                            className="text-sm p-2 font-normal bg-zinc-950 focus:outline-none rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="password" className="font-medium text-xs">
                            PASSWORD <span className="text-red-700">*</span>
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            type="password"
                            name="password"
                            id="password"
                            className="text-sm p-2 font-normal bg-zinc-950 focus:outline-none rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2  bg-blue-500 py-3 font-medium hover:bg-blue-700 rounded">
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                    <Link href={'/login'} className="font-light text-xs text-blue-500 hover:underline">
                        Already have an account?
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
