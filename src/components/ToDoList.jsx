import React, { useState } from 'react'; // Import useState
import TaskItem from './TaskItem';
import AddTask from './AddTask';

function ToDoList({ tasks, onMove, onDelete, onEdit, theme, onAddTask }) {
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); // State for AddTask visibility
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const buttonBg = isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300';
    const buttonText = isDark ? 'text-gray-300' : 'text-gray-700';

    const toDoTasks = tasks.filter(task => task.status === 'ToDo');

    const handleAddTaskVisibility = () => {
        setIsAddTaskVisible(true);
    };

    const handleCancelAddTask = () => {
        setIsAddTaskVisible(false);
    };

    return (
        <div className={`${bgColor} shadow-md rounded-md p-4 flex flex-col`} style={{ minHeight: '200px' }}>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>To Do</h2>
            <ul className="list-none p-0 m-0">
                {toDoTasks && toDoTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onMove={onMove}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        listName="ToDo"
                        theme={theme}
                    />
                ))}
            </ul>
            {!isAddTaskVisible && (
                <button
                    onClick={handleAddTaskVisibility}
                    className={`mt-4 ${buttonBg} ${buttonText} font-semibold py-2 rounded focus:outline-none focus:shadow-outline`}
                >
                    Add a task
                </button>
            )}
            {isAddTaskVisible && (
                <AddTask onAddTask={onAddTask} onCancel={handleCancelAddTask} theme={theme} />
            )}
        </div>
    );
}

export default ToDoList;