const display = document.getElementById('display');
let currentInput = ''; // Current input (e.g., "5")
let previousInput = ''; // Previous input (e.g., "10")
let operator = null; // Current operator (e.g., "+")

// Event listener for button clicks
document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      handleNumber(value);
    } else if (action !== undefined) {
      handleAction(action);
    }
  });
});

// Handle number input
function handleNumber(value) {
  if (currentInput === '0' && value === '0') return; // Avoid multiple leading zeroes
  if (currentInput.includes('.') && value === '.') return; // Avoid multiple dots

  currentInput = currentInput === '0' ? value : currentInput + value;
  updateDisplay(currentInput);
}

// Handle actions (+, -, *, /, clear, equals)
function handleAction(action) {
  switch (action) {
    case 'add':
      setOperator('+');
      break;
    case 'subtract':
      setOperator('-');
      break;
    case 'multiply':
      setOperator('*');
      break;
    case 'divide':
      setOperator('/');
      break;
    case 'equals':
      calculateResult();
      break;
    case 'clear':
      clearCalculator();
      break;
  }
}

// Set operator and prepare for next input
function setOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') calculateResult(); // If operator pressed again, calculate
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

// Calculate result and display it
function calculateResult() {
  if (currentInput === '' || previousInput === '' || operator === null) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  let result = 0;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Error'; // Avoid division by zero
      break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay(currentInput);
}

// Clear calculator
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    handleNumber(key);
  } else if (key === '+') {
    handleAction('add');
  } else if (key === '-') {
    handleAction('subtract');
  } else if (key === '*') {
    handleAction('multiply');
  } else if (key === '/') {
    handleAction('divide');
  } else if (key === 'Enter' || key === '=') {
    handleAction('equals');
  } else if (key === 'Escape') {
    handleAction('clear');
  }
});
