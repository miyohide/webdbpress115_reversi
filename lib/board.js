import { boardSize } from './const'

// 任意の座標が範囲内かチェックする
export function isInBoard (v) {
  return v.x >= 0 &&
    v.x < boardSize.x &&
    v.y >= 0 &&
    v.y < boardSize.y
}
