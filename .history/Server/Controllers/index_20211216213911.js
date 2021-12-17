const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create the user model instance
let userModel = require("../Models/user");
let User = userModel.User; // alias

//create events model for popular events
let eventModel = require("../Models/event");
let Event = eventModel.eventSchema;

/* Display Home Page */
module.exports.displayHomePage = (req, res, next) => {
    Event.find({}, function(err, events) {
        res.render('index', {
            title: 'MyEvent',
            page: 'home',
            username: req.user ? req.user.username : '',
            events: events
        })

    })
};


/* Display Login Page */
module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: "login",
            page: "login",
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
        })
    } else {
        // redirecting
        return res.redirect('/');
    }
}

/* Process Login Page */
module.exports.processLoginPage = (req, res, next) => {
    console.log("inside processLoginPage");
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);

}

/* Display Register Page */
module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render("auth/register", {
            title: "Sign Up",
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
    // Get interest selections
    let interestSelections = [];

    if (req.body.Anime) {
        interestSelections.push(req.body.Anime);
    }
    if (req.body.Art) {
        interestSelections.push(req.body.Art);
    }
    if (req.body.Astronomy) {
        interestSelections.push(req.body.Astronomy);
    }
    if (req.body.Books) {
        interestSelections.push(req.body.Books);
    }
    if (req.body.Business) {
        interestSelections.push(req.body.Business);
    }
    if (req.body.College) {
        interestSelections.push(req.body.College);
    }
    if (req.body.Cosplay) {
        interestSelections.push(req.body.Cosplay);
    }
    if (req.body.Couples) {
        interestSelections.push(req.body.Couples);
    }
    if (req.body.Culture) {
        interestSelections.push(req.body.Culture);
    }
    if (req.body.Gaming) {
        interestSelections.push(req.body.Gaming);
    }
    if (req.body.Hiking) {
        interestSelections.push(req.body.Hiking);
    }
    if (req.body.JobSeeking) {
        interestSelections.push(req.body.JobSeeking);
    }
    if (req.body.LGBTQA) {
        interestSelections.push(req.body.LGBTQA);
    }
    if (req.body.LanguageExchange) {
        interestSelections.push(req.body.LanguageExchange);
    }
    if (req.body.MotivationalSpeaking) {
        interestSelections.push(req.body.MotivationalSpeaking);
    }
    if (req.body.Movies) {
        interestSelections.push(req.body.Movies);
    }
    if (req.body.Nature) {
        interestSelections.push(req.body.Nature);
    }
    if (req.body.Newcomers) {
        interestSelections.push(req.body.Newcomers);
    }
    if (req.body.Party) {
        interestSelections.push(req.body.Party);
    }
    if (req.body.Profession) {
        interestSelections.push(req.body.Profession);
    }
    if (req.body.Recruiting) {
        interestSelections.push(req.body.Recruiting);
    }
    if (req.body.School) {
        interestSelections.push(req.body.School);
    }
    if (req.body.Singles) {
        interestSelections.push(req.body.Singles);
    }
    if (req.body.Sports) {
        interestSelections.push(req.body.Sports);
    }

    // instantiate a user object
    let newUser = new User({
        username: req.body.username.toLowerCase(),
        email: req.body.email,
        firstName: req.body.fname,
        lastName: req.body.lname,
        city: req.body.citySel,
        birthday: req.body.birthday,
        tags: interestSelections
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
            req.flash(
                "registerMessage2",
                "Registration is Successful"
            );
            console.log("Registration Successful");
            return passport.authenticate("local")(req, res, () => {
                await wait(5000);
                res.redirect("/");
            });
        }
    });
};

/* Process Logout */
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}