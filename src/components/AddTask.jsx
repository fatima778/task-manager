import React, { useState } from 'react';

function AddTask({ onAddTask, onCancel, theme }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const inputClass = `shadow appearance-none border rounded w-full py-2 px-3 ${textColor} ${isDark ? 'bg-gray-700' : 'bg-transparent'} leading-tight focus:outline-none focus-shadow-outline`;
    const buttonClass = `font-semibold py-2 px-4 rounded focus:outline-none focus-shadow-outline`;
    const saveButtonClass = `bg-indigo-500 hover:bg-indigo-700 text-white ${buttonClass} mr-2`;
    const cancelButtonClass = `bg-gray-300 hover:bg-gray-400 text-gray-700 ${buttonClass}`;

    const handleSave = () => {
        if (title.trim()) {
            onAddTask({ title: title.trim(), description, assignedTo });
            setTitle('');
            setDescription('');
            setAssignedTo('');
            if (onCancel) {
                onCancel();
            }
        } else {
            alert('Title cannot be empty');
        }
    };

    return (
        <div className={`shadow-md rounded p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}> {/* Conditional background */}
            <h2 className={`text-lg font-semibold mb-2 ${textColor}`}>Add New Task</h2>
            <div className="mb-2">
                <label htmlFor="title" className={`block text-sm font-bold mb-1 ${textColor}`}>Title:</label>
                <input type="text" id="title" className={inputClass} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className={`block text-sm font-bold mb-1 ${textColor}`}>Description:</label>
                <textarea id="description" className={inputClass} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="assignedTo" className={`block text-sm font-bold mb-1 ${textColor}`}>Assigned To:</label>
                <input type="text" id="assignedTo" className={inputClass} value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />
            </div>
            <div className="mt-4">
                <button onClick={handleSave} className={saveButtonClass}>Add Task</button>
                {onCancel && <button onClick={onCancel} className={cancelButtonClass}>Cancel</button>}
            </div>
        </div>
    );
}

export default AddTask;