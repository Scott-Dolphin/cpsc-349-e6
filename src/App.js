import React, { useEffect, useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }


  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Calculator functions
  let num1 = 0;
  let num2 = 0;
  let currentOperator = "";
  let pendingOperator = false;

  function printNumber(number) {
    if (pendingOperator) {
      clearScreen();
      document.getElementById("result").innerText += number
      return 0;
    }
    document.getElementById("result").innerText += number;

  }

  function getOperator(operator) {
    num1 = document.getElementById("result").innerText;
    console.log("operator: " + operator);
    console.log("number: " + num1);

    currentOperator = operator;
    pendingOperator = true;
  }

  function evaluate(operator) {
    num2 = document.getElementById("result").innerText;
    console.log("num1: " + num1);
    console.log("num2: " + num2);
    let ans = 0;

    switch (operator) {

      case "+":
        clearScreen();
        ans = parseInt(num1) + parseInt(num2);
        document.getElementById("result").innerText = ans;
        num1 = ans;
        break;
      case "-":
        clearScreen();
        ans = parseInt(num1) - parseInt(num2);
        document.getElementById("result").innerText = ans;
        num1 = ans;
        break;
      case "*":
        clearScreen();
        ans = parseInt(num1) * parseInt(num2);
        document.getElementById("result").innerText = ans;
        num1 = ans;
        break;
      case "÷":
        clearScreen();
        ans = parseInt(num1) / parseInt(num2);
        document.getElementById("result").innerText = ans;
        num1 = ans;

        break;
    }

  }

  function clear() {
    clearScreen();
    num1 = 0;
    num2 = 0;
    pendingOperator = false;
  }

  function clearScreen() {
    document.getElementById("result").innerText = "";
  }


  return (
    <>
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">tic tac toe.js</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <div className="game">
            <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
      <br></br>


      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Calculator.js</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <p className="screen" id="result"></p>
          <table>
            <tr>
              <td><button className="number" onClick={() => printNumber(7)}>7</button></td>
              <td><button className="number" onClick={() => printNumber(8)}>8</button></td>
              <td><button className="number" onClick={() => printNumber(9)}>9</button></td>
              <td><button className="operator" onClick={() => getOperator('+')}>+</button></td>
            </tr>
            <tr>
              <td><button className="number" onClick={() => printNumber(4)}>4</button></td>
              <td><button className="number" onClick={() => printNumber(5)}>5</button></td>
              <td><button className="number" onClick={() => printNumber(6)}>6</button></td>
              <td><button className="operator" onClick={() => getOperator('-')}>-</button></td>
            </tr>
            <tr>
              <td><button className="number" onClick={() => printNumber(1)}>1</button></td>
              <td><button className="number" onClick={() => printNumber(2)}>2</button></td>
              <td><button className="number" onClick={() => printNumber(3)}>3</button></td>
              <td><button className="operator" onClick={() => getOperator('*')}>x</button></td>
            </tr>
            <tr>
              <td><button className="operator " onClick={() => clear()}>C</button></td>
              <td><button className="number" onClick={() => printNumber(0)}>0</button></td>
              <td><button className="operator" onClick={() => evaluate(currentOperator)}>=</button></td>
              <td><button className="operator" onClick={() => getOperator('/')}>÷</button></td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}