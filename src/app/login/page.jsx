'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(`Attempted to login with these credentials: ${JSON.stringify(credentials)}`);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-gray-900 p-8 w-1/2">
                <h1 className="text-center text-2xl font-bold">Welcome back!</h1>
                <p className="text-center font-thin">We are so excited to see you again!</p>
                <form action="" className="flex flex-col gap-4 mt-6" onSubmit={(e) => handleLogin(e)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-xs">
                            EMAIL OR PHONE NUMBER <span className="text-red-700">*</span>
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="email"
                            id="email"
                            className="text-sm p-2 font-normal bg-zinc-950 focus:outline-none"
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
                            className="text-sm p-2 font-normal bg-zinc-950 focus:outline-none"
                            required
                        />
                        <Link href={''} className="font-light text-xs text-blue-500 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <button type="submit" className="bg-blue-500 py-3 font-medium hover:bg-blue-700">
                        Log In
                    </button>
                    <p className="font-light text-xs">
                        Need an account?{' '}
                        <Link href={''} className="text-blue-500 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
