const express = require('express');
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
dotenv.config();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_DB_URI || "mongodb+srv://petechatty:HYal8seQzoCiRH1E@blinqioassessment.ur0tf.mongodb.net/?retryWrites=true&w=majority&appName=blinqIOAssessment")
    .then(() => {
    console.log('Connected to Database successfully!');
}).catch(error => console.error(`MongoDB connection error: ${error}`))


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(4000, () => {
    console.log(`The server is running on port 4000`);
})