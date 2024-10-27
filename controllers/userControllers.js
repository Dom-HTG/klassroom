const UserModel = require('../models/userModel');
const ApiError = require('../errors/apierror');
const { response } = require('express');

// Get all users
const getAllUsers = async (_, res) =>{
    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            throw new ApiError('No users found', 404);
        };

        return res.status(200).json({
            message: "All users retrieved successfully",
            count: users.length,
            payload: users
        });

    } catch (e) {
        console.error(e.message);
        
        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.userId;
        
        const user = await UserModel.findById(id);
        if (!user) {
            throw new ApiError('User not found', 404);
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            payload: user
        });

    } catch (e) {
        console.error(e.message);
        
        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

// Update user data by id
const updateUser = async (req, res) => {
    try {
        const id = req.params.userId;

        const updatedUser = await UserModel.findByIdAndUpdate(id);
        if (!updatedUser) {
            throw new Error('Failed to update user');
        }

        return res.status(200).json({
            message: "User updated successfully",
            payload: updatedUser
        });

    } catch (e) {
        console.error(e.message);
        
        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

// Delete user by id
const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser) {

            return res.status(200).json({
                message: "User deleted successfully",
                deletedUser: deletedUser.email
            });

        } else {
            throw new Error('Failed to delete user');
        };
    } catch (e) {
        console.error(e.message);
        
        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

module.exports = {
    getAllUsers,
    getUserById, 
    updateUser, 
    deleteUser
};