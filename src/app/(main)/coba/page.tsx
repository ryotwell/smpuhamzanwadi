"use client";

import axios from '@/lib/axios';
import React, { useState } from 'react';

function Coba() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const [profileLoading, setProfileLoading] = useState(false);
    const [profileResult, setProfileResult] = useState('');
    const [profileError, setProfileError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult('');
        setError('');
        try {
            const res = await axios.post('/user/login', {
                email,
                password,
            });
            setResult('Login success: ' + JSON.stringify(res.data));
        } catch (err: any) {
            setError('Error: ' + (err.response?.data?.message || err.message));
        }
        setLoading(false);
    };

    const handleGetProfile = async () => {
        setProfileLoading(true);
        setProfileResult('');
        setProfileError('');
        try {
            const res = await axios.get('/user/profile');
            setProfileResult('Profile: ' + JSON.stringify(res.data));
        } catch (err: any) {
            setProfileError('Error: ' + (err.response?.data?.message || err.message));
        }
        setProfileLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 flex-col gap-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-md rounded px-10 pt-8 pb-8 mb-4 min-w-[320px] w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full transition-colors duration-150 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {result && <div className="mt-4 text-green-600 text-sm">{result}</div>}
                {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
            </form>
            <div className="w-full max-w-sm">
                <button
                    onClick={handleGetProfile}
                    disabled={profileLoading}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-2 transition-colors duration-150 disabled:opacity-50"
                >
                    {profileLoading ? 'Fetching profile...' : 'Get Profile'}
                </button>
                {profileResult && <div className="mt-2 text-blue-600 text-sm break-all">{profileResult}</div>}
                {profileError && <div className="mt-2 text-red-600 text-sm break-all">{profileError}</div>}
            </div>
        </div>
    );
}

export default Coba;