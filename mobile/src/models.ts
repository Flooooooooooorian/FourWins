
export type Game = {
  board: number[][],
  currentPlayer: number,
  winner: number,
  winningCells: {column: number, row: number}[]
}
