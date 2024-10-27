const express = require('express');

const { Register, Login } = require('../controllers/authControllers');
const validateInput = require('../middlewares/validateMiddleware');
const { LoginSchema, RegisterSchema } = require('../helpers/validate');

// initialize new expresss router to handle routes.
const router = express.Router();

router.post('/register', validateInput(RegisterSchema), Register);
router.post('/login', validateInput(LoginSchema), Login);

module.exports = router;