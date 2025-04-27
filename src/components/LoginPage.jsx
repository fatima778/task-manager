import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [loginIdentifier, setLoginIdentifier] = useState(''); // Can be username or email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login button clicked');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                usernameOrEmail: loginIdentifier, // Use the combined identifier
                password: password,
            });

            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('username', response.data.username);

            navigate('/todo');
        } catch (err) {
            console.error('Login failed:', err.response?.data?.message || err.message);

            // Improved error handling
            if (err.response) {
                setError(err.response.data.message || 'Login failed');
            } else if (err.request) {
                setError('No response from server. Please try again later.');
            } else {
                setError('Something went wrong.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6 text-indigo-700">LOGIN</h2>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginIdentifier">
                            Username or Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="loginIdentifier"
                            type="text" // Changed to text to accept both
                            placeholder="Username or Email"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-4">
                    Don't have an account? <Link to="/signup" className="font-bold text-indigo-500 hover:text-indigo-800">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
