var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
