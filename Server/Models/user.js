const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserModel = mongoose.Schema
({
    firstAndLastName:
    {   type:String,
        require:true,

    },
    userName: 
    {
        type:  String,
        require:true,

    },
    
    email:
    {
        type:String,
        require:true,

    },

    birthday:
    {
        type:Date,
        require:true,
    },

    address:
    {
        type:String,
        require:true,
    },


    city:
    {
        type:String,
        require:true,

    },

    phoneNumber:
    {
        type:Number,
        require:true,

    },

    bio:
    {
        type:String,
    },

    keywordsarray:
    [{
        type:String,
    }],

    savedEvent:
    {

            type: mongoose.Schema.Types.ObjectId,
            ref: "event",


    },

    notInterestedEvent:
    {

            type: mongoose.Schema.Types.ObjectId,
            ref: "event",

    },

    created: {
        type: Date,
        default: Date.now()
    },

    updated: {
        type: Date,
        default: Date.now()
    },

    type: {
            type: String,
            enum: ["regular user", "VIP user", "event organizer"],
            default: "regular user",
        },
},

{
    collection: "users",
    timestamps: true,
});

let options = { missingPasswordError: "Incorrect / Missing Password" };

UserModel.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserModel);