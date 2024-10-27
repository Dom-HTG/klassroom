const express = require('express');

const { Register, Login } = require('../controllers/authControllers');

// initialize new expresss router to handle routes.
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;