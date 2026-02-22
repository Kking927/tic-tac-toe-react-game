import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) setWinner(gameWinner);
    else if (!newSquares.includes("")) setWinner("Draw");
  }

  function calculateWinner(squares) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <>
      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      <p className="status">
        {winner === "Draw"
          ? "It's a draw!"
          : winner
          ? `Winner: ${winner}`
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </p>

      <button onClick={resetGame}>Reset</button>
    </>
  );
}
