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
router.get('/edit/:id', profileController.displayEditPage);

/* GET Route for processing Edit Page - update operation */
router.post('/edit/:id', requireAuth, profileController.processEditPage);

module.exports = router;