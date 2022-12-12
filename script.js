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

    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        if (number === '0' && this.currentInput === '0') return;
        this.currentInput = this.currentInput.toString() + number.toString();
    }

    validate(operation) {
        if (this.currentInput === '' && this.previousInput === '') return;
        if (this.currentInput === '' && this.previousInput !== '') {
            this.operation = operation;
            return;
        }
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
        let second = parseFloat(this.currentInput);
        if (isNaN(first)) return;
        if (isNaN(second)) second = first;
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

    updateDisplay() {
        this.currentInputText.innerText = this.currentInput;
        if (this.operation != null) {
            this.previousInputText.innerText = 
                `${this.previousInput} ${this.operation}`;
        } else this.previousInputText.innerText = '';
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
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});