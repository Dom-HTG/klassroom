const ApiError = require('../errors/apierror');
const UserModel = require('../models/userModel');
const { newToken, verifyToken } = require('../helpers/token');
const matchPassword = require('../helpers/bcrypt');

// User class will be used to construct an object for Register controller.
class User {

    constructor(firstName, lastName, email, phone, password, avatar) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.avatar = avatar;
    }
}

// Register is a controller that will be used to register users and store their data in the database.
const Register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, avatar } = req.body;

        // Check that all field (except avatar) are present in request body.
        if (!firstName || !lastName || !email || !phone || !password || !avatar) {
            throw new ApiError('All field are required', 400);
        }

        // Check if the user already exists in the database(registered).
        const registeredUser = await UserModel.findOne({ email: email }); // this will return the user object if a user exists with the passed in email address.

        if (registeredUser) {
            throw new ApiError('User with this email already exists', 400);
        }

        // New user.
        const user = new UserModel({
            firstName, lastName, email, phone, password, avatar
        });

        const savedUser = await user.save();

        // Create new JWT.
        const token = newToken(savedUser._id, savedUser.email);

        return res.status(201).json({
            message: 'User registered successfully',
            authToken: token,
            user: {
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName
            }
        });


    } catch (e) {
        console.error(e.message);

        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check to make sure that the request body contains the required fields.
        if (!email || !password) {
            throw new ApiError("All fields are requird", 400);
        }

        const registeredUser = await UserModel.findOne({  email });
        if (!registeredUser) {
            throw new ApiError("User not found", 404);
        }

        // hashPassword is the password stored in the database.
        const hashPassword = registeredUser.password;

        // Compare password against hashPassword.
        const valid = await matchPassword(password, hashPassword);
        
        // Throw error if password does not match.
        if (!valid) {
            throw new ApiError("Invalid login credentials", 400);
        }

        // create new JWT.
        const token = newToken(registeredUser._id, email);

        return res.status(200).json({
            message: "User Log in success",
            authToken: token,
            user: {
                email: registeredUser.email,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName
            }
        });

    } catch (e) {
        console.error(e.message);

        const statusCode = e.status || 500;
        const message = e.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};

module.exports = {
    Register,
    Login
};