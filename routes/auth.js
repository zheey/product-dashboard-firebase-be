const express = require('express');
let router = express.Router();
const { authController } = require("../controller/index")

router.get('/auth', authController.authenticateUser);

module.exports = router;