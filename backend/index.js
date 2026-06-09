const express = require('express');
const connectDB = require('./config/db');
const routesHandler = require('./routes/handler.js');
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routesHandler);

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
