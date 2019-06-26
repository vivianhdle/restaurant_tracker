class DestinationTracker{
    constructor(options){
        this.buttons = {
            addButton:options.buttons.addButton,
            cancelButton:options.buttons.cancelButton,
            saveButton:options.buttons.saveButton
        }
        this.inputFields = {
            destinationName:options.inputFields.destinationName,
            country:options.inputFields.country,
            knownFor:options.inputFields.knownFor,
            mustEat:options.inputFields.mustEat,
            mustDo:options.inputFields.mustDo,
            updateName:options.inputFields.updateName,
            updateCountry:options.inputFields.updateCountry,
            updateKnownFor:options.inputFields.updateKnownFor,
            updateMustEat:options.inputFields.updateMustEat,
            updateMustDo:options.inputFields.updateMustDo
        }
        this.displayAreas = {
            destinations:options.displayAreas.destinations,
            total:options.displayAreas.total
        }
        this.destinations=[];
        this.updatingID = null;
        //=====BINDING=============================================
        this.getData = this.getData.bind(this);
        this.deleteDestination = this.deleteDestination.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.updateDestination = this.updateDestination.bind(this);
        this.updating = this.updating.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }
    addEventListeners(){
        this.buttons.addButton.addEventListener("click",this.addDestination);
        this.buttons.saveButton.addEventListener("click",this.updateDestination);
        this.buttons.cancelButton.addEventListener("click",this.clearInputs);
    }
    getData(){
        this.clearDisplayArea();
        fetch('api/destinations')
        .then(resp=>resp.json())
        .then(data => {
            if (data.success){
                data.data.forEach((item)=>{
                    const destination = new Destination({
                        info:{
                            name:item.destination,
                            country:item.country,
                            knownFor:item.knownFor,
                            mustEat:item.mustEat,
                            mustDo:item.mustDo,
                            id:item.id
                        },
                        callbacks:{
                            delete:this.deleteDestination,
                            updating:this.updating
                        },
                        updateFields:{
                            updateName:this.inputFields.updateName,
                            updateCountry:this.inputFields.updateCountry,
                            updateKnownFor:this.inputFields.updateKnownFor,
                            updateMustEat:this.inputFields.updateMustEat,
                            updateMustDo:this.inputFields.updateMustDo
                        },
                        buttons:{
                            saveButton:this.buttons.saveButton
                        }
                    })
                    this.destinations.push(destination);
                    const domElement = destination.render();
                    this.displayAreas.destinations.appendChild(domElement);
                })
            }
        })
        .then(()=>{
            this.setTotalValue();
        })
    }
    clearInputs(){
        this.inputFields.destinationName.value = ''
        this.inputFields.country.value = ''
        this.inputFields.knownFor.value = ''
        this.inputFields.mustEat.value = ''
        this.inputFields.mustDo.value = ''
    }
    deleteDestination(id){
        fetch(`api/destinations/${id}`, {method: 'DELETE'})
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
    addDestination(){
        const params = {
            name: this.inputFields.destinationName.value,
            country:this.inputFields.country.value,
            knownFor:this.inputFields.knownFor.value,
            mustEat:this.inputFields.mustEat.value,
            mustDo:this.inputFields.mustDo.value,
        }
        const {name,country,knownFor,mustEat,mustDo} = params;
        if (!name || !country || !knownFor || !mustEat || !mustDo){
            console.log('didnt add')
            return false;
        }
        fetch('api/destinations',{
            method:'POST',
            body:JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data=>{
            if (data.success){
                this.getData();
                this.clearInputs();
                return true;
            } else {
                return false;
            }
        })
    }
    updateDestination(){
        const params = {
            id:this.updatingID,
            name: this.inputFields.updateName.value,
            country:this.inputFields.updateCountry.value,
            knownFor:this.inputFields.updateKnownFor.value,
            mustEat:this.inputFields.updateMustEat.value,
            mustDo:this.inputFields.updateMustDo.value,
        }
        const {name,country,knownFor,mustEat,mustDo} = params;
        if (!name || !country || !knownFor || !mustEat || !mustDo){
            console.log('didnt add')
            return false;
        }
        fetch('api/update-destination',{
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
    updating(id){
        this.updatingID = id;
    }
    setTotalValue(){
        this.displayAreas.total.innerText = this.destinations.length;
    }
    clearDisplayArea(){
        while (this.displayAreas.destinations.firstChild){
            this.displayAreas.destinations.removeChild(this.displayAreas.destinations.firstChild);
        }
        this.destinations=[];
    }
}