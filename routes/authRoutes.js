const express = require('express');

const { Register, Login } = require();

// initialize new expresss router to handle routes.
const router = express.Router();

// Route to register a new user.
router.post('/auth/register', Register);
router.post('/auth/login', Login)