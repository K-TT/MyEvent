let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;
let Event = userModel.Events;
let passport = require('passport');
const { reset } = require('nodemon');

/* Display Find Events Page */
module.exports.displayFindEventsPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Events', page: 'findevents', event: Event, username: req.user ? req.user.username : '' });
    });
};

/* Process Find Events Page -> Save an Event */
module.exports.processFindEventsPage = (req, res, next) => {
    let id = req.event._id;

    let newUserEvent = User({
        "savedEvents": id
    })

    User.create(newUserEvent, (err, User) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log("Event saved");
            res.redirect('index');
        }
    } )

}


  /* Display Saved Events Page */
  module.exports.displaySavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null)
    {
        return res.redirect('/login');
    }
    
    let id = req.user.id;

    User.findById(id, (err, user) => {
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
    });

  };

  
  /* Display Event Details Page */
  module.exports.displayEventDetailsPage = (req, res, next) => {
    res.render('index', {title: 'Event Details', page: 'eventdetails'});
  };