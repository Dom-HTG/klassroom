// This is a custom error that wraps the built-in error interface.
class ApiError extends Error {

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = ApiError;