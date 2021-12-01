let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;

/* Display Find Event Detail Page */
module.exports.displayFindEventDetailPage = (req, res, next) => {
    let id=req.params.id;
    User.default.findById(id,{},{},function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Event Detail', page: 'eventdetails', event: User });
    });
};