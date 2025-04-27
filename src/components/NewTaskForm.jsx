import React, { useState } from 'react';

function NewTaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            const newTask = {
                id: Date.now(), // Temporary ID
                title,
                description,
                assignedTo,
                // dueDate: null, // We'll add these later
                // priority: 'medium',
                // activityLog: []
            };
            onAddTask(newTask);
            setTitle('');
            setDescription('');
            setAssignedTo('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Create New Task</h2>
            <div className="mb-2">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-1">Title:</label>
                <input
                    type="text"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-1">Description:</label>
                <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="assignedTo" className="block text-gray-700 text-sm font-bold mb-1">Assigned To:</label>
                <input
                    type="text"
                    id="assignedTo"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
                Add Task
            </button>
        </form>
    );
}

export default NewTaskForm;