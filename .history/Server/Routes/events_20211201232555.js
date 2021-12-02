let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/events');

/* GET Find Events page */
// /events
router.get('/', eventsController.displayFindEventsPage);

/* GET Saved Events page */
// /events/saved-events
router.get('/saved-events', eventsController.displaySavedEventsPage);

/* POST - Process register page */
router.post('/saved-events', eventsController.processSavedEventsPage);

/* GET Event Details page */
router.get('/event-details', eventsController.displayEventDetailsPage);

module.exports = router;