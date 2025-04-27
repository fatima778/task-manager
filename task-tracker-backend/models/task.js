const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    // You can add other task-related fields here, like dueDate, priority, etc.
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;