document.addEventListener("DOMContentLoaded",startApp);

let restaurantTracker;

function startApp(){
    restaurantTracker = new RestaurantTracker({
        buttons:{
            addButton:document.getElementById('add-button'),
            cancelButton:document.getElementById('cancel-button'),
            dataButton:document.getElementById('data-button')
        },
        inputFields:{
            restaurantName:document.getElementById('restaurant-name'),
            cuisine:document.getElementById('cuisine'),
            inOrOut:document.getElementById('in-or-out'),
            expense:document.getElementById('expense'),
            partyOf:document.getElementById('party-of'),
            updateName:document.getElementById('update-name'),
            updateCuisine:document.getElementById('update-cuisine'),
            updateInOrOut:document.getElementById('update-in-or-out'),
            updateExpense:document.getElementById('update-expense'),
            updatePartyOf:document.getElementById('update-party-of'),

        },
        displayAreas:{
            restaurants:document.getElementById('display-area')
        }
    })
    restaurantTracker.addEventListeners();
}