/* Basic functions */

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
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

export const display = (e) => {
  const p = document.createElement('p');
  p.textContent = e.target.textContent;
  displayOperation.appendChild(p);
};
