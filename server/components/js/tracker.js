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
        this.addRestaurant = this.addRestaurant.bind(this);
    }
    addEventListeners(){
        this.buttons.dataButton.addEventListener("click",this.getData);
        this.buttons.addButton.addEventListener("click",this.addRestaurant);
    }
    getData(){
        debugger;
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
    addRestaurant(){
        const params = {
            name: this.inputFields.restaurantName.value,
            cuisine:this.inputFields.cuisine.value,
            inOrOut:this.inputFields.inOrOut.value,
            expense:this.inputFields.expense.value,
            partyOf:this.inputFields.partyOf.value,
        }
        const {name,cuisine,inOrOut,expense,partyOf} = params;
        if (!name || !cuisine || !inOrOut || !expense || !partyOf){
            console.log('didnt add')
            return false;
        }
        fetch('api/restaurants',{
            method:'POST',
            body:JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data=>{
            if (data.success){
                this.getData();
                return true;
            } else {
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