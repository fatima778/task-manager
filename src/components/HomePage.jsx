import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/sidepic-removebg-preview.png'; // Import your image
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'; // Import theme icons

function HomePage() {
    const appName = "TaskFlow";
    const [theme, setTheme] = useState('dark'); // Default to dark theme

    useEffect(() => {
        // Load theme from local storage on mount
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            localStorage.setItem('theme', 'dark'); // Set default if not found
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save theme to local storage
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            {/* Navbar */}
            <nav className={`shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className={`text-xl font-bold ${theme === 'dark' ? 'text-indigo-500' : 'text-indigo-600'}`}>{appName}</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className={`hover:${theme === 'dark' ? 'text-indigo-500' : 'text-indigo-600'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}
                            >
                                Log in
                            </Link>
                            <Link to="/signup" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Get Started
                            </Link>
                            <Link
                                to="/todo"
                                className={`hover:${theme === 'dark' ? 'text-indigo-500' : 'text-indigo-600'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}
                            >
                                Tasks
                            </Link>
                            <button onClick={toggleTheme} className="focus:outline-none">
                                {theme === 'dark' ? <SunIcon className="h-6 w-6 text-gray-400 hover:text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-20 px-10 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:order-1 rounded-md shadow-lg p-6" style={{ marginLeft: "50px", width: "120%", height: "100%", backgroundColor: theme === 'dark' ? '#2D3748' : 'white' }}> {/* Themed background */}
                    <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontFamily: 'cursive', marginTop: "80px" }}>{appName}</h1>
                    <p className={`mt-4 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Capture, organize, and tackle your to-dos from anywhere. Escape the clutter and chaos—unleash your productivity with {appName}.
                    </p>
                    <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                        <Link to="/signup" className="w-full sm:w-auto inline-flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign up - it's free!
                        </Link>
                        <Link to="/watch-video" className={`w-full sm:w-auto inline-flex justify-center py-3 px-5 border ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                            Watch video
                        </Link>
                    </div>
                </div>
                <div className="md:order-2 flex items-center justify-center"> {/* Image wala div bina shadow ke */}
                    <img src={placeholderImage} alt="Task Management Illustration" className="max-w-full h-auto" style={{ maxHeight: '400px', marginLeft: "100px" }} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;