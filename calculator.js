/////////////////////
// Element Selectors
////////////////////
const mainDisplay = document.querySelector('.calculator__display--2');
const secondaryDisplay = document.querySelector('.calculator__display--1');
const numpad = document.querySelectorAll('.numpad');
const divide = document.querySelector('.calculator__divide');
const multiply = document.querySelector('.calculator__multiply');
const minus = document.querySelector('.calculator__minus');
const plus = document.querySelector('.calculator__plus');
const equals = document.querySelector('.calculator__equals');
const allClear = document.querySelector('.calculator__allclear');
const clear = document.querySelector('.calculator__clear');
const back = document.querySelector('.calculator__back');

let previousOperation = '';
let inputBacklog = '';
let input = '';
let displayInput = '0';
let sign = '';

//////////////////
// Main functions
/////////////////
function inputNumber(num) {
  if (input == '' && num.textContent === '0') return;
  // 8 digit limit
  if (Number(input) > 10000000 || Number(input) < -10000000) return;
  input += num.textContent;
  displayInput = Number(input).toLocaleString();
  mainDisplay.textContent = displayInput;
}

function clearAll() {
  // Clear operations
  input = '';
  displayInput = '0';
  inputBacklog = '';
  previousOperation = '';
  // Clear displays
  mainDisplay.textContent = displayInput;
  secondaryDisplay.textContent = '';
}

function clearInput() {
  input = '';
  displayInput = '0';
  mainDisplay.textContent = displayInput;
}

function removeLastNum() {
  if (input === '') return;
  let newInput = input.slice(0, input.length-1);
  input = newInput;
  displayInput = Number(input).toLocaleString();
  mainDisplay.textContent = displayInput;
}

function operation(symbol) {
  if (secondaryDisplay.textContent !== '' || input === '') return;
  
  sign = symbol;
  switch(symbol) {
    case '-':
      secondaryDisplay.textContent = `${input} -`;
    break;
    case '+':
      secondaryDisplay.textContent = `${input} +`;
    break;
    case '/':
      secondaryDisplay.textContent = `${input} /`;
    break;
    case 'x':
      secondaryDisplay.textContent = `${input} *`;
    break;
    default:
      return;
  }
  inputBacklog = input;
  input = '';
  displayInput = '0';
  mainDisplay.textContent = displayInput;
}

function handleOperation() {
  if (input === '') return;
  
  let result;
  switch(sign) {
    case '-':
      result = Number(inputBacklog) - Number(input);
    break;
    case '+':
      result = Number(inputBacklog) + Number(input);
    break;
    case '/':
      result = Number(inputBacklog) / Number(input);
    break;
    case 'x':
      result = Number(inputBacklog) * Number(input);
    break;
    default:
      return;
  }

  // 8 digit limit
  if (result > 10000000 || result < -10000000) {
    clearAll();
    mainDisplay.textContent = 'ERR';
    return;
  }

  input = result.toString();
  inputBacklog = '';
  displayInput = result.toLocaleString();
  mainDisplay.textContent = displayInput;
  secondaryDisplay.textContent = '';
}

function copyToClipboard (containerid) {
  // Create temporary textarea to copy text
  let textarea = document.createElement('textarea')
  textarea.id = 'temp_element'
  textarea.style.height = 0
  document.body.appendChild(textarea)
  textarea.value = document.querySelector(".calculator__display--2").innerText

  let selector = document.querySelector('#temp_element')
  // Copy text
  selector.select()
  document.execCommand('copy')

  // Remove temp element
  document.body.removeChild(textarea)
  // Alert user
  alert('Copied to clipboard');
}


///////////////////
// Event Listeners
//////////////////
// Add event listeners to all numpad numbers
for (let i = 0; i < numpad.length; i++) {
  numpad[i].addEventListener('click', () => inputNumber(numpad[i]));
}

// Calculator functions
allClear.addEventListener('click', () => clearAll());
clear.addEventListener('click', () => clearInput());
back.addEventListener('click', () => removeLastNum());

// Mathematical Operations
minus.addEventListener('click', () => operation('-'));
plus.addEventListener('click', () => operation('+'));
divide.addEventListener('click', () => operation('/'));
multiply.addEventListener('click', () => operation('x'));
equals.addEventListener('click', () => handleOperation());

// Copy product to clipboard
mainDisplay.addEventListener('click', () => copyToClipboard(mainDisplay.textContent));