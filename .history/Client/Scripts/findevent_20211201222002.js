//IFE -- Immediately Invoked Function Expression
'use strict';

function getInputValue() {
    // Selecting the input element and get its value
    var inputVal = document.getElementById("userName").value;
    var passwordVal = document.getElementById("password1").value;
    if (inputVal == "" || passwordVal == "") { alert("Please enter your ID and password!"); } else {
        if (login_dict.hasOwnProperty(inputVal)) {
            if (passwordVal == login_dict[inputVal]) { alert("Done!"); } else { alert("Wrong password!"); }
        } else { alert("ID doesn't exist!"); }
    }
}