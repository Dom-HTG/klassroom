const mongoose = require('mongoose');

// Connect to MongoDB.
const MONGO_URL = process.env.MONGO_URL;
const clientOptions = { serverApi: {version: '1', strict: true, depreciationErrors: true }};

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, clientOptions);
        console.log('Connection to Database Successful');

    } catch (e) {
        console.error("Error connecting to MongoDB ==>> ", e);
    }
};

module.exports = connectDB;