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

            let eventsToShow = new Array();

            User.findById(userId, (err, user) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {

                    eventList.forEach(event => {
                        let notSaved = true;
                        let interested = true;

                        user.savedEvents.forEach(saved => {
                            if (event.id != saved) {
                                notSaved = true;
                            }
                            else {
                                notSaved = false;
                            }
                            //console.log('Is it saved? ' + notSaved + ' Event ID: ' + event.id);
                        })

                        user.notInterestedEvents.forEach(notInterested => {
                            if (event.id != notInterested) {
                                interested = true;
                            }
                            else {
                                interested = false;
                            }
                            //console.log('Is the user interested? ' + interested + ' Event ID: ' + event.id);
                        })

                        if (notSaved && interested) {
                            eventsToShow.push(event);
                        }
                    })

                    res.render('index', {
                        title: 'Find Events',
                        page: 'findevents',
                        username: req.user ? req.user.username : '',
                        events: eventsToShow
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

    User.findById(userId, (err, user) => {
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
                updatedSavedEventsArray.push(eventIdAsObjectIdType);

                User.updateOne({ _id: userId }, { "$set": { "savedEvents": updatedSavedEventsArray } }, {}, (err) => {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    }
                });
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

    let id = req.user.id;

    /*User.findById(id, (err, user) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the saved events view
            res.render('index',
            {
                title: 'Saved Events',
                page: 'savedevents',
                username: req.user ? req.user.username : '',
                user: user // send the user object to the page
            }); 
        }
    });*/

    Event.find({}, function (err, events) {
        res.render('index', {
            title: 'Saved Events',
            page: 'savedevents',
            username: req.user ? req.user.username : '',
            events: events
        })
    })

};

/* Process Saved Events Page */
module.exports.processSavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null) {
        return res.redirect('/login');
    }

    let eventCity = req.body.eventCitySelection;
    let eventPrice = req.body.eventPriceSelection;

    Event.find({}, function (err, events) {
        let matchingEvents = new Array();
        let price; // to check if event is paid or not

        // if the selections are empty then show all events
        if (eventCity === "" && eventPrice === "") {
            matchingEvents = events;
        }
        // if selections are not empty then find events with matching parameters
        else {
            events.forEach(event => {
                if (event.price === 0) {
                    price = 'Free'
                } else {
                    price = 'Paid'
                }

                if ((eventCity === "" || event.city === eventCity) && (eventPrice === "" || price === eventPrice)) {
                    matchingEvents.push(event);
                }
            })
        }

        res.render('index', {
            title: 'Saved Events',
            page: 'savedevents',
            username: req.user ? req.user.username : '',
            events: matchingEvents
        })
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