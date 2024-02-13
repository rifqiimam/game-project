// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const swaggerDoc = require("swagg")
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.delete('/logout', userController.logout);

module.exports = router;
