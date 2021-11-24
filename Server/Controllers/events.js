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
