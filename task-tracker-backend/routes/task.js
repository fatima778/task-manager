const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireauth');
const Task = require('../models/task');

// Get all tasks (requires authentication)
router.get('/tasks', requireAuth, async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'username'); // Populate assignedTo with username
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// Create a new task (requires authentication)
router.post('/tasks', requireAuth, async (req, res) => {
    const { title, description, assignedTo, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTask = new Task({
            title,
            description,
            assignedTo: assignedTo || null, // Allow null if no one is assigned
            status: status || 'To Do',
        });
        const savedTask = await newTask.save();
        const populatedTask = await Task.findById(savedTask._id).populate('assignedTo', 'username');
        res.status(201).json(populatedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task' });
    }
});

// Get a specific task by ID (requires authentication)
router.get('/tasks/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate('assignedTo', 'username');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Failed to fetch task' });
    }
});

// Update a task by ID (requires authentication)
router.put('/tasks/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, assignedTo, status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, assignedTo, status },
            { new: true } // Return the updated document
        ).populate('assignedTo', 'username');

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
});

// Delete a task by ID (requires authentication)
router.delete('/tasks/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

module.exports = router;