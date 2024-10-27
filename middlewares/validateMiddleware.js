const { query } = require('express');
const { ZodError } = require('zod');

const validateInput = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();

        } catch (e) {
            if (e instanceof ZodError) {
                const zErrors = e.errors.map(
                    (err) => { message: err.message}
                )
                return res.status(400).json({ zodValidationError: zErrors });
            } else {
                return res.status(500).json({ err: "Internal Server Error" });
            }
        }
    }
};

module.exports = validateInput;