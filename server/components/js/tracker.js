class RestaurantTracker{
    constructor(options){
        this.buttons = {
            addButton:options.buttons.addButton,
            cancelButton:options.buttons.cancelButton,
            dataButton:options.buttons.dataButton
        }
        this.inputFields = {
            restaurantName:options.inputFields.restaurantName,
            cuisine:options.inputFields.cuisine,
            inOrOut:options.inputFields.inOrOut,
            expense:options.inputFields.expense,
            partyOf:options.inputFields.partyOf,
        }
        this.displayAreas = {
            restaurants:options.displayAreas.restaurants
        }
        this.data={}
        //=====BINDING=============================================
        this.getData = this.getData.bind(this);
        this.gotData = this.gotData.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }
    addEventListeners(){
        this.buttons.dataButton.addEventListener("click",this.getData);
    }
    getData(){
        var ajaxOptions={
            dataType:'json',
            url:'static/restaurantlist.json',
            method:'get',
            success:this.gotData
        }
        $.ajax(ajaxOptions);
    }
    gotData(response){
        if (response.success){
            this.data = response.data;
            response.data.forEach((item)=>{
                const restaurant = new Restaurant({
                    info:{
                        name:item.restaurant,
                        cuisine:item.cuisine,
                        inOrOut:item.inOrOut,
                        expense:item.expense,
                        partyOf:item.partyOf,
                        id:item.id
                    },
                    callbacks:{
                        delete:this.deleteRestaurant
                    }
                })
                const domElement = restaurant.render();
                this.displayAreas.restaurants.appendChild(domElement);
            })
        }
    }
    deleteRestaurant(id){
        console.log(this.data);
        //DELETE API CALL HERE
    }
}