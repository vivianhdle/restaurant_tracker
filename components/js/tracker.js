class RestaurantTracker{
    constructor(options){
        this.buttons={
            addButton:options.buttons.addButton,
            cancelButton:options.buttons.cancelButton,
            dataButton:options.buttons.dataButton
        }
        this.inputFields={
            restaurantName:options.inputFields.restaurantName,
            cuisine:options.inputFields.cuisine,
            inOrOut:options.inputFields.inOrOut,
            expense:options.inputFields.expense,
            partyOf:options.inputFields.partyOf,
        }
        //=====BINDING=============================================
        this.addRestaurant = this.addRestaurant.bind(this);
    }
    addEventListeners(){
        this.buttons.addButton.addEventListener('click',this.addRestaurant)
    }
    addRestaurant(){
        console.log('hello');
    }
}