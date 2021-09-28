const express = require('express');
const router = express.Router();
const { getUsers, getUserById, registerUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');

router.route('/')
    .get(auth, admin, getUsers)
    .post(registerUser);

router.route('/:id')
    .get(auth, admin, getUserById);

module.exports = router;