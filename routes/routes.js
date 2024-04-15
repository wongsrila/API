const express = require('express');
const indexController = require('../controllers/indexController');
const teamController = require('../controllers/teamController');
const fixtureController = require('../controllers/fixtureController');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/league/:id', indexController.leagueGet);
router.get('/team/:id', teamController.teamGet);
router.get('/fixture/:id', fixtureController.fixtureGet);

module.exports = router;
