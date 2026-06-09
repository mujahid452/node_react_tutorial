const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/routes/.env' });

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to known origins in production
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing (built-in Express middleware, replaces deprecated body-parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routesHandler);

const dbUri = process.env.DB_URI;
if (!dbUri) {
  console.error('DB_URI environment variable is not set. Exiting.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => {
    console.log('Db Connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
