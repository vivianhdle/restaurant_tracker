class Restaurant{
    constructor(options){
        this.domElement = null;
        this.info = {
            name:options.info.name,
            cuisine:options.info.cuisine,
            inOrOut:options.info.inOrOut,
            expense:options.info.expense,
            partyOf:options.info.partyOf
        }
        this.callbacks = {

        }
    }
    render(){
        debugger;
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
        return this.domElement;
    }
}