const mongooose = require('mongoose');

// Connect to MongoDB.
const mongoURL = process.env.MONGO_URL;
const clientOptions = { serverApi: {version: '1', strict: true, depreciationErrors: true }};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, clientOptions);
        console.log('Connection to Database Success');
    } catch (e) {
        console.error("Error connecting to MongoDB ==>> ", e);
    }
};

module.exports = connectDB;