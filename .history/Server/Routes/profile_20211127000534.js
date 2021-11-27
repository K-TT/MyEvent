let express = require('express');
let router = express.Router();

let profileController = require('../Controllers/profile');

/* GET Profile page */
router.get('/', profileController.displayProfilePage);

/* GET Profile page */
router.get('/', profileController.displayProfilePage);

/* POST Profile page */
router.post('/profile', profileController.processProfilePage);

module.exports = router;