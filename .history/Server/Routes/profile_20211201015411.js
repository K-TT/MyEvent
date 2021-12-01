let express = require('express');
let router = express.Router();

let profileController = require('../Controllers/profile');

/* GET Profile page */
router.get('/', profileController.displayProfilePage);

/* GET Profile page */
router.get('/profile', profileController.displayProfilePage);

/* POST Profile page */
router.post('/profile', profileController.processProfilePage);


/* GET Route for displaying  Edit Page - update operation */
router.get('/profile_edit/:id', profileController.displayProfileEditPage);

/* POST Route for processing Edit Page - update operation */
router.post('/profile_edit/:id', profileController.processProfileEditPage);

module.exports = router;