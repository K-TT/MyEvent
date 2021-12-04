let mongoose = require('mongoose');

// Event schema
let eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        trim: true,
        required: "event name is required"
    },
    eventStartTime: {
        type: Date,
        trim: true
    },
    eventEndTime: {
        type: Date,
        trim: true
    },
    city: {
        type: String,
        default: "",
        trim: true
    },
    price: {
        type: Number,
        required: "price is required"
    },
    description: {
        type: String,
        trim: true
    },
    interestedCounter: {
        type: Number,
        default: 0
    },
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    collection: "events"
});

module.exports.eventSchema = mongoose.model("Event", eventSchema);