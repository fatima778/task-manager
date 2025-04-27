import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar({ username, theme, onSearch }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const searchBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const searchTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const focusBorderColor = isDark ? 'focus:border-white' : 'focus:border-black';

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className={`${textColor} shadow py-2 px-4 sm:px-6 lg:px-8`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-bold text-xl text-indigo-600 mr-4">YourLogo</span>
                </div>
                <div className="flex-grow flex justify-center">
                    <span className="text-lg font-semibold">Welcome, {username}</span>
                </div>
                <div className="flex items-center">
                    <Link to="/" className="text-indigo-600 hover:text-indigo-800 mr-4">
                        <FontAwesomeIcon icon={faHome} className="text-xl" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className={`mt-2 flex items-center rounded-md ${searchBg} px-2 py-1 w-1/3 mx-auto`}>
                <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className={`bg-transparent border-none outline-none w-full ${searchTextColor} ${focusBorderColor} focus:ring-0 focus:border-2 transition duration-300`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
}

export default Navbar;