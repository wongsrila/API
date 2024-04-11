const express = require('express');
const indexController = require('../controllers/indexController');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/premier-league', indexController.plGet);
router.get('/bundesliga', indexController.blGet);
router.get('/laliga', indexController.llGet);
router.get('/serie-a', indexController.saGet);
router.get('/ligue-1', indexController.l1Get);

router.get('/team/:id', teamController.teamGet);

module.exports = router;
