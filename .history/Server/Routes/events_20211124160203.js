let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/events');

/* GET Find Events page */
router.get('/find-events', eventsController.displayFindEventsPage);

module.exports = router;