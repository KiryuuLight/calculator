export const operationContent = document.getElementById('displayOperation');

/* Display result */

export const resultContent = document.getElementById('displayResult');

/* Variables */
export let input;
export let firstNumber = undefined;
export let secNumber = undefined;
export let operatorValue = '';
export let resultOperation = undefined;
export let operateSuccesfully;
export let showedSuccesfully = false;

/* Basic functions */

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

/* Regex */

export const regNumber = /^-?[0-9]\d*(\.\d+)?$/;
export const regOperators = /^[\/x\-\+]/;
export const regSpecial = /^[%C.]|Delete|Enter|Backspace$/;
export const regAfterZero = /^-?0[0-9]*(\.[0-9]+)?/;
export const regClearBrLine = /(\r\n|\n|\r)/gm;

/* Advance functions */

export function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case 'x':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
      console.log('Not a valid value');
      break;
  }
  return result;
}

/* Display numbers in screen */

export const displayBody = (domElement, input) => {
  const p = document.createElement('p');
  if (domElement === resultContent) {
    p.className = 'text';
    p.textContent = input;
    domElement.appendChild(p);
    return;
  }
  domElement.innerHTML = '&#8203;';
};

export const displayHead = (domElement, e, typeEvent) => {
  typeEvent === 'click'
    ? (input = e.target.textContent.trim())
    : (input = e.key);

  operatorValue = operatorValue + input;

  /* Check if last value in operationContent field is '=' */
  if (operationContent.lastChild.innerText === '=') {
    operationContent.removeChild(operationContent.lastChild);
    operationContent.textContent = '';
    const displaySecondNumber = document.createElement('p');

    resultOperation = mathRoundTwo(
      parseFloat(resultContent.innerText.replace(regClearBrLine, ''))
    );
    displaySecondNumber.textContent = resultOperation;

    const operator = document.createElement('p');
    operator.textContent = operatorValue[0];

    operationContent.appendChild(displaySecondNumber);
    operationContent.appendChild(operator);

    firstNumber = resultOperation;
    operateSuccesfully = true;
    return;
  }

  if (firstNumber === undefined) {
    storageFirstValue(domElement, e);
  } else {
    secNumber = mathRoundTwo(
      parseFloat(resultContent.innerText.replace(regClearBrLine, ''))
    );

    /* Check if the user press 2 two times an operator , if that true
      removes the last operator and change for the new input operator */
    if (secNumber === resultOperation) {
      operatorValue = operatorValue.slice(1);
      operationContent.removeChild(operationContent.lastChild);
      const p = document.createElement('p');
      p.textContent = operatorValue;
      operationContent.appendChild(p);
      return operatorValue;
    }

    if (resultOperation === undefined) {
      resultOperation = mathRoundTwo(
        operate(operatorValue[0], firstNumber, secNumber)
      );
    } else {
      resultOperation = mathRoundTwo(
        operate(operatorValue[0], resultOperation, secNumber)
      );
    }
    clearHtml(resultContent);
    removeZero(resultContent);
    displayBody(resultContent, resultOperation);
    operateSuccesfully = true;

    const displaySecondNumber = document.createElement('p');
    displaySecondNumber.textContent = secNumber;

    const operator = document.createElement('p');
    operator.textContent = operatorValue[1];

    operationContent.appendChild(displaySecondNumber);
    operationContent.appendChild(operator);

    operatorValue = operatorValue.slice(1);
  }

  console.log('firstNumber', firstNumber);
  console.log('secNumber', secNumber);
  console.log('resultOperation', resultOperation);
  console.log('operatorValue', operatorValue);
};

/* Make Calcs */

export const makeOperations = (e, typeEvent) => {
  typeEvent === 'click'
    ? (input = e.target.textContent.trim())
    : (input = e.key);

  console.log(input);
  if (operateSuccesfully) {
    clearHtml(resultContent);
    removeZero(resultContent);
    operateSuccesfully = false;
  }
  displayBody(resultContent, input);
  showedSuccesfully = false;
};

/* Tools */

export const removeZero = (domElement) => {
  if (domElement.innerText === '0') {
    domElement.textContent = '';
  }
};

export const clearHtml = (domElement) => {
  domElement.textContent = '';
  if (domElement === resultContent) {
    displayBody(domElement, 0);
  } else {
    displayBody(domElement, '&#8203');
  }
};

export const storageFirstValue = (domElement, e) => {
  /* Create an p tag element for first number and saves the value in a variable
    called firstNumber */

  const displayFirstNumber = document.createElement('p');
  firstNumber = parseFloat(resultContent.innerText.replace(regClearBrLine, ''));
  displayFirstNumber.textContent = firstNumber;

  /* Then create another p element for operator */
  const operator = document.createElement('p');
  operator.textContent = input;
  domElement.appendChild(displayFirstNumber);
  domElement.appendChild(operator);

  /* Clear the value in resultContent field */
  clearHtml(resultContent);
  console.log(firstNumber);
};

/* Press Equal */

export const pressEqual = () => {
  if (showedSuccesfully) {
    return;
  }

  secNumber = parseFloat(displayResult.textContent);
  if (firstNumber !== undefined && secNumber !== undefined) {
    resultOperation = mathRoundTwo(
      operate(operatorValue[0], firstNumber, secNumber)
    );
    const elements = [secNumber, '='];
    elements.forEach((value) => {
      const val = document.createElement('p');
      val.textContent = value;
      operationContent.appendChild(val);
    });

    clearHtml(resultContent);
    removeZero(resultContent);
    displayBody(resultContent, resultOperation);
    operatorValue = operatorValue.slice(1);

    console.log(resultOperation);

    showedSuccesfully = true;
  }
};

export const clearAllValues = () => {
  firstNumber = undefined;
  secNumber = undefined;
  operatorValue = '';
  resultOperation = undefined;
  operateSuccesfully = false;
  showedSuccesfully = false;
  clearHtml(operationContent);
  clearHtml(resultContent);
};

export const percentageValue = () => {
  const value = mathRoundTwo(
    parseFloat(resultContent.innerText.replace(regClearBrLine, ''))
  );
  const percentage = value / 100;
  clearHtml(resultContent);
  removeZero(resultContent);
  displayBody(resultContent, percentage);
};

export const addComma = () => {
  const boolean = resultContent.innerText
    .replace(regClearBrLine, '')
    .includes('.');
  if (!boolean) {
    const p = document.createElement('p');
    p.className = 'text';
    p.textContent = '.';
    resultContent.appendChild(p);
  }
};

export const plusOrMinus = () => {
  if (resultContent.innerText.replace(regClearBrLine, '')[0] !== '-') {
    const p = document.createElement('p');
    p.textContent = '-';
    p.className = 'text';
    resultContent.insertBefore(p, resultContent.children[0]);
  } else {
    if (resultOperation) {
      const p = document.createElement('p');
      const cut = resultContent.children[0].innerText.slice(1);
      p.textContent = cut;
      p.className = 'text';
      resultContent.removeChild(resultContent.children[0]);
      resultContent.appendChild(p);
      return;
    }
    resultContent.removeChild(resultContent.children[0]);
  }
};

export const mathRoundTwo = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const deleteNumber = () => {
  if (resultOperation) {
    const p = document.createElement('p');
    const cut = resultContent.children[0].innerText.slice(0, -1);
    p.textContent = cut;
    p.className = 'text';
    resultContent.removeChild(resultContent.children[0]);
    resultContent.appendChild(p);
    return;
  }
  resultContent.removeChild(resultContent.lastChild);
};
