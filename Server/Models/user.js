let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// Event schema
let eventSchema = new mongoose.Schema({
    eventName: 
    {
        type:String,
        trim: true,
        required: "event name is required"
    },
    eventStartTime:
    {
        type:Date,
        trim: true,
        required: "start time is required"
    },
    eventEndTime:
    {
        type:Date,
        trim: true,
        required: "end time is required"
    },
    city:
    {
        type: String,
        default: "",
        trim: true,
        required: "city is required"
    },
    price:
    {
        type: Number,
        required: "price is required"
    },
    description:
    {
        type:String,
        trim: true,
        required: "description is required"
    },
    interestedCounter:
    {
        type: Number,
        default: 0
    },
    tags: [String]
});

// User Schema
let UserModel = mongoose.Schema(
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
      city:
      {
        type: String,
        default: "",
        trim: true,
        required: "city is required",
      },
      birthday: 
      {
        type: Date,
        trim: true,
        required: "birthday is required",
      },
      events: [eventSchema],
      savedEvents: [eventSchema],
      notInterestedEvents: [eventSchema],
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


let options = { missingPasswordError: "Incorrect / Missing Password" };

UserModel.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserModel);