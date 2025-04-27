import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Signup button clicked');
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, email: email, password: password }), // Included email here
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Signup successful:', data);
                // Store the token if your backend sends one upon registration
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                // Store user info if needed
                if (data.userId) {
                    localStorage.setItem('userId', data.userId);
                }
                if (data.username) {
                    localStorage.setItem('userName', data.username);
                }
                navigate('/login');
            } else {
                console.error('Signup failed:', data.message || 'Something went wrong during signup');
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Failed to connect to the server');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6 text-indigo-700">SIGN UP</h2>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
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
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-4">
                    Already have an account? <Link to="/login" className="font-bold text-indigo-500 hover:text-indigo-800">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;