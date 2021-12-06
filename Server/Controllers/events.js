const { Console } = require('console');
let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;
let eventModel = require("../Models/event");
let Event = eventModel.eventSchema;
let passport = require('passport');
const { reset } = require('nodemon');
let mongoose = require('mongoose');

function FindEventsAndDisplayFindEventsPage(userId, req, res, next) {
    Event.find((err, eventList) => {
        if (err) {
            return console.error(err);
        } else {

            //let eventsNotInSavedArray = new Array();
            let eventsNotInInterestingArray = new Array();
            //let eventsToShow = new Array();

            User.findById(userId, (err, user) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {

                    /*if (user.savedEvents.length === 0 && user.notInterestedEvents.length === 0) {
                        eventsNotInSavedArray = eventList;
                        eventsNotInInterestingArray = eventList;
                    }*/

                    eventList.forEach(event => {
                        let counterOfMatchesInArrays = 0;
                        /*user.savedEvents.forEach(saved => {
                            if (event.id.valueOf() === saved.valueOf()) {
                                counterOfMatchesInArrays++;
                                //eventsNotInSavedArray.push(event);
                                //console.log(eventsNotInSavedArray);
                            }
                            //console.log('Is it saved? ' + notSaved + ' Event ID: ' + event.id);
                        })
                        if (counterOfMatchesInArrays === 0) {
                            eventsNotInSavedArray.push(event);
                            //console.log(eventsNotInSavedArray);
                        }
                        //console.log(eventsNotInSavedArray);
                        
                        counterOfMatchesInArrays = 0;*/
                        user.notInterestedEvents.forEach(notInterested => {
                            if (event.id.valueOf() === notInterested.valueOf()) {
                                counterOfMatchesInArrays++;
                                //eventsNotInInterestingArray.push(event);
                            }
                            //console.log('Is the user interested? ' + interested + ' Event ID: ' + event.id);
                        })
                        if (counterOfMatchesInArrays === 0) {
                            eventsNotInInterestingArray.push(event);
                        }
                    })

                    //let temp = eventsNotInSavedArray.concat(eventsNotInInterestingArray);
                    //eventsToShow = temp.filter((item, pos) => temp.indexOf(item) === pos)
                    //eventsToShow = Array.from(new Set(eventsNotInSavedArray.concat(eventsNotInInterestingArray)))
                    //eventsToShow = eventsNotInSavedArray.concat(eventsNotInInterestingArray)

                    //console.log(eventsToShow);
                    res.render('index', {
                        title: 'Find Events',
                        page: 'findevents',
                        username: req.user ? req.user.username : '',
                        events: eventsNotInInterestingArray //eventsNotInInterestingArray contains all elements that should not be shown to the user
                    })
                }
            });
        }
    })
}

/* Display Find Events Page */
module.exports.displayFindEventsPage = (req, res, next) => {
    if (req.user == null) {
        return res.redirect('/login');
    }

    let userId = req.user.id;

    FindEventsAndDisplayFindEventsPage(userId, req, res, next);
};


/* Process Find Events Page -> Save an Event */
module.exports.processFindEventsPage = (req, res, next) => {
    let userId = req.user.id;

    User.findById(userId, async (err, user) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            let eventId = req.body.eventId;
            let userAction = req.body.userAction; //save or mark as not interesting
            let eventIdAsObjectIdType = mongoose.Types.ObjectId(eventId);
            if (userAction === "no") {
                //user.notInterestedEvents.push(eventIdAsObjectIdType);
                let updatedNotInterestedEventsArray = user.notInterestedEvents;
                updatedNotInterestedEventsArray.push(eventIdAsObjectIdType);

                User.updateOne({ _id: userId }, { "$set": { "notInterestedEvents": updatedNotInterestedEventsArray } }, {}, (err) => {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    }
                });
            }
            else if (userAction === "yes") {
                //user.savedEvents.push(eventIdAsObjectIdType);
                let updatedSavedEventsArray = user.savedEvents;

                let counterOfMatchesInArray = 0;
                for (var i = 0; i < updatedSavedEventsArray.length; i++) {
                    if (updatedSavedEventsArray[i].valueOf() === eventIdAsObjectIdType.valueOf()) {
                        counterOfMatchesInArray++;
                    }
                }
                if (counterOfMatchesInArray === 0) {
                    updatedSavedEventsArray.push(eventIdAsObjectIdType);
                    User.updateOne({ _id: userId }, { "$set": { "savedEvents": updatedSavedEventsArray } }, {}, (err) => {
                        if (err) {
                            console.log(err);
                            res.end(err);
                        }
                    });

                    let updatedNotInterestedEventsArray = user.notInterestedEvents;
                    updatedNotInterestedEventsArray.push(eventIdAsObjectIdType);

                    User.updateOne({ _id: userId }, { "$set": { "notInterestedEvents": updatedNotInterestedEventsArray } }, {}, (err) => {
                        if (err) {
                            console.log(err);
                            res.end(err);
                        }
                    });

                    //increment interestedCounter by 1 every time a user saves an event
                    Event.updateOne({ _id: eventId }, { $inc: { interestedCounter: 1 } }, {}, (err) => {
                        if (err) {
                            console.log(err);
                            res.end(err);
                        }
                    });
                }

            }

            FindEventsAndDisplayFindEventsPage(userId, req, res, next);
        }
    });
}

/* Display Saved Events Page */
module.exports.displaySavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null) {
        return res.redirect('/login');
    }

    let userId = req.user.id;

    User.findById(userId, async (err, user) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            let events = new Array();
            let savedEventsArray = user.savedEvents;

            for (var i = 0; i < savedEventsArray.length; i++) {
                let event = await Event.findById(savedEventsArray[i]);
                events.push(event);
            }

            //show the saved events view
            res.render('index',
                {
                    title: 'Saved Events',
                    page: 'savedevents',
                    username: req.user ? req.user.username : '',
                    events: events // send the saved events array to the page
                });
        }
    });

};

/* Process Saved Events Page */
module.exports.processSavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null) {
        return res.redirect('/login');
    }
    let id = req.user.id;

    let eventCity = req.body.eventCitySelection;
    let eventPrice = req.body.eventPriceSelection;
    let eventKeyword = req.body.keyword;
    let eventStartDateString = req.body.eventStartDatePicker;
    let eventStartDate = new Date(eventStartDateString);

    User.findById(id, async (err, user) => {
        let matchingEvents = new Array();
        let price; // to check if event is paid or not

        let savedEventsArray = user.savedEvents;

        // if the selections are empty then show all events
        if (eventCity === "" && eventPrice === "" && eventKeyword === "" && eventStartDateString === "") {
            for (var i = 0; i < savedEventsArray.length; i++) {
                let event = await Event.findById(savedEventsArray[i]);
                matchingEvents.push(event);
            }
        }
        // if selections are not empty then find events with matching parameters
        else {
            for (var i = 0; i < savedEventsArray.length; i++) {
                let event = await Event.findById(savedEventsArray[i]);

                if (event.price <= 0) {
                    price = 'Free'
                } else {
                    price = 'Paid'
                }

                if ((eventCity === "" || event.city === eventCity) &&
                    (eventPrice === "" || price === eventPrice) &&
                    (eventStartDateString === "" || event.eventStartTime.getTime() >= eventStartDate.getTime())) {
                    for (var j = 0; j < event.tags.length; j++) {
                        if (eventKeyword === "" || event.tags[j] === eventKeyword) {
                            matchingEvents.push(event);
                            break;
                        }
                    }
                }
            }
        }

        res.render('index', {
            title: 'Saved Events',
            page: 'savedevents',
            username: req.user ? req.user.username : '',
            events: matchingEvents
        })
    })

};

//Cancel event button processing logic
module.exports.cancelEventOnSavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null) {
        return res.redirect('/login');
    }
    let userId = req.user.id;
    let eventId = req.body.eventId;
    let eventIdAsObjectIdType = mongoose.Types.ObjectId(eventId);

    User.findById(userId, async (err, user) => {

        let updatedSavedEventsArray = user.savedEvents;
        const indexSavedEvent = updatedSavedEventsArray.indexOf(eventIdAsObjectIdType);
        if (indexSavedEvent > -1) {
            updatedSavedEventsArray.splice(indexSavedEvent, 1);
        }

        User.updateOne({ _id: userId }, { "$set": { "savedEvents": updatedSavedEventsArray } }, {}, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
        });

        let updatedNotInterestedEventsArray = user.notInterestedEvents;
        const indexNotInterestedEvent = updatedNotInterestedEventsArray.indexOf(eventIdAsObjectIdType);
        if (indexNotInterestedEvent > -1) {
            updatedNotInterestedEventsArray.splice(indexNotInterestedEvent, 1);
        }

        User.updateOne({ _id: userId }, { "$set": { "notInterestedEvents": updatedNotInterestedEventsArray } }, {}, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
        });

        return res.redirect('/events/saved-events');
    })

};

/* Display Event Details Page */
/*Display the details of the event by click detail button in the saved-event page  */

module.exports.displayFindEventDetailPage = (req, res, next) => {
    if (req.user == null) {
        return res.redirect('/login');
    }
    let id = req.params.id;
    Event.findById(id, (err, events) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('index', {
                title: 'Find Event detail',
                page: 'eventdetails',
                username: res.user ? res.User.username : '',
                events: events
            });

        }

    })

};





/* below data is from eventdetails.js file
/* Display Find aEvent detail Page */
/*
module.exports.displayFindEventDetailPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    //Render Find Events page
    res.render('index', { title: 'Find Event detail', page: 'eventdetails', event: User });
    });
};





//Display Find Event Detail Page //

module.exports.processFindEventDetailPage = (req, res, next) => {
    let id=req.params.id;
    User.default.findById(id,{},{},function(err, event){
        if(err)
        {
            return console.error(err);
        }
    res.render('index', { title: 'Find Event Detail', page: 'eventdetails', event: User });
    });
};
*/