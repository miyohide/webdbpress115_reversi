import { diskColor } from './const'
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
