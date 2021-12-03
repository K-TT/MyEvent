//IFE -- Immediately Invoked Function Expression
'use strict';

let counter = -1;
const eventName = document.getElementById("evName");
const eventDescription = document.getElementById("evDet");
const yesBtn = document.getElementById("saveBtn").addEventListener("click", showNextEvent);
const noBtn = document.getElementById("notInterestedBtn").addEventListener("click", showNextEvent);

function showNextEvent() {
    counter++;

    eventName.value = events[counter].eventName;
    eventDescription.value = events[counter].eventDescription;

}