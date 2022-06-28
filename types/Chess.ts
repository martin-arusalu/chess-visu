export type SquareRank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type SquareFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type SquareName = `${SquareFile}${SquareRank}`

export enum SquareColor { light = 'light', dark = 'dark' }
export enum SquareHex { light = '#f2e8d5', dark = '#80390d' }

export type ChessSquare = {
  name: SquareName;
  file: SquareFile;
  rank: SquareRank;
  color: SquareColor
}
export type ChessBoard = {
  [square in SquareName]: ChessSquare
}
