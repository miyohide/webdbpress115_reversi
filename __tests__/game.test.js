import { isGameEnd, takeTurn } from '../lib/game'
import { diskColor } from '../lib/const'
import { initBoard } from '../lib/board'

test('when turn is dark, taketurn returns light', () => {
  expect(takeTurn(diskColor.dark)).toBe(diskColor.light)
})

test('when turn is light, taketurn returns dark', () => {
  expect(takeTurn(diskColor.light)).toBe(diskColor.dark)
})

test('when initial board, isGameEnd returns false', () => {
  expect(isGameEnd(initBoard())).toBeFalsy()
})

test('when all dark, isGameEnd returns true', () => {
  const b = initBoard()
  b[3][3] = diskColor.dark
  b[4][4] = diskColor.dark
  expect(isGameEnd(b)).toBeTruthy()
})

test('when all light, isGameEnd returns true', () => {
  const b = initBoard()
  b[4][3] = diskColor.light
  b[3][4] = diskColor.light
  expect(isGameEnd(b)).toBeTruthy()
})
