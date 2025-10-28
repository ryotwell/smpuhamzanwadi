"use client";

import axios from '@/lib/axios'; // pakai instance axios yang sudah handle token
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function LoginRegisterTest() {
    // Register state
    const [fullname, setFullname] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerResult, setRegisterResult] = useState('');
    const [registerError, setRegisterError] = useState('');

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginResult, setLoginResult] = useState('');
    const [loginError, setLoginError] = useState('');

    // Profile state
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileResult, setProfileResult] = useState('');
    const [profileError, setProfileError] = useState('');

    // Logout state
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [logoutResult, setLogoutResult] = useState('');
    const [logoutError, setLogoutError] = useState('');

    // Register handler
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterResult('');
        setRegisterError('');
        try {
            const res = await axios.post(`/user/register`, {
                fullname,
                email: registerEmail,
                password: registerPassword,
            });
            setRegisterResult('Register success: ' + JSON.stringify(res.data));
        } catch (err: any) {
            setRegisterError('Error: ' + (err.response?.data?.message || err.message));
        }
        setRegisterLoading(false);
    };

    // Login handler
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginResult('');
        setLoginError('');
        try {
            const res = await axios.post(`/user/login`, {
                email: loginEmail,
                password: loginPassword,
            });
            setLoginResult('Login success: ' + JSON.stringify(res.data));
            // Token sudah dihandle oleh axios instance, tidak perlu setToken sendiri
        } catch (err: any) {
            setLoginError('Error: ' + (err.response?.data?.message || err.message));
        }
        setLoginLoading(false);
    };

    // Profile handler
    const handleGetProfile = async () => {
        setProfileLoading(true);
        setProfileResult('');
        setProfileError('');
        try {
            const res = await axios.get(`/user/profile`);
            setProfileResult('Profile: ' + JSON.stringify(res.data));
        } catch (err: any) {
            setProfileError('Error: ' + (err.response?.data?.message || err.message));
        }
        setProfileLoading(false);
    };

    // Logout handler
    const handleLogout = async () => {
        setLogoutLoading(true);
        setLogoutResult('');
        setLogoutError('');
        try {
            const res = await axios.post('/user/logout', {
                email: loginEmail,
                password: loginPassword,
            });
            setLogoutResult('Logout success: ' + JSON.stringify(res.data));
        } catch (err: any) {
            setLogoutError('Error: ' + (err.response?.data?.message || err.message));
        }
        setLogoutLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 gap-10 flex-col sm:flex-row">
            {/* Register Form */}
            <form
                onSubmit={handleRegisterSubmit}
                className="bg-white dark:bg-gray-900 shadow-md rounded px-10 pt-8 pb-8 mb-4 min-w-[320px] w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Register</h2>
                <div className="mb-4">
                    <label htmlFor="fullname">
                        Fullname
                    </label>
                    <Input
                        id="fullname"
                        type="text"
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerEmail">
                        Email
                    </label>
                    <Input
                        id="registerEmail"
                        type="email"
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="registerPassword">
                        Password
                    </label>
                    <Input
                        id="registerPassword"
                        type="password"
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)}
                        required
                    />
                </div>
                <Button
                    type="submit"
                    disabled={registerLoading}
                >
                    {registerLoading ? 'Submitting...' : 'Register'}
                </Button>
                {registerResult && <div className="mt-4 text-green-600 text-sm break-words">{registerResult}</div>}
                {registerError && <div className="mt-4 text-red-600 text-sm break-words">{registerError}</div>}
            </form>

            {/* Login Form & Get Profile & Logout */}
            <div className="flex flex-col gap-6">
                <form
                    onSubmit={handleLoginSubmit}
                    className="bg-white dark:bg-gray-900 shadow-md rounded px-10 pt-8 pb-8 mb-4 min-w-[320px] w-full max-w-sm"
                >
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="loginEmail">
                            Email
                        </label>
                        <Input
                            id="loginEmail"
                            type="email"
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="loginPassword">
                            Password
                        </label>
                        <Input
                            id="loginPassword"
                            type="password"
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loginLoading}
                    >
                        {loginLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    {loginResult && <div className="mt-4 text-green-600 text-sm break-words">{loginResult}</div>}
                    {loginError && <div className="mt-4 text-red-600 text-sm break-words">{loginError}</div>}
                </form>
                {/* Logout Button */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded px-10 pt-5 pb-5 mb-4 min-w-[320px] w-full max-w-sm flex flex-col gap-3">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 text-center">
                        Logout
                    </h2>
                    <Button onClick={handleLogout} disabled={logoutLoading}>
                        {logoutLoading ? 'Logging out...' : 'Logout'}
                    </Button>
                    {logoutResult && (
                        <div className="mt-4 text-green-600 text-sm break-words">{logoutResult}</div>
                    )}
                    {logoutError && (
                        <div className="mt-4 text-red-600 text-sm break-words">{logoutError}</div>
                    )}
                </div>
                {/* Get Profile */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded px-10 pt-8 pb-8 mb-4 min-w-[320px] w-full max-w-sm flex flex-col gap-3">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
                        Get Profile
                    </h2>
                    <Button onClick={handleGetProfile} disabled={profileLoading}>
                        {profileLoading ? 'Fetching...' : 'Get Profile'}
                    </Button>
                    {profileResult && (
                        <div className="mt-4 text-green-600 text-sm break-words">{profileResult}</div>
                    )}
                    {profileError && (
                        <div className="mt-4 text-red-600 text-sm break-words">{profileError}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterTest;