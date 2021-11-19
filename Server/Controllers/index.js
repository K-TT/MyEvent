let express = require('express');

/* Display Home Page */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'MyEvent', page: 'home'});
};

/* Display Login Page */
module.exports.displayLoginPage = (req, res, next) => {
    res.render('auth/login', { title: 'Login', page: 'login' });
};

/* Display Register Page */
module.exports.displayRegisterPage = (req, res, next) => {
    res.render('auth/register', {title: 'Register', page: 'register' });
}

