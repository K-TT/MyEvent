let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/events');

/* GET Profile page */
router.get('/profile', profileController.displayProfilePage);

/* POST Profile page */
router.post('/profile', indexController.processProfilePage);

module.exports = router;