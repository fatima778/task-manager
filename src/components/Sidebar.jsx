import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faTasks, faCheckSquare, faExclamationTriangle, faHome, faPalette } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ theme, toggleTheme, onFilterChange, currentFilter }) {
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const hoverBg = isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
    const isActiveHome = currentFilter === 'all'; // Adjust 'all' to your default dashboard filter

    const handleFilter = (filter) => {
        onFilterChange(filter);
    };

    return (
        <div className={`${bgColor} ${textColor} p-4 w-64 min-h-screen shadow-md flex flex-col`}>
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => handleFilter('todo')}
                            className={`flex items-center p-2 rounded ${hoverBg} w-full text-left focus:outline-none ${currentFilter === 'todo' ? 'bg-indigo-500 text-white' : ''}`}
                        >
                            <FontAwesomeIcon icon={faListUl} className="mr-2" /> To Do
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleFilter('doing')}
                            className={`flex items-center p-2 rounded ${hoverBg} w-full text-left focus:outline-none ${currentFilter === 'doing' ? 'bg-indigo-500 text-white' : ''}`}
                        >
                            <FontAwesomeIcon icon={faTasks} className="mr-2" /> Doing
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleFilter('done')}
                            className={`flex items-center p-2 rounded ${hoverBg} w-full text-left focus:outline-none ${currentFilter === 'done' ? 'bg-indigo-500 text-white' : ''}`}
                        >
                            <FontAwesomeIcon icon={faCheckSquare} className="mr-2" /> Done
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleFilter('urgent')}
                            className={`flex items-center p-2 rounded ${hoverBg} w-full text-left focus:outline-none ${currentFilter === 'urgent' ? 'bg-indigo-500 text-white' : ''}`}
                        >
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" /> Urgent
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={isActiveHome ? undefined : () => handleFilter('all')}
                            className={`flex items-center p-2 rounded w-full text-left focus:outline-none ${isActiveHome ? 'opacity-50 cursor-default' : hoverBg} ${currentFilter === 'all' ? 'bg-indigo-500 text-white' : ''}`}
                            disabled={isActiveHome}
                        >
                            <FontAwesomeIcon icon={faHome} className="mr-2" /> Go to Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            className={`flex items-center p-2 rounded ${hoverBg} w-full text-left focus:outline-none`}
                        >
                            <FontAwesomeIcon icon={faPalette} className="mr-2" /> Toggle Theme
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;