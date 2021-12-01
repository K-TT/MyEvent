let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/eventdetails');

/* GET Find a Event Detail page */
router.get('/', eventsController.displayFindEventDetailPage);

module.exports = router;

