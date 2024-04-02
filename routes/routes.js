const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/about', indexController.aboutGet);

module.exports = router;
