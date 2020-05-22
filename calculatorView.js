// APP ARITHMETIC CONTROLLER
const calcModel = (function(){
    return{
        evaluate: function( firstValue) {
            let answer = eval(firstValue) ;
            return (answer);
        },
        squareRoot: function(values){
            return Math.sqrt(values) ;
        },
        raiseToPower: function(value, power){
            return Math.pow(value, power) ;
        }

    }
})() ;

// UI CONTROLLER FOR APP
const uiController = ( function() {
const calcView = {
    calcScreen : '.calculator-screen' ,
    brackets : '.key-brackets' , 
    backwardShift : '.key-shift-backward', 
    forwardShift : '.key-shift-forward' , 
    cancel : '.key-cancel' , 
    delete : '.key-delete' ,
    add : '.key-plus' ,
    subtract : '.key-minus' ,
    square : '.key-square' ,
    multiply : '.key-multiply' ,
    equals : '.key-equals' ,
    negative : '.key-negative-integer' ,
    squaroot : '.key-squaroot' ,
    divide : '.key-division' ,
    zero: '.key-zero',
    numberOne : '.key-one' ,
    numberTwo : '.key-two' ,
    numberThree : '.key-three' ,
    numberFour : '.key-four' ,
    numberFive : '.key-five',
    numberSix : '.key-six',
    numberSeven : '.key-seven' ,
    numberEight : '.key-eight',
    numberNine : '.key-nine' ,
    point : '.key-point'
};

let writeValue = function(newValue){
    let screen = document.querySelector(calcView.calcScreen);
    screen.value = newValue;
};

return {
    getInputElement: function(){
        return Object.values(calcView) ;
    },

    getExistingValue: function () {
        let screen = document.querySelector(calcView.calcScreen);
        return screen.value;
    } ,

    setNumber: function(number){
        let newNumber = this.getExistingValue() + number ;
        writeValue(newNumber) ;
    },

    setOperation: function(operation){
        let newNumber = this.getExistingValue() + operation;
        writeValue(newNumber);
    },
    setAnswer: function(answer){
        let newNumber = this.getExistingValue() + answer ;
        writeValue(newNumber);
    }
}
}
)() ;

// GLOBAL APP CONTROLLER
const controller = (function (calcUI, calcOperation) { 
    let numberBuffer = "" ;
    let answer = 0 ;
    let dataEntered = [] ;
    let specialData = [];
    let memorySpecialOperation = "" ;
    const specialOperationFlag = {
        state: false 
    };
    
    let processOperationType = {
        number: btnClicked => {
                    writeNumber(btnClicked);
                    setNumberBuffer(btnClicked);      
                    },

        operation: btnClicked =>{
                        let operation = 'ordinaryOperation';
                        writeOperation(btnClicked);
                        clickedOperation[operation](btnClicked);
                     },
        specialOperation: btnClicked =>{
                             specialOperationFlag.state = !(specialOperationFlag.state);
                             if (specialOperationFlag.state) {
                            clickedOperation[btnClicked]();
                            memorySpecialOperation = btnClicked;
                             }
                           else {
                            clickedOperation[memorySpecialOperation]();
                            }
                            },
        answer: btnClicked=> {
                  let processAnsFrom = getDataEntered;
                  writeNumber(btnClicked); 
                  dataEntered.push(getNumberBuffer());
                  initNumberBuffer();
                  processAnswer(processAnsFrom);
                  writeAnswer(getAnswer());
                  initDataEntered();
                  dataEntered.push(getAnswer());
                  initAnswer();
                 }
    }

    let clickedOperation = {
            ordinaryOperation : function(btnClicked){
                                    if(specialOperationFlag.state){
                                    specialData.push(getNumberBuffer())
                                    specialData.push(btnClicked);
                                    initNumberBuffer();
                                    }
                                    else{
                                    dataEntered.push(getNumberBuffer());
                                    dataEntered.push(btnClicked);
                                    initNumberBuffer();
                                    }     
        },
    
        '√' : function () {
            let process = squareRootOperation ;
            if(specialOperationFlag.state){
                writeOperation('√(');
            }
            else{
                writeOperation(')');
                commonspecialOperation(process);
            }       
        },

        'X²': function () {
            let process = square ;
            writeOperation('^(2)');
            commonspecialOperation(process) ;
            specialOperationFlag.state = !(specialOperationFlag.state);
        }

    }

    let commonspecialOperation = function (process){
                                    let getNumberFrom = getSpecialData;
                                    specialData.push(getNumberBuffer());
                                    initNumberBuffer();
                                    processAnswer(getNumberFrom);
                                    initSpecialDataEntered();
                                    dataEntered.push(process(getAnswer()));
                                    initAnswer();
    }

    let setEventListener = function(){
        let domInputElements = calcUI.getInputElement() ;
        for (const element of domInputElements){
            document.querySelector(element).addEventListener('click', function(e){
                let eventElement = e.target ;
                let btnClicked = eventElement.textContent ;
                let btnType = eventElement.classList[1] ;
                processOperationType[btnType](btnClicked) ;
             });
        }
    };
    
    function square(values){
        return calcOperation.raiseToPower(values, 2);       
    } 
    function squareRootOperation(values){
        return calcOperation.squareRoot(values) ;
    }
    let setNumberBuffer = function(number){
        numberBuffer = numberBuffer + number ;
    }
    
    let getSpecialData = function(){
        return specialData ;
    }
    let initSpecialDataEntered = function () {
        specialData = [];
    }
    let getNumberBuffer = function(){
        return numberBuffer ;
    }

    let initNumberBuffer = function(){
        numberBuffer = "" ;
    }
    
    let getDataEntered = function(){
        return dataEntered ;
    }
    let processAnswer = function(processAnsFrom) {
        let dataInString = processAnsFrom().toString() ;
        let dataInPureString = dataInString.replace(/,/g,'') ;
        answer = calcOperation.evaluate(dataInPureString) ;
    } ;

    let getAnswer = function(){
        return answer ;
    };
    let initDataEntered = function(){
        dataEntered = [] ;
    }

    let initAnswer = function(){
        answer = 0 ;
    }

    let writeAnswer = function(){
        calcUI.setAnswer(answer) ; 
    };
 
    let writeNumber = function(number){
        calcUI.setNumber(number) ;
    };

    let writeOperation = function (operation) {
        calcUI.setOperation(operation);
    };

    return {
        init: function () {
             setEventListener() ;
    } 
}
})(uiController, calcModel) ;

controller.init() ;