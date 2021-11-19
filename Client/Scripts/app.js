//IFE -- Immediately Invoked Function Expression
'use strict';

(function(){
    function Start() {
        console.log('App Started');
    }

    window.addEventListener('load', Start);
})();

var keywordsarray = []
var checkboxes = documents.querySelectorAll('input[name="keywords"]:checked')

for (var i = 0; i < checkboxes.length; i++)
{
    keywordsarray.push(checkboxes[i].value)
}