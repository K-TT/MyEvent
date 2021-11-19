let mongoose = require('mongoose');

let EventModel = mongoose.Schema
({
    eventName: 
    {
        type:String,
        required:true
    },
    
    eventOrganizer:
    {
        type:String,
        required:true
    },

    eventStartTime:
    {
        type:Date,
        required:true
    },

    eventEndTime:
    {
        type:Date,
        required:true
    },

    location:
    {
        type:String,
        required:true
    },

    price: 
    {
        type:Number,
        required:true

    },

    description:
    {  
         type:String,
        required:true

    },
    
    tags:
    {
        type:String,
        enum: ["School", "College", "Singles","Couples","LGBTQA","Culture","Newcomers","Party","Pet","Recruiters","Jobseeker","Profession","Businessowners","Religious","Languageexchange","Motivationalspeaker","Anime","Gamers","Movielovers","Artists","Bookworms","Cosplayers","Stargazing","Naturelovers","Sportsman","Hikers"],
       

    }

    
},
 {
    collection: "events"
});

module.exports = mongoose.model("Event", EventModel);