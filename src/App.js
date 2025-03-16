import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // Handle number input
  const handleNumber = (num) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  // Handle operator (+, -, *, /)
  const handleOperator = (op) => {
    setEquation(display + op);
    setDisplay('0');
  };

  // Custom parser for basic arithmetic
  const parseExpression = (expr) => {
    const tokens = expr.match(/(\d+\.?\d*)|([+\-*/])/g) || [];
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNum = parseFloat(tokens[i + 1]);
      if (operator === '+') result += nextNum;
      else if (operator === '-') result -= nextNum;
      else if (operator === '*') result *= nextNum;
      else if (operator === '/') result /= nextNum;
    }
    return result;
  };

  // Calculate result using custom parser
  const calculate = () => {
    try {
      const result = parseExpression(equation + display); // Use custom parser
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  // Clear display
  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="current">{display}</div>
      </div>
      <div className="buttons">
        <button className="clear" onClick={clear}>C</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button className="equals" onClick={calculate}>=</button>
        <button className="zero" onClick={() => handleNumber('0')}>0</button>
        <button onClick={() => handleNumber('.')}>.</button>
      </div>
    </div>
  );
}

export default App;
