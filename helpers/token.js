const jwt = require('jsonwebtoken');
const ApiError = require('../errors/apierror');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// newToken() creates a new JWT.
const newToken = async (id, email) => {
    const token = jwt.sign(
        {id, email},
        TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    return token;
};

//verifyToken() verifies and checks validity of the token.
const verifyToken = async (token) =>{
    try {

        const tokenPayload = jwt.verify(token, TOKEN_SECRET);
        return tokenPayload;

    } catch (e) {
        return new ApiError("Invalid token", 400);
    }
};

module.exports = { newToken, verifyToken };