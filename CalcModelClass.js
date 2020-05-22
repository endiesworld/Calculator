class Calculator{
    constructor(){
        this.firstValue = 0 ;
        this.secondValue = 0 ;
        this.answer = 0 ;
    } ;

    setFirstValue(firstValue) {
        this.firstValue = Number(firstValue) ;
    };

    setSecondValue(secondValue){
        this.secondValue = Number(secondValue);
    };

    add(){
        this.answer = this.firstValue + this.secondValue;
    };

    subtract() {
        this.answer = this.firstValue - this.secondValue;
    };

    multiplication() {
        this.answer = this.firstValue * this.secondValue;
    };
    division() {
        this.answer = this.firstValue / this.secondValue;
    };
    getAnswer() {
        return this.answer;
    };

}