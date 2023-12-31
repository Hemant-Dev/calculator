//Global Var
//Three Elements that keep track of all operands, operator etc.
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;



const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('#equalsBtn');
const clearBtn = document.querySelector('#clearBtn');
const pointBtn = document.querySelector('#pointBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const lastOperationScreen = document.querySelector('.lastOperationScreen');
const currentOperationScreen = document.querySelector('.currentOperationScreen');

window.addEventListener('keydown', handleKeyboardInput);
equalsBtn.addEventListener('click',  evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
// pointBtn.addEventListener('click', checkPoint);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
});

function appendNumber(number){
    if(currentOperationScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number;
}
function deleteNumber(){;
    // console.log(currentOperationScreen.textContent.slice(0, -1));
    currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
}
function setOperation(operator){
    if(currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}
function clear(){
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function evaluate(){
    if(currentOperation === null || shouldResetScreen) return;
    if(currentOperation === '/' && currentOperationScreen.textContent === '0'){
        alert(`You can't divide by 0!!`);
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
    currentOperation = null;
}
function roundResult(result){
    return Math.round(result * 1000) / 1000;
}
function handleKeyboardInput(e){
    // console.log(e.key);
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === '.') appendNumber(e.key);
    if(e.key === '=' || e.key === 'Enter') evaluate();
    if(e.key === 'Backspace') deleteNumber();
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(e.key);
}

//Operations 
function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1*num2;
}
function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    a = Number(num1);
    b = Number(num2);
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            if(b === 0) return null;
            else return divide(a,b);
        default:
            return null;
    }
}





