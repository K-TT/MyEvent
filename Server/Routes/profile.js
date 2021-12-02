let express = require('express');
let router = express.Router();

let profileController = require('../Controllers/profile');

/* GET Profile page */
router.get('/', profileController.displayProfilePage);

/* POST Profile page */
router.post('/', profileController.processProfilePage);


module.exports = router;