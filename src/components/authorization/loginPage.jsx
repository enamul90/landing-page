'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";

import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();

        router.push('/dashboard/index');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary/1">
            <div className="w-full max-w-md p-8 bg-Shave rounded-lg shadow-lg">
                <div className="flex justify-center mb-6 h-[130px] w-fit mx-auto">
                    <Image src="/logo/logo.png" alt="Logo" width={100} height={100} className={'h-full w-full object-cover'} />
                </div>
                <h1 className="text-3xl font-bold text-center text-Text-100 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-Text-75 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-Line rounded bg-Shave text-Text-50 outline-0"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-Text-75 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-Line rounded bg-Shave  text-Text-50 outline-0"
                            placeholder="Enter password"
                        />
                    </div>
                    <p className="text-sm text-gray-600">
                        Forgot your password?{" "}
                        <Link href="/forgot" className="text-secondary hover:underline">
                            Click here to reset it.
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-Text-100 rounded hover:bg-secondary hover:text-Shave transition duration-300 cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}