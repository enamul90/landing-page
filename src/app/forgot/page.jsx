'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
    const router = useRouter();

    const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = Reset Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Dummy backend simulation
    const sendOtp = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setMessage('OTP sent to your email.');
        setStep(2);
    };

    const verifyOtp = () => {
        if (otp !== '123456') { // Example OTP
            setError('Invalid OTP.');
            return;
        }
        setError('');
        setMessage('OTP verified.');
        setStep(3);
    };

    const resetPassword = () => {
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Send password update to backend here
        setError('');
        alert('Password has been updated. Redirecting to login...');
        router.push('/')
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">
                    {step === 1 && 'Forgot Password'}
                    {step === 2 && 'Verify OTP'}
                    {step === 3 && 'Reset Password'}
                </h2>

                {message && <p className="text-primary text-sm text-center">{message}</p>}
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                {/* Step 1: Enter Email */}
                {step === 1 && (
                    <>
                        <label className="block text-sm">Enter your email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border border-Line  rounded-md focus:outline-none focus:ring-1 focus:ring-secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full mt-4 bg-secondary text-white py-2 rounded-md hover:bg-secondary cursor-pointer"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {/* Step 2: Verify OTP */}
                {step === 2 && (
                    <>
                        <label className="block text-sm">Enter the OTP sent to {email}</label>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-3 py-2 border border-Line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary "
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={verifyOtp}
                            className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary cursor-pointer "
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {/* Step 3: Reset Password */}
                {step === 3 && (
                    <>
                        <label className="block text-sm">New Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 border border-Line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="block text-sm mt-2">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border border-Line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={resetPassword}
                            className="w-full mt-4 bg-secondary text-white py-2 rounded-md hover:bg-secondary cursor-pointer"
                        >
                            Update Password
                        </button>
                    </>
                )}

                <div className="text-center pt-4">
                    <button
                        className="text-secondary text-sm hover:underline"
                        onClick={() => router.push('/')}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
