const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller');
const {register, login } = require('../helpers/auth/validation');
router.post("/register", register, authController.register);
router.post("/login", login, authController.login);

module.exports = router;