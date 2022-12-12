class Calculator {
    constructor(previousInputText, currentInputText) {
        this.previousInputText = previousInputText;
        this.currentInputText = currentInputText;
        this.clear();
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = undefined;
    }

    delete() {
        this.currentInput = this.currentInput.toString().slice(0, -1);
    }

    validateSign() {
        if (this.currentInput === '') return;
        else this.reverseSign();
    }

    reverseSign() {
        let value;
        const current = parseFloat(this.currentInput);
        if (isNaN(current)) return;
        else {
            value = current * -1;
            this.currentInput = value;
        }
    }

    clearOnNextInput () {
        this.clear();
        this.clearOnNext = false;
    }

    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        if (this.clearOnNext) {
            this.clearOnNextInput();
        }
        this.currentInput = this.currentInput.toString() + number.toString();
    }

    validate(operation) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.operate();
        };
        this.operation = operation;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }

    operate() {
        let calculation;
        const first = parseFloat(this.previousInput);
        const second = parseFloat(this.currentInput);
        if (isNaN(first) || isNaN(second)) return;
        switch (this.operation) {
            case '+':
                calculation = first + second;
                break;
            case '-':
                calculation = first - second;
                break;
            case '*':
                calculation = first * second;
                break;
            case '/':
                if (second === 0) return alert("😑 Don't try and break me...");
                calculation = first / second;
                break;
            default:
                return;
        }
        this.currentInput = parseFloat(this.roundUp(calculation));
        this.operation = undefined;
        this.previousInput = '';
    }

    roundUp(value) {
        if (value % 1 !== 0) {
            return value.toFixed(6);
        } else {
            return value;
        }
    }

    setClearOnNextInput () {
        this.clearOnNext = true;
    }

    updateDisplay() {
        this.currentInputText.innerText = this.currentInput;
        if (this.operation != null) {
            this.previousInputText.innerText = 
                `${this.previousInput} ${this.operation}`;
        } else this.previousInputText.innerText = '';
        console.log(this.currentInput);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const signButton = document.querySelector('[data-sign]');
const allClearButton = document.querySelector('[data-clear]');
const previousInputText = document.querySelector('[data-previous-input]');
const currentInputText = document.querySelector('[data-current-input]');

const calculator = new Calculator(previousInputText, currentInputText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.validate(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
    calculator.setClearOnNextInput();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

signButton.addEventListener('click', button => {
    calculator.validateSign(button.innerText);
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});