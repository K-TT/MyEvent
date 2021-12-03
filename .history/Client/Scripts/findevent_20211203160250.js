//IFE -- Immediately Invoked Function Expression
'use strict';

let counter = -1;
const eventName = document.getElementById("evName");
const eventDescription = document.getElementById("evDet");
const YesBtn = document.getElementById("saveBtn");
const NoBtn = document.getElementById("notInterestedBtn");

function showNextEvent() {
    counter++;

    eventName.value = events[counter].eventName;
    eventDescription.value = events[counter].eventDescription;

}