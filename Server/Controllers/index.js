const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create instance of user model
let userModel = require("../Models/user");
let User = userModel.User; // alias

/* Display Home Page */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'MyEvent', page: 'home'});
};

/* Display Login Page */
module.exports.displayLoginPage = (req, res, next) => {
    res.render("auth/login", { title: 'Login', page: 'login' });
};

/* Display Register Page */
module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
      res.render("auth/register", {
        title: "Register",
        page: "register",
        messages: req.flash("registerMessage"),
        username: req.user ? req.user.username : "",
  
      });
    } else {
      return res.redirect("/");
    }
  };
  
  // Get city value
  //let citySelection = document.getElementById("ctySelection").value;

  // Get interests
  /*let interestsSelection = [];
  $("input:checkbox[name=type]:checked").each(function(){
    interestsSelection.push($(this).val());
});*/

/* Process Register Page */
  module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new userModel({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      firstName: req.body.fname,
      lastName: req.body.lname,
      //city: req.body.citySel,
      //birthday: req.body.birthday,
      //tags: [req.body.type]
    });
    userModel.register(newUser, req.body.password, (err) => {
      if (err) {
        console.log("Error: Inserting New User");
        if (err.name == "UserExistsError") {
          req.flash(
            "registerMessage",
            "Registration Error: User Already Exists!"
          );
          console.log("Error: User Already Exists!");
        }
        return res.render("auth/register", {
          title: "Register",
          page: "register",
          messages: req.flash("registerMessage"),
          username: req.user ? req.user.username : "",
  
        });
      } else {
        // if no error exists, then registration is successful
  
        // redirect user and authenticate them
        console.log("Registration Successful");
        return passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    });
  };

  /* Display Saved Events Page */
module.exports.displaySavedEventsPage = (req, res, next) => {
  res.render('index', {title: 'Saved Events', page: 'savedevents'});
};