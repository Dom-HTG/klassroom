const express = require('express');
require('dotenv').config();
const connectDB = require('./helpers/database');
const authRoutes = require('./routes/authRoutes');
const validateInput = require('./helpers/validate');

const app = express();

const PORT = process.env.PORT || 3002;

// Middleware to parse responses to JSON.
app.use(express.json());

// Midlleware to encode url format.
app.use(express.urlencoded({ extended: true }));

// Custom Middlewares.


//Initialize new datavbase connection.
connectDB();

// Routes for authentication (register/login)
app.use('/auth', authRoutes);

//Routes for user CRUD
// app.use();

app.listen(PORT, () => console.log(`Klassroom server is listening on port: ${PORT}`));