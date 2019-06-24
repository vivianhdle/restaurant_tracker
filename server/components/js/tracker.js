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
        this.restaurants=[];
        //=====BINDING=============================================
        this.getData = this.getData.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }
    addEventListeners(){
        this.buttons.dataButton.addEventListener("click",this.getData);
    }
    getData(){
        this.clearDisplayArea();
        fetch('api/restaurants')
        .then(resp=>resp.json())
        .then(data => {
            if (data.success){
                data.data.forEach((item)=>{
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
                    this.restaurants.push(restaurant);
                    const domElement = restaurant.render();
                    this.displayAreas.restaurants.appendChild(domElement);
                })
            }
        })
    }
    deleteRestaurant(id){
        debugger;
        fetch(`api/restaurants/${id}`, {method: 'DELETE'})
        .then(resp=>resp.json())
        .then(data => {
            if (data.success){
                this.getData();
                return true;
            }else {
                console.log('did not delete');
                return false;
            }
        })
    }
    clearDisplayArea(){
        while (this.displayAreas.restaurants.firstChild){
            this.displayAreas.restaurants.removeChild(this.displayAreas.restaurants.firstChild);
        }
        this.restaurants=[];
    }
}