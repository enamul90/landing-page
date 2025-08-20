'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { toast } from "react-hot-toast";

import { useRouter } from 'next/navigation';
import API from "@/app/utils/axios"

export default function LoginPage() {

    const router = useRouter();

    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [loading, setLoading] = useState(false);

    const loginData = {
        email,
        password,
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await API.post("/user/login", loginData);
            if (res.data.status === 200) {
                router.push('/dashboard/index');
                toast.success("Log In Sucessfully");
            }
            else {
                toast.error(res.data.message);
            }

            setLoading(false);
        }
        catch (e) {
            alert("Error logging in!");
        }


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary/1">
            <div className="w-full max-w-md p-4 md:p-8 md:bg-Shave md:rounded-lg md:shadow md:border border-Line">
                <div className="flex justify-center mb-6 h-[130px] w-fit mx-auto">
                    <Image src="/logo/logo.png" alt="Logo" width={100} height={100} className={'h-full w-full object-cover'} />
                </div>
                <h1 className="text-3xl font-bold text-center text-Text-100 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-Text-75 mb-1">Email address</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-Line rounded bg-Shave text-Text-50 outline-0"
                            placeholder="Enter email address."
                            required
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
                            required
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
                        className="w-full py-2 bg-primary  rounded hover:bg-secondary
                        text-Shave transition duration-300 cursor-pointer flex items-center gap-3 justify-center"
                    >
                        Submit
                        {
                            loading && <div className={"loader"}></div>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}