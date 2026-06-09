const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

// Global Express error-handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message || err);
    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mujahid:mujee452@cluster0.ei15p.mongodb.net/ToDoListDb?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('DB connection error:', err.message || err);
        process.exit(1);
    });

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err.message || err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected from DB');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message || err);
    process.exit(1);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
