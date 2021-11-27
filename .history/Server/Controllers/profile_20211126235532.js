const { Console } = require('console');
let express = require('express');
let passport = require('passport');

// create the user model instance
let userModel = require("../Models/user");