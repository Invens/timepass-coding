const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');


const errorMiddleware = require('./middlewares/errorMiddleware');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware for logging requests
app.use(morgan('dev'));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

// User Routes
// Main Routes
app.use('/api', routes);

// Error Middleware (Handles all errors globally)
app.use(errorMiddleware);

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
