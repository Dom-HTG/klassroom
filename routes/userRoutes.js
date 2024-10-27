const express = require('express');
const router = express.Router();

const user = require('../controllers/userControllers');

// retrieves all users.
router.get('/', user.getAllUsers);

// retrieves user by id.
router.get('/:userId', user.getUserById);

// updates users data.
router.put('/:userId', user.updateUser);

// deletes users data.
router.delete('/:userId', user.deleteUser);

module.exports = router;