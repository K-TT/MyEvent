const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create the user model instance
let userModel = require("../Models/user");

/* Display Profile Page */
module.exports.displayProfilePage = (req, res, next) => {
  User.find((err, User) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('index', {
                title: 'Profile',
                User: userModel,
                page: 'profile',

            username: req.user ? req.user.username : ''});      
        }
    });
  
};

/* Process Profile Page */
module.exports.processProfilePage = (req, res, next) => {
    let newUser = new userModel({
      "username": req.body.username.toLowerCase(),
      "email": req.body.email,
      "firstName": req.body.fname,
      "lastName": req.body.lname,
      "city": req.body.citySel,
      "birthday": req.body.birthday,
      "tags": interestSelections
    });
  
  User.userModel.create(newUser, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/profile');
        }
    });

  
};
