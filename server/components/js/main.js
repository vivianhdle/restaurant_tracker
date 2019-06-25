document.addEventListener("DOMContentLoaded",startApp);

let destinationTracker;

function startApp(){
    destinationTracker = new DestinationTracker({
        buttons:{
            addButton:document.getElementById('add-button'),
            cancelButton:document.getElementById('cancel-button'),
            saveButton:document.getElementById('save-button')
        },
        inputFields:{
            destinationName:document.getElementById('destination-name'),
            country:document.getElementById('country'),
            knownFor:document.getElementById('known-for'),
            mustEat:document.getElementById('must-eat'),
            mustDo:document.getElementById('must-do'),
            updateName:document.getElementById('update-name'),
            updateCountry:document.getElementById('update-country'),
            updateKnownFor:document.getElementById('update-known-for'),
            updateMustEat:document.getElementById('update-must-eat'),
            updateMustDo:document.getElementById('update-must-do'),

        },
        displayAreas:{
            destinations:document.getElementById('display-area'),
            total:document.getElementById('total')
        }
    })
    destinationTracker.addEventListeners();
    destinationTracker.getData();
}