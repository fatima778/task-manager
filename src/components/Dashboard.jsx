import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ToDoList from './ToDoList';
import DoingList from './DoingList';
import DoneList from './DoneList';

function Dashboard() {
    const [theme, setTheme] = useState('dark');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [username, setUsername] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUsername(storedUserName);
        }
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
        setTasks([
            { id: 1, title: 'Grocery Shopping', description: 'Buy milk, eggs, and bread', assignedTo: 'User A', status: 'ToDo', priority: 'medium' },
            { id: 2, title: 'Code Login Page', description: 'Implement user authentication', assignedTo: 'User B', status: 'Doing', priority: 'high' },
            { id: 3, title: 'Fix Build Issue', description: 'Investigate and resolve deployment failure', assignedTo: 'User A', status: 'ToDo', priority: 'high' },
            { id: 4, title: 'Write Unit Tests', description: 'Cover core functions with tests', assignedTo: 'User C', status: 'Done', priority: 'medium' },
            { id: 5, title: 'Meeting with Client', description: 'Discuss project progress', assignedTo: 'User B', status: 'ToDo', priority: 'high' },
        ]);
        setFilteredTasks(tasks);
    }, [theme]); // Added theme to dependency array to ensure body class updates on theme change

    useEffect(() => {
        applyFilter();
    }, [tasks, currentFilter]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const applyFilter = () => {
        let newFilteredTasks = [...tasks];

        if (currentFilter === 'highPriority') {
            newFilteredTasks = newFilteredTasks.filter(task => task.priority === 'high');
        } else if (currentFilter === 'assignedToMe') {
            const currentUserId = localStorage.getItem('userId');
            newFilteredTasks = newFilteredTasks.filter(task => task.assignedTo === currentUserId);
        }

        setFilteredTasks(newFilteredTasks);
    };

    const handleSearch = (searchTerm) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const searchedTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(lowerSearchTerm) ||
            (task.assignedTo && task.assignedTo.toLowerCase().includes(lowerSearchTerm))
        );
        setFilteredTasks(searchedTasks);
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: Date.now(), status: 'ToDo' }]);
    };

    const handleMoveTask = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleEditTask = (taskId, newText) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, title: newText } : task
        ));
    };

    const toDoTasks = filteredTasks.filter(task => task.status === 'ToDo');
    const doingTasks = filteredTasks.filter(task => task.status === 'Doing');
    const doneTasks = filteredTasks.filter(task => task.status === 'Done');

    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            <Sidebar
                theme={theme}
                toggleTheme={toggleTheme}
                onFilterChange={handleFilterChange}
                currentFilter={currentFilter}
            />
            <div className="flex-1 p-4">
                <Navbar username={username} theme={theme} onSearch={handleSearch} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <ToDoList
                        listName="ToDo"
                        tasks={toDoTasks}
                        onMove={handleMoveTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                        theme={theme}
                        onAddTask={handleAddTask}
                    />
                    <DoingList
                        listName="Doing"
                        tasks={doingTasks}
                        onMove={handleMoveTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                        theme={theme}
                        onAddTask={handleAddTask}
                    />
                    <DoneList
                        listName="Done"
                        tasks={doneTasks}
                        onMove={handleMoveTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                        theme={theme}
                        onAddTask={handleAddTask}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;