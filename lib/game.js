import { boardSize, diskColor } from './const'
import { checkCanPlaceAll } from './board'

// ターンを反転する
export function takeTurn (turn) {
  if (turn === diskColor.dark) {
    return diskColor.light
  } else {
    return diskColor.dark
  }
}

// ゲーム終了を判断する処理
export function isGameEnd (board) {
  return (!checkCanPlaceAll(board, diskColor.dark)) && (!checkCanPlaceAll(board, diskColor.light))
}

export function countDisk (board) {
  const count = [0, 0]
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      if (board[i][j] !== diskColor.none) {
        count[board[i][j]]++
      }
    }
  }
  return count
}
