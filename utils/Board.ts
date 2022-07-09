import { SquareName, SquareFile, SquareRank, ChessBoard, ChessSquare, SquareColor } from '../types/Chess.ts'

export const files: SquareFile[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const ranks: SquareRank[] = ['1', '2', '3', '4', '5', '6', '7', '8']

export function generateChessBoard(): ChessBoard {
  const board: Partial<ChessBoard> = {}

  for (let num = 0; num < 64; num++) {
    const file = files[Math.floor(num / 8)]
    const rank = ranks[num % 8]
    const name: SquareName = `${file}${rank}`
    const color = (Math.floor(num / 8) + num % 8) % 2 === 0 ? SquareColor.dark : SquareColor.light
    const square: ChessSquare = { name, file, rank, color }
    board[`${file}${rank}`] = square
  }

  function isChessBoard(board: Partial<ChessBoard> | ChessBoard): board is ChessBoard {
    for (const file of files) {
      for (const rank of ranks) {
        if (board[`${file}${rank}`] === undefined) return false
      }
    }

    return true
  }

  if (!isChessBoard(board)) {
    throw new Error('board initialization failed')
  }

  return board;
}