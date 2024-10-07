const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI ||"mongodb+srv://petechatty:HYal8seQzoCiRH1E@blinqioassessment.ur0tf.mongodb.net/?retryWrites=true&w=majority&appName=blinqIOAssessment");
        console.log('Connected to Database successfully!');
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

connectDB();

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Export the app for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
}

