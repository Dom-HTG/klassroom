const { z } = require('zod');

// Zod schemas are used to validate inputs from the user.
const LoginSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, {message: 'First Name is required'}),
        lastName: z.string().min(1, {message: 'Last Name is required'}),
        email: z.string().email({message: 'Email is invalid'}),
        phone: z.number().min(1, {message: 'Phone number is required'}),
        password: z.string().min(8, {message: 'Password should be at least 8 characters long'}),
        avatar: z.string()
    })
});

const RegisterSchema = z.object({
    body: z.object({
        email: z.string().email({message: 'Email address is required'}),
        password: z.string()
    })
});

module.exports = { LoginSchema, RegisterSchema };