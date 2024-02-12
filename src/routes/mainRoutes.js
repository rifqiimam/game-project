// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/mainController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
// router.post('/users', userController.createUser);

module.exports = router;
