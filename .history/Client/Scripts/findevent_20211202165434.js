//IFE -- Immediately Invoked Function Expression
'use strict';

function getInputValue() {
    // Selecting the input element and get its value
    var event = document.getElementById("userName").value;

    if (inputVal == "" || passwordVal == "") { alert("Please enter your ID and password!"); } else {
        if (login_dict.hasOwnProperty(inputVal)) {
            if (passwordVal == login_dict[inputVal]) { alert("Done!"); } else { alert("Wrong password!"); }
        } else { alert("ID doesn't exist!"); }
    }
}