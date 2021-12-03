let express = require('express');
let userModel = require("../Models/user");
let User = userModel.User;
let eventModel = require("../Models/event");
let Event = eventModel.eventSchema;
let passport = require('passport');
const { reset } = require('nodemon');

/* Display Find Events Page */
module.exports.displayFindEventsPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    /* Render Find Events page */
    res.render('index', { title: 'Find Events', page: 'findevents', event: Event, username: req.user ? req.user.username : '' });
    });
};

/* Process Find Events Page -> Save an Event */
module.exports.processFindEventsPage = (req, res, next) => {
    let id = req.params.id;

    let newUserEvent = User({
        "savedEvents": id
    })

    User.create(newUserEvent, (err, User) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log("Event saved");
            res.redirect('index');
        }
    } )

}


  /* Display Saved Events Page */
  module.exports.displaySavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null)
    {
        return res.redirect('/login');
    }
    
    let id = req.user.id;

    /*User.findById(id, (err, user) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the saved events view
            res.render('index',
            {
                title: 'Saved Events',
                page: 'savedevents',
                username: req.user ? req.user.username : '',
                user: user // send the user object to the page
            }); 
        }
    });*/

    Event.find({}, function(err, events)
    {
        res.render('index',
        {
            title: 'Saved Events',
            page: 'savedevents',
            username: req.user ? req.user.username : '',
            events: events
        })
    })

  };

  /* Process Saved Events Page */
  module.exports.processSavedEventsPage = (req, res, next) => {
    // redirect users to the login page if they are not logged in
    if (req.user == null)
    {
        return res.redirect('/login');
    }

    let eventCity = req.body.eventCitySelection;
    let eventPrice = req.body.eventPriceSelection;
    
    Event.find({}, function(err, events)
    {
        let matchingEvents = new Array();
        let price; // to check if event is paid or not

        // if the selections are empty then show all events
        if (eventCity === "" && eventPrice === "")
        {
            matchingEvents = events;
        }
        // if selections are not empty then find events with matching parameters
        else
        {
            events.forEach(event => {
                if (event.price === 0) {
                    price = 'Free'
                }
                else { 
                    price = 'Paid'
                }

                if ((eventCity === "" || event.city === eventCity) && (eventPrice === "" || price === eventPrice)) {
                    matchingEvents.push(event);
                }
            })
        }
 
        res.render('index',
        {
            title: 'Saved Events',
            page: 'savedevents',
            username: req.user ? req.user.username : '',
            events: matchingEvents
        })
    })

  };
  
  /* Display Event Details Page */
  /*Display the details of the event by click detail button in the saved-event page  */
      
  module.exports.displayFindEventDetailPage=(req,res,next)=>{
    if (req.user == null)
    {
        return res.redirect('/login');
    }
    let id = req.params.id;
   Event.findById(id,(err, event)=>{
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else{
       res.render('index',{title:'Find Event detail',page:'eventdetails',username:res.user? res.User.username:'', events:event});

       }

   })
    
};





  /* below data is from eventdetails.js file
  /* Display Find aEvent detail Page */
  /*
module.exports.displayFindEventDetailPage = (req, res, next) => {
    User.find(function(err, event){
        if(err)
        {
            return console.error(err);
        }
    //Render Find Events page 
    res.render('index', { title: 'Find Event detail', page: 'eventdetails', event: User });
    });
};





//Display Find Event Detail Page //

module.exports.processFindEventDetailPage = (req, res, next) => {
    let id=req.params.id;
    User.default.findById(id,{},{},function(err, event){
        if(err)
        {
            return console.error(err);
        }
    res.render('index', { title: 'Find Event Detail', page: 'eventdetails', event: User });
    });
};
*/
