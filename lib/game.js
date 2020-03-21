import { diskColor } from './const'

// ターンを反転する
export function takeTurn (turn) {
  if (turn === diskColor.dark) {
    return diskColor.light
  } else {
    return diskColor.dark
  }
}
