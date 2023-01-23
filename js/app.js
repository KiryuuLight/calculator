import * as functions from './functions.js';

/* Button container */

const btnContainer = document.getElementById('buttons');

document.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (functions.regNumber.test(e.key)) {
    functions.removeZero(functions.resultContent);
    functions.makeOperations(e, 'keyboard');
  }

  if (functions.regOperators.test(e.key)) {
    functions.displayHead(functions.operationContent, e, 'keyboard');
  }

  if (functions.regSpecial.test(e.key)) {
    switch (e.key) {
      case 'Enter':
        functions.pressEqual();
        break;
      case 'Delete':
        functions.clearAllValues();
        break;
      case 'C':
        functions.plusOrMinus();
        break;
      case '.':
        functions.addComma();
        break;
      case '%':
        functions.percentageValue();
        break;
      case 'Backspace':
        functions.deleteNumber();
        break;
      default:
        break;
    }
  }
});

/* Buttons */

const btnZero = document.getElementById('numberZero');
const btnOne = document.getElementById('numberOne');
const btnTwo = document.getElementById('numberTwo');
const btnThree = document.getElementById('numberThree');
const btnFour = document.getElementById('numberFour');
const btnFive = document.getElementById('numberFive');
const btnSix = document.getElementById('numberSix');
const btnSeven = document.getElementById('numberSeven');
const btnEight = document.getElementById('numberEight');
const btnNine = document.getElementById('numberNine');

/* Operators */

const btnEqual = document.getElementById('calculateResult');
const btnAdd = document.getElementById('add');
const btnSubtract = document.getElementById('subtract');
const btnMultiply = document.getElementById('multiply');
const btnDivide = document.getElementById('divide');

/* Some other functions */

const btnClear = document.getElementById('clear');
const btnPercentage = document.getElementById('percentage');
const btnPlusMinus = document.getElementById('plusMinus');
const btnComma = document.getElementById('comma');

/* Display operations */

/* Event listeners */

const numbers = [
  btnZero,
  btnOne,
  btnTwo,
  btnThree,
  btnFour,
  btnFive,
  btnSix,
  btnSeven,
  btnEight,
  btnNine,
];

numbers.forEach((element) => {
  element.addEventListener('click', (e) => {
    functions.removeZero(functions.resultContent);
    functions.makeOperations(e, 'click');
  });
});

const operators = [btnAdd, btnSubtract, btnMultiply, btnDivide];

operators.forEach((element) => {
  element.addEventListener('click', (e) => {
    functions.displayHead(functions.operationContent, e, 'click');
  });
});

btnEqual.addEventListener('click', (e) => {
  functions.pressEqual();
});

btnClear.addEventListener('click', (e) => {
  functions.clearAllValues();
});

btnPlusMinus.addEventListener('click', (e) => {
  functions.plusOrMinus();
});

btnPercentage.addEventListener('click', (e) => {
  functions.percentageValue();
});

btnComma.addEventListener('click', (e) => {
  functions.addComma();
});
