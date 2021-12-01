let mongoose = require('mongoose');
let Schema = mongoose.Schema;
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
        trim: true
    },
    eventEndTime:
    {
        type:Date,
        trim: true
    },
    city:
    {
        type: String,
        default: "",
        trim: true
    },
    price:
    {
        type: Number,
        required: "price is required"
    },
    description:
    {
        type:String,
        trim: true
    },
    interestedCounter:
    {
        type: Number,
        default: 0
    },
    tags: [String]
});

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
      events: [eventSchema],
      savedEvents: [{
         type: Schema.Types.ObjectId,
         ref: eventSchema
      }],
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


let options = ({ missingPasswordError: "Incorrect / Missing Password" });

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);
