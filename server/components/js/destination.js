class Destination{
    constructor(options){
        this.domElement = null;
        this.info = {
            id:options.info.id,
            name:options.info.name,
            country:options.info.country,
            knownFor:options.info.knownFor,
            mustEat:options.info.mustEat,
            mustDo:options.info.mustDo
        }
        this.callbacks = {
            delete:options.callbacks.delete,
            updating:options.callbacks.updating
        }
        this.updateFields = {
            updateName:options.updateFields.updateName,
            updateCountry:options.updateFields.updateCountry,
            updateKnownFor:options.updateFields.updateKnownFor,
            updateMustEat:options.updateFields.updateMustEat,
            updateMustDo:options.updateFields.updateMustDo
        }
        this.buttons = {
            saveButton:options.buttons.saveButton
        }
        //=====BINDING=============================================
        this.deleteSelf = this.deleteSelf.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
    }
    render(){
        this.domElement = document.createElement("TR");
        const name = document.createElement("TD");
        name.innerText = this.info.name;
        name.setAttribute('class','col-xs-2 col-md-2');
        const country = document.createElement("TD");
        country.innerText = this.info.country;
        country.setAttribute('class','col-xs-2 col-md-2');
        const knownFor = document.createElement("TD");
        knownFor.innerText = this.info.knownFor;
        knownFor.setAttribute('class','col-xs-2 col-md-2');
        const mustEat = document.createElement("TD");
        mustEat.innerText = this.info.mustEat;
        mustEat.setAttribute('class','col-xs-2 col-md-2');
        const mustDo = document.createElement("TD");
        mustDo.innerText = this.info.mustDo;
        mustDo.setAttribute('class','col-xs-2 col-md-2');
        this.domElement.appendChild(name);
        this.domElement.appendChild(country);
        this.domElement.appendChild(knownFor);
        this.domElement.appendChild(mustEat);
        this.domElement.appendChild(mustDo);
        this.domElement.appendChild(this.createDeleteButton());
        return this.domElement;
    }
    createDeleteButton(){
        const container = document.createElement("TD");
        const button = document.createElement("BUTTON");
        container.setAttribute('class','col-xs-2 col-md-2');
        const deleteIcon =document.createElement("I");
        deleteIcon.setAttribute('class','fas fa-trash');
        button.appendChild(deleteIcon);
        container.appendChild(button);
        container.appendChild(this.createUpdateButton());
        button.addEventListener("click",this.deleteSelf);
        return container;
    }
    createUpdateButton(){
        const button = document.createElement("BUTTON");
        const updateIcon =document.createElement("I");
        updateIcon.setAttribute('class','fas fa-edit');
        const toggleAttr = document.createAttribute("data-toggle");
        toggleAttr.value = "modal"
        button.setAttributeNode(toggleAttr);
        const dataAttr = document.createAttribute('data-target');
        dataAttr.value = "#myModal"
        button.setAttributeNode(dataAttr);
        button.appendChild(updateIcon);
        button.addEventListener("click",this.setDefaultValues);
        return button;
    }
    setDefaultValues(){
        this.updateFields.updateName.value = this.info.name;
        this.updateFields.updateCountry.value = this.info.country;
        this.updateFields.updateKnownFor.value = this.info.knownFor;
        this.updateFields.updateMustEat.value = this.info.mustEat;
        this.updateFields.updateMustDo.value = this.info.mustDo;
        this.callbacks.updating(this.info.id);
    }
    deleteSelf(){
        if (this.callbacks.delete(this.info.id)){
            this.domElement.remove();
        }
    }
}