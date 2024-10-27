const express = require('express');
require('dotenv').config();
const connectDB = require('./helpers/database');

const app = express();

const PORT = process.env.PORT || 3002;

// Middleware to parse responses to JSON.
app.use(express.json());

// Midlleware to encode url format.
app.use(express.urlencoded({ extended: true }));

//Initialize new datavbase connection.
connectDB();

app.listen(PORT, () => console.log(`Klassroom server is listening on port: ${PORT}`));