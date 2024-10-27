const ApiError = require('../errors/apierror');
const UserModel = require('../models/userModel');

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

const Register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, avatar } = req.body;

        // Check that all field (except avatar) are present in request body.
        if (!firstName || !lastName || !email || !phone || !password || !avatar) {
            throw new ApiError('All field are required', 400);
        }

        // Check if the user already exists in the database(registered).
        const registeredUser = await UserModel.find({ email: email }); // this will return the user object if a user exists with the passed in email address.

        if (registeredUser) {
            throw new ApiError('User with this email already exists', 400);
        }

        // New user.
        const user = new User(firstName, lastName, email, phone, password, avatar);
        const newUser = await UserModel.create(user);
        console.log("New user created");

        // Create new JWT.
        




    } catch (e) {
        console.error(e.message);

        const statusCode = err.status || 500;
        const message = err.message || "Internal Server Error";

        return res.status(statusCode).json({ err_message: message });
    }
};