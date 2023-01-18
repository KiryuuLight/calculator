import * as functions from './functions.js';

/* Buttons */

const buttonZero = document.getElementById('numberZero');
const buttonOne = document.getElementById('numberOne');
const buttonTwo = document.getElementById('numberTwo');
const buttonThree = document.getElementById('numberThree');
const buttonFour = document.getElementById('numberFour');
const buttonFive = document.getElementById('numberFive');
const buttonSix = document.getElementById('numberSix');
const buttonSeven = document.getElementById('numberSeven');
const buttonEight = document.getElementById('numberEight');
const buttonNine = document.getElementById('numberNine');

/* Display operations */

const displayOperation = document.getElementById('displayOperation');

/* Display result */

const displayResult = document.getElementById('displayResult');

const detectInput = document.addEventListener('click', (e) => {
  console.log(e.target.textContent);
  functions.display(e);
});
