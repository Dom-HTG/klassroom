const express = require('express');

const { app } = require('./server');

require('dotenv').config();
const connectDB = require('./helpers/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3002;

// Middleware to parse responses to JSON.
app.use(express.json());

// Midlleware to encode url format.
app.use(express.urlencoded({ extended: true }));

//Initialize new datavbase connection.
connectDB();

// Routes for authentication (register/login)
app.use('/auth', authRoutes);

//Routes for operations.
app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`Klassroom server is listening on port: ${PORT}`));