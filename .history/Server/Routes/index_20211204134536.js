let express = require('express');
let router = express.Router();


let indexController = require('../Controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

/* GET Login page. */
router.get('/login', indexController.displayLoginPage);

/* POST - Process login page */
router.post('/login', indexController.processLoginPage);

/* GET Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST - Process register page */
router.post('/register', indexController.processRegisterPage);

/* GET - Process Logout */
router.get('/logout', indexController.performLogout);


module.exports = router;
