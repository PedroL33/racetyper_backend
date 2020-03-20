var express = require('express');
var router = express.Router();
var resultsController = require('../controllers/resultsController')
const auth = require('../middlewear/authorization')

/* GET home page. */
router.get('/', auth.checkAuth, resultsController.allResults);

router.post('/', auth.checkAuth, resultsController.createResult);

router.get('/:id', auth.checkAuth, resultsController.userResults)

module.exports = router;
