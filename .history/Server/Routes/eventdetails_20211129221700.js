let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/eventdetails');

/* GET Find a Event Detail page */
router.get('/eventdetails/:id', eventsController.displayFindEventDetailPage);

module.exports = router;

