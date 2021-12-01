let express = require('express');
let router = express.Router();

let profileController = require('../Controllers/events');

/* GET Profile page */
router.get('/profile', profileController.displayProfilePage);

/* POST Profile page */
router.post('/profile', profileController.processProfilePage);

module.exports = router;