require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI; // Get URI from environment variable

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// MongoDB Connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true, // While deprecated, keep it for now
    useUnifiedTopology: true, // While deprecated, keep it for now
    ssl: true, // Ensure SSL is explicitly enabled (crucial for Atlas)
    // sslValidate: false // You might need this temporarily for testing, but be cautious in production
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});