let express = require('express');
let router = express.Router();

let eventsController = require('../Controllers/eventdetails');

/* Temporary use */
/* GET Find a Event Detail page */
router.get('/', eventsController.displayFindEventDetailPage);

/* 2021-11-29: can not use this router, because the saved event list function is still building */
/* GET Find a Event Detail by using event ID page */
/*router.get('/eventdetails/:id', eventsController.displayFindEventDetailPage);*/



module.exports = router;

