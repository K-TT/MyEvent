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
  

/* Process Register Page */
  module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
    });
    User.register(newUser, req.body.password, (err) => {
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
  
        return passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    });
  };

  module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
  }

  /* Display Saved Events Page */
module.exports.displaySavedEventsPage = (req, res, next) => {
  res.render('index', {title: 'Saved Events', page: 'savedevents'});
};