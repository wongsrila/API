const express = require('express');
const indexController = require('../controllers/indexController');
const movieDetailsController = require('../controllers/movieDetailsController');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/about', indexController.aboutGet);
router.get('/movie/:id', movieDetailsController.detailsGet);

module.exports = router;
