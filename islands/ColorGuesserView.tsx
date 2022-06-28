/** @jsx h */
import { h } from "preact";
import { useState } from 'preact/hooks'
import { ChessSquare, SquareColor, SquareHex } from '../types/Chess.ts'
import { generateChessBoard, ranks, files } from '../utils/Board.ts'

type Guess = {
  duration: number;
  answered: SquareColor;
  correctAnswer: SquareColor;
  correct: boolean;
}

export default function ColorGuesserView() {
  const board = generateChessBoard()
  const [currentSquare, setCurrentSquare] = useState(randomSquare())
  const [elapsed, setElapsed] = useState(0)
  const [start] = useState(Date.now())
  const [last, setLast] = useState(Date.now())
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [averageTime, setAverageTime] = useState(0)

  function randomSquare(): ChessSquare {
    const file = Math.floor(Math.random() * files.length)
    const rank = Math.floor(Math.random() * files.length)

    return board[`${files[file]}${ranks[rank]}`]
  }

  function average(array: number[]) {
    return array.reduce((a, b) => a + b) / array.length;
  }

  function guessColor(color: SquareColor) {
    const now = Date.now()
    const guess: Guess = {
      duration: now - last,
      answered: color,
      correctAnswer: currentSquare.color,
      correct: color === currentSquare.color
    }
    const newGuesses = [...guesses, guess]

    if (guess.correct) {
      const newAverageTime = average(newGuesses
        .filter(g => !!g.correct)
        .map(g => g.duration))
      setAverageTime(newAverageTime)
      setCurrentSquare(randomSquare())
      setLast(now)
    }
    setGuesses(newGuesses)
    setElapsed(Date.now() - start)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h2>Correct: {guesses.filter(guess => !!guess.correct).length}</h2>
        <h2>Total: {guesses.length}</h2>
        <h1>Current: {currentSquare.file + currentSquare.rank}</h1>
        <p>Elapsed: {(elapsed / 1000).toFixed(2)}</p>
        <p>Average time: {(averageTime / 1000).toFixed(2)}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr)">
        <div
          onClick={() => guessColor(SquareColor.light)}
          style={`background-color: ${SquareHex.light}; color: ${SquareHex.dark}; padding: 100px 0`}
        >
          Light
        </div>
        <div
          onClick={() => guessColor(SquareColor.dark)}
          style={`background-color: ${SquareHex.dark}; color: ${SquareHex.light}; padding: 100px 0`}
        >
          Dark
        </div>
      </div>
    </div>
  );
}
