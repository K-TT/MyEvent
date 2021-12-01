const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create the user model instance
let userModel = require("../Models/user");
let User = userModel.User; // alias

/* Display Profile Page */
module.exports.displayProfilePage = (req, res, next) => {

    let id = req.user.id;

  User.findById(id,(err, user) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('index', {
                title: 'Profile',
                page: 'profile',
                profile:User ,
                username: req.user ? req.user.username : '',
                user: user
            });
        }
    });
  
};

/*Process Profile Page*/
module.exports.processProfilePage = (req, res, next) => {
    let id = req.params.id
    let newUser = new User({

       _id : id, 
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      firstName: req.body.fname,
      lastName: req.body.lname,
      city: req.body.citySel,
      birthday: req.body.birthday,
      tags: interestSelections
    });
  
  User.create(newUser, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('profile');

        }
    });

  
};

// displays edit page when user logged in

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('profile/edit', {title: 'Edit Information', business: businessToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

// process edit page if user logged in

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusiness = Business({
        "_id": id,
        "nameCustomer": req.body.nameCustomer,
        "numberCustomer": req.body.numberCustomer,
        "emailCustomer": req.body.emailCustomer
    });
    
    Business.updateOne({ _id: id }, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/business-list');
        }
    });

}