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
        this.getData = this.getData.bind(this);
        this.gotData = this.gotData.bind(this);
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
        console.log('hello');
    }
    gotData(response){
        debugger;
        if (response.success){
            response.data.forEach((item)=>{
                const restaurant = new Restaurant({
                    info:{
                        name:item.restaurant,
                        cuisine:item.cuisine,
                        inOrOut:item.inOrOut,
                        expense:item.expense,
                        partyOf:item.partyOf,
                    }
                })
                const domElement = restaurant.render();
                document.getElementById('display-area').appendChild(domElement);
            })
        }
    }
}