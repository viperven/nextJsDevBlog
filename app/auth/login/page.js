"use client"

import { BaseUrl } from '../../lib/url';
import React, { useState } from 'react';
import { CookieService } from "../../lib/services/CookieService"
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';  // Default to dashboard if no callback

    const [email, setEmail] = useState('jharupesh669@gmail.com');
    const [password, setPassword] = useState('123456');

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch(`${BaseUrl}auth/login`, { method: "POST", body: JSON.stringify({ email, password }), });
            const data = await res.json();
            if (data?.isSuccess) {
                router.push(callbackUrl);
            }
            else {
                alert("login failed Try Again  " + data?.message)
            }
        }
        catch (err) {
            console.log(err?.message);
            alert('Login failed!');
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full mt-1"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
            </div>
        </div>
    );
}
