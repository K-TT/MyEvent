let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;


/* Display Find aEvent detail Page */
module.exports.displayFindEventDetailPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Event detail', page: 'eventdetails', event: User });
    });
};




/* 2021-11-29: can not use this router, because the saved event list function is still building */
/* Display Find Event Detail Page */

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