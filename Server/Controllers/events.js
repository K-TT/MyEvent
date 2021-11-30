let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;

/* Display Find Events Page */
module.exports.displayFindEventsPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Events', page: 'findevents', event: User });
    });
};

  /* Display Saved Events Page */

  // YOU HAVE TO BE LOGGED IN
  module.exports.displaySavedEventsPage = (req, res, next) => {
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
            //show the edit view
            res.render('index',
            {
                title: 'Saved Events',
                page: 'savedevents',
                username: req.user ? req.user.username : '',
                user: user
            }); 
        }
    });

  };

  
  /* Display Event Details Page */
  module.exports.displayEventDetailsPage = (req, res, next) => {
    res.render('index', {title: 'Event Details', page: 'eventdetails'});
  };