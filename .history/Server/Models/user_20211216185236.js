let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// User Schema
let User = mongoose.Schema(
    {
      username: 
      {
        type: String,
        default: "",
        trim: true,
        required: "username is required",
        lowercase: true
      },
      firstName: 
      {
        type: String,
        default: "",
        trim: true,
        required: "first name is required"
      },
      lastName: 
      {
        type: String,
        default: "",
        trim: true,
        required: "last name is required"
      },
      email: 
      {
        type: String,
        default: "",
        trim: true,
      required: "email address is required",
    },
      email: 
      {
        type: String,
        default: "",
        trim: true,
        required: "email address is required",
      },
      city:
      {
        type: String,
        default: "",
        trim: true,
      },
      birthday: 
      {
        type: Date,
        trim: true,
      },
      savedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: "events"}],
      notInterestedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: "events"}],
      tags: [String],
      created: 
      {
        type: Date,
        default: Date.now
      },
      update: 
      {
        type: Date,
        default: Date.now
      }
    },
    {
      collection: "users",
    }
  );


let options = ({ missingPasswordError: "Incorrect / Missing Password" });

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);
