class Restaurant{
    constructor(options){
        this.domElement = null;
        this.info = {
            id:options.info.id,
            name:options.info.name,
            cuisine:options.info.cuisine,
            inOrOut:options.info.inOrOut,
            expense:options.info.expense,
            partyOf:options.info.partyOf
        }
        this.callbacks = {
            delete:options.callbacks.delete,
            update:options.callbacks.update
        }
        this.updateFields = {
            updateName:options.updateFields.updateName,
            updateCuisine:options.updateFields.updateCuisine,
            updateInOrOut:options.updateFields.updateInOrOut,
            updateExpense:options.updateFields.updateExpense,
            updatePartyOf:options.updateFields.updatePartyOf
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
        const cuisine = document.createElement("TD");
        cuisine.innerText = this.info.cuisine;
        cuisine.setAttribute('class','col-xs-2 col-md-2');
        const inOrOut = document.createElement("TD");
        inOrOut.innerText = this.info.inOrOut;
        inOrOut.setAttribute('class','col-xs-2 col-md-2');
        const expense = document.createElement("TD");
        expense.innerText = this.info.expense;
        expense.setAttribute('class','col-xs-2 col-md-2');
        const partyOf = document.createElement("TD");
        partyOf.innerText = this.info.partyOf;
        partyOf.setAttribute('class','col-xs-2 col-md-2');
        this.domElement.appendChild(name);
        this.domElement.appendChild(cuisine);
        this.domElement.appendChild(inOrOut);
        this.domElement.appendChild(expense);
        this.domElement.appendChild(partyOf);
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
        this.updateFields.updateCuisine.value = this.info.cuisine;
        this.updateFields.updateInOrOut.value = this.info.inOrOut;
        this.updateFields.updateExpense.value = this.info.expense;
        this.updateFields.updatePartyOf.value = this.info.partyOf;
    }
    deleteSelf(){
        if (this.callbacks.delete(this.info.id)){
            this.domElement.remove();
        }
    }
}