/** @jsx h */
import { h } from "preact";
import { useState } from 'preact/hooks'
import { SquareName, ChessBoard, ChessSquare, SquareColor, SquareHex } from '../types/Chess.ts'
import { generateChessBoard, ranks, files } from '../utils/Board.ts'

type Guess = {
  duration: number;
  answered: SquareName;
  correctAnswer: SquareName;
  correct: boolean;
}

export default function ChessBoard() {
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

  function guessSquare(square: ChessSquare) {
    const now = Date.now()
    const guess: Guess = {
      duration: now - last,
      answered: square.name,
      correctAnswer: currentSquare.name,
      correct: square.name === currentSquare.name
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
      <div>
        {[...ranks].reverse().map(rank => (
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); height: calc(100vw / 8)">
            {[...files].map(file => {
              const square = board[`${file}${rank}`]
              const squareBackground = SquareHex[square.color]
              const textColor = square.color === SquareColor.dark ? SquareHex.light : SquareHex.dark

              return (
                <div
                  style={`background-color: ${squareBackground}; color: ${textColor}`}
                  onClick={() => guessSquare(square)}
                >
                  {' '}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
