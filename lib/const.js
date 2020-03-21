import { Vec2 } from './vec2'

export const diskColor = {
  dark: 0, // 黒
  light: 1, // 白
  none: 2, // なし
  max: 3 // 要素数
}

export const diskAA = [
  '●', // dark
  '○', // light
  '・' // none
]

export const diskNames = [
  '黒', // dark
  '白' // light
]

export const boardSize = new Vec2(8, 8) // 盤面のサイズ
