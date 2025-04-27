import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

function UrgentList({ urgent, setUrgent, doing, setDoing, theme }) {
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-red-500' : 'text-red-700';
    const buttonBg = isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300';
    const buttonText = isDark ? 'text-gray-300' : 'text-gray-700';
    const urgentButtonBg = isDark ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-700';
    const urgentButtonText = 'text-white';

    const handleAddTask = (newTaskText) => {
        if (newTaskText.trim()) {
            const newTaskObject = {
                id: Date.now(),
                text: newTaskText.trim(),
                status: 'Urgent' // Add status
            };
            setUrgent([...urgent, newTaskObject]);
            setNewTaskVisible(false);
        }
    };

    const handleDeleteTask = (taskIdToDelete) => {
        setUrgent(urgent.filter((task) => task.id !== taskIdToDelete));
    };

    const handleMoveToDoing = (taskToMove) => {
        setUrgent(urgent.filter((task) => task.id !== taskToMove.id));
        taskToMove.status = 'In Progress';
        setDoing([...doing, taskToMove]);
    };

    const handleEditTask = (taskId, newText) => {
        setUrgent(urgent.map(task => task.id === taskId ? { ...task, text: newText.trim() } : task));
    };

    return (
        <div className={`${bgColor} shadow-md rounded-md p-4 flex flex-col`} style={{ minHeight: '200px' }}>
            <h2 className={`text-xl font-semibold ${textColor} mb-2 flex items-center`}>
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" /> Urgent
            </h2>
            <ul className="list-none p-0 m-0">
                {urgent.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onMove={() => handleMoveToDoing(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                        onEdit={handleEditTask}
                        listName="urgent"
                        isUrgent={true}
                        theme={theme}
                    />
                ))}
            </ul>
            {newTaskVisible && (
                <AddTask
                    onSave={handleAddTask}
                    onCancel={() => setNewTaskVisible(false)}
                    buttonText="Add Urgent Task"
                    buttonClassName={`${urgentButtonBg} ${urgentButtonText} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    theme={theme}
                />
            )}
            <button
                onClick={() => setNewTaskVisible(true)}
                className={`mt-4 ${buttonBg} ${buttonText} font-semibold py-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add urgent task
            </button>
        </div>
    );
}

export default UrgentList;