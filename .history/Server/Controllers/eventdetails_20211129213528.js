let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;

/* Display Find Event Detail Page */
module.exports.displayFindEventDetailPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Event Detail', page: 'eventdetails', event: User });
    });
};