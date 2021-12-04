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


/* below all data is from eventdetails.js in router file */
/*
let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/eventdetails');


//GET Find a Event Detail page 
router.get('/', eventsController.displayFindEventDetailPage);

// 2021-11-29: can not use this router, because the saved event list function is still building 
// GET Find a Event Detail by using event ID page 
router.get('/eventdetails/:id', eventsController.processFindEventDetailPage);
*/



module.exports = router;


