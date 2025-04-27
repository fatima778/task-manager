import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function TaskItem({ task, onDelete, onEdit, onMove, listName, theme, lineThrough, moveBack, moveBackLabel, moveForward, moveForwardLabel }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);
    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const bgColor = isDark ? 'bg-gray-700' : 'bg-white';
    const hoverBg = isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100';
    const inputClass = `w-full py-1 px-2 rounded border ${textColor} ${isDark ? 'bg-gray-800' : 'bg-white'} focus:outline-none focus:border-indigo-500`;

    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        onEdit(task.id, editText);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditText(task.title);
        setIsEditing(false);
    };

    const handleMoveForward = () => {
        onMove(task.id, listName === 'ToDo' ? 'Doing' : 'Done');
    };

    const handleMoveBackward = () => {
        onMove(task.id, listName === 'Doing' ? 'ToDo' : 'Doing');
    };

    return (
        <li className={`p-2 mb-2 rounded ${bgColor} ${textColor}`}>
            {isEditing ? (
                <div className="flex items-center">
                    <input type="text" className={inputClass} value={editText} onChange={e => setEditText(e.target.value)} />
                    <button onClick={handleSaveEdit} className={`ml-2 text-green-500 hover:text-green-700 focus:outline-none`}>Save</button>
                    <button onClick={handleCancelEdit} className={`ml-2 text-red-500 hover:text-red-700 focus:outline-none`}>Cancel</button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        <span style={{ textDecoration: lineThrough ? 'line-through' : 'none' }}>{task.title}</span>
                        <div>
                            <button onClick={handleEdit} className={`mr-2 text-blue-500 hover:text-blue-700 focus:outline-none`}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={handleDelete} className={`text-red-500 hover:text-red-700 focus:outline-none`}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                    {task.description && <p className="text-sm mt-1 text-gray-500">{task.description}</p>} {/* Display description */}
                    <div className="flex justify-start mt-2">
                        {moveBack && (
                            <button onClick={moveBack} className={`mr-2 ${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> {moveBackLabel}
                            </button>
                        )}
                        {moveForward && (
                            <button onClick={moveForward} className={`${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                {moveForwardLabel} <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                            </button>
                        )}
                        {onMove && listName === 'ToDo' && (
                            <button onClick={handleMoveForward} className={`${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                Doing <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                            </button>
                        )}
                        {onMove && listName === 'Doing' && (
                            <>
                                <button onClick={handleMoveBackward} className={`mr-2 ${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> To Do
                                </button>
                                <button onClick={handleMoveForward} className={`${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                    Done <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                                </button>
                            </>
                        )}
                        {onMove && listName === 'Done' && (
                            <button onClick={handleMoveBackward} className={`${bgColor} ${textColor} hover:${hoverBg} rounded py-1 px-2 focus:outline-none`}>
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Doing
                            </button>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;