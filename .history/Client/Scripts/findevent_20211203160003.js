//IFE -- Immediately Invoked Function Expression
'use strict';

let counter = -1;

function showNextEvent() {
    counter++;
    var eventName = document.getElementById("evName");
    var eventDescription = document.getElementById("evDet");
    eventName.value = events[counter].eventName;
    eventDescription.value = events[counter].eventDescription;

}