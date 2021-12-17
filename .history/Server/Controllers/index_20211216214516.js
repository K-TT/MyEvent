const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create the user model instance
let userModel = require("../Models/user");
let User = userModel.User; // alias

/* Display Profile Page */
module.exports.displayProfilePage = (req, res, next) => {
    let id = req.user._id;

    User.findById(id, (err, user) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render("auth/profile", {
                title: "My Profile",
                page: "profile",
                username: req.user ? req.user.username : "",
                user: user,
            });
        }
    });
};

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};

/*Process Profile Page*/
module.exports.processProfilePage = async(req, res, next) => {
    let id = req.user.id

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

    let user = await User.findById(id);

    let updatedUser = new User({
        "_id": id,
        "username": req.body.username.toLowerCase(),
        "firstName": req.body.fname,
        "lastName": req.body.lname,
        "email": req.body.email,
        "gender": req.body.gender,
        "city": req.body.citySel,
        "birthday": req.body.birthday,
        "savedEvents": user.savedEvents, // if it's not here then it will get deleted after updating the profile
        "notInterestedEvents": user.notInterestedEvents, // if it's not here then it will get deleted after updating the profile
        "tags": interestSelections
    });

    User.updateOne({ _id: id }, updatedUser, {}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/'); //redirect to homepage since it logs the user out after update the profile
        }
    });

};
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
        console.log("Registration Successful");
        return passport.authenticate("local")(req, res, () => {
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