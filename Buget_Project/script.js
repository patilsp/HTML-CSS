

// Budget controler module
var budgetController = (function() {
    var Expenses = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    };
  
    var Income = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    };

    

    var data = {
        allItems : {
            exp: [],
            inc:[]
        },
        totals: {
            exp: 0,
            inc:0
        }
        
    };
return {
    addItem: function(type, des, val){

        var newItem, ID;

        // [1,2,3,4,5,6], next ID = 7 
        // ID  =  last ID  + 1
        // create new ID 
        if (data.allItems[type].lenght > 0){
            ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1;
        }else{
            ID = 0; 
        }
        

        // create new item based on 'inc' or 'exp'
        if(type === 'exp'){
            newItem = new Expenses(ID, des, val);
        }else if (type === 'inc'){
            newItem = new Income(ID, des, val);
        }

        data.allItems[type].push(newItem);
        return newItem;
    },
    testing: function()
    {
        console.log(data);

    }
};

})();



// UI controller module
var UIController = (function() {
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };

    return {
        getInput: function() {
            return {
            type: document.querySelector(DOMStrings.inputType).value,
            description: document.querySelector (DOMStrings.inputDescription).value,
            value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            // create html string with placeholder text

            //replace 

        },


        getDOMStrings: function(){
            return DOMStrings;
        }
    };
    

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings ();
        document.querySelector(DOM.inputBtn).addEventListener ('click', ctrlAddItem);

        document.addEventListener('keypress', function (event){
    
        if (event.keyCode === 13){
        ctrlAddItem();    
    
        }
    
    });
    document.querySelector (DOM.container).addEventListener('click', ctrDeleteitem);

   };



   var updateBudget = function (){

    //1. calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
   };

    var ctrlAddItem = function () {
        var input, newItem;
    //1. Get the filled input data
     input = UICtrl.getInput();
    
    if (input.description !== "" && !isNaN(input.value)&& input.value > 0){

    //2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                

    //3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);

    //4. calculate the budget
    UICtrl.clearFields();

    //5. Display the budget on the UI

        updateBudget();


        }
    };
    
        var ctrDeleteitem = function(event){
            
 };
 
    

    return {
        init: function(){
            console.log('Application has started .');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp:0,
                percentage: -1
            });
            setupEventListeners();

        }
    };
 
   

})(budgetController, UIController);

controller.init();