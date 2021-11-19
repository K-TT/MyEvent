let express = require('express');
let router = express.Router();

let indexController = require('../Controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

/* GET Login page. */
router.get('/login', indexController.displayLoginPage);

//TODO
// Add login display and process
// Add register display and process
router.get('/register', indexController.displayRegisterPage);
// Process logout

module.exports = router;
