let express = require('express');
let router = express.Router();


let indexController = require('../Controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

/* GET Login page. */
router.get('/login', indexController.displayLoginPage);

//TODO
// Add login process
/* POST - Process login page */

/* GET Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST - Process register page */
router.post('/register', indexController.processRegisterPage);

// TODO Process logout

/* GET Saved Events page */
router.get('/saved-events', indexController.displaySavedEventsPage);

/* GET Profile page */
router.get('/profile', indexController.displayProfilePage);


module.exports = router;
