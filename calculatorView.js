// APP ARITHMETIC CONTROLLER
const calcModel = (function(){
    return{
        evaluate: value => eval(value),
        squareRoot: values => Math.sqrt(values),
        raiseToPower: (value, power) => Math.pow(value, power)
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

    let writeValue = newValue => { document.querySelector(calcView.calcScreen).value = newValue; };

    return {
        getInputElement: () =>  Object.values(calcView),
        getExistingValue: () => document.querySelector(calcView.calcScreen).value,
        setNumber: function(number){
            writeValue(this.getExistingValue() + number ) ;
        },
        setOperation: function(operation){
            writeValue(this.getExistingValue() + operation);
        },
        setAnswer: function(answer){
            writeValue(this.getExistingValue() + answer);
        }
        }
})() ;

// GLOBAL APP CONTROLLER
const controller = (function (calcUI, calcOperation) { 
    const calcState = {
         numberBuffer: "" ,
         answer:  0 ,
         dataEntered: [] ,
         specialData: [] ,
         specialOperation: {
                            type: '',
                            state: false
         }
    
    };
    
    let processOperationType = {
        number: btnClicked => {
                    writeNumber(btnClicked);
                    setNumberBuffer(btnClicked);      
                    },

        operation: btnClicked =>{
                        writeOperation(btnClicked);
                        clickedOperation.ordinaryOperation(btnClicked);
                     },
        specialOperation: btnClicked =>{
                             calcState.specialOperation.state = !( calcState.specialOperation.state);
                             //book a special operation in memory or Close the special operation in current memory
                             ( calcState.specialOperation.state) ? clickedOperation[btnClicked]() : clickedOperation[calcState.specialOperation.type]();
                        },
        answer: btnClicked=> {
                  writeNumber(btnClicked); 
                  calcState.dataEntered.push(getNumberBuffer());
                  initNumberBuffer();
                  processAnswer(getDataEntered);
                  writeAnswer(getAnswer());
                  initDataEntered();
                  calcState.dataEntered.push(getAnswer());
                  initAnswer();
                 }
    }

    let clickedOperation = {
            ordinaryOperation : btnClicked => {
                                    if( calcState.specialOperation.state){
                                        calcState.specialData.push(getNumberBuffer())
                                        calcState.specialData.push(btnClicked);
                                        initNumberBuffer();
                                    }
                                    else{
                                        calcState.dataEntered.push(getNumberBuffer());
                                        calcState.dataEntered.push(btnClicked);
                                        initNumberBuffer();
                                    }     
        },
    
        '√' : () => {
            if( calcState.specialOperation.state){
                writeOperation('√(');
                calcState.specialOperation.type = '√';
            }
            else{
                writeOperation(')');
                commonspecialOperationType(squareRootOperation);
            }       
        },

        'X²':  () => {
            //calcState.specialOperation.type = 'X²';
            writeOperation('^(2)');
            commonspecialOperationType(square) ;
            calcState.specialOperation.state = !(calcState.specialOperation.state);
        }

    }

    let commonspecialOperationType = function (process){
                                    //let getNumberFrom = getSpecialData;
                                    calcState.specialData.push(getNumberBuffer()); //pushes the last number entered for onward processing as a specialData
                                    initNumberBuffer();
                                    processAnswer(getSpecialData); //process the mathematical operation stored in the special data memory before pushing it to ordinaryDataMemory
                                    initSpecialDataEntered();
                                    calcState.dataEntered.push(process(getAnswer()));
                                    initAnswer();
    }

    const square = values => calcOperation.raiseToPower(values, 2);       
    const squareRootOperation = values => calcOperation.squareRoot(values) ;
    const setNumberBuffer = number => { calcState.numberBuffer = calcState.numberBuffer + number ;}
    const getSpecialData = () => calcState.specialData ;
    const initSpecialDataEntered = () => { calcState.specialData = []; }
    const getNumberBuffer = () => calcState.numberBuffer ;
    const initNumberBuffer = () => { calcState.numberBuffer = "" ; }
    const getDataEntered = () => calcState.dataEntered ;
    const processAnswer = processAnsFrom => {
            let dataInString = processAnsFrom().toString() ;
            let dataInPureString = dataInString.replace(/,/g,'') ;
            calcState.answer = calcOperation.evaluate(dataInPureString) ;
    } ;
    const getAnswer = () => calcState.answer ;
    const initDataEntered = () => { calcState.dataEntered = [] ; }
    const initAnswer = () => { calcState.answer = 0 ; }
    const writeAnswer = () => { calcUI.setAnswer(calcState.answer) ; };
    const writeNumber = number => { calcUI.setNumber(number) ; };
    const writeOperation = operation => { calcUI.setOperation(operation); };
    const setEventListener = () => {
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
    
    return {
        init: () => { setEventListener() ; } 
}
})(uiController, calcModel) ;

controller.init() ;