//IFE -- Immediately Invoked Function Expression
'use strict';

let counter = -1;
const eventName = document.getElementById("evName");
const eventDescription = document.getElementById("evDet");
const yesBtn = document.getElementById("saveBtn");
const noBtn = document.getElementById("notInterestedBtn");

function showNextEvent() {
    if (counter < events.length) {
        counter++;
    } else {
        counter = 0;
    }
    eventName.value = events[counter].eventName;
    eventDescription.value = events[counter].eventDescription;
}
window.onload() {
    yesBtn.addEventListener("onClick", showNextEvent, true);
    noBtn.addEventListener("onClick", showNextEvent, true);

    showNextEvent();
}