const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// User Model.
const userSchema =  Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
}, { timestamps: true });

// Use pre-save hook to hash user password before saving to database only if use hasn't been been modified.
userSchema.pre('save', async function (next) {
    const user = this;
    // Check if user has been modified.
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash; 
            next();
        } catch (error) {
            console.error("Error hasing user password");
            next(error);
        }
    } else {
        //call next function to proceed to saving user data.
        next();
    }
});    

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;