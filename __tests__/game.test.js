import * as game from '../lib/game'
import { diskColor } from '../lib/const'
import { initBoard } from '../lib/board'

test('when turn is dark, taketurn returns light', () => {
  expect(game.takeTurn(diskColor.dark)).toBe(diskColor.light)
})

test('when turn is light, taketurn returns dark', () => {
  expect(game.takeTurn(diskColor.light)).toBe(diskColor.dark)
})

test('when initial board, isGameEnd returns false', () => {
  expect(game.isGameEnd(initBoard())).toBeFalsy()
})

test('when all dark, isGameEnd returns true', () => {
  const b = initBoard()
  b[3][3] = diskColor.dark
  b[4][4] = diskColor.dark
  expect(game.isGameEnd(b)).toBeTruthy()
})

test('when all light, isGameEnd returns true', () => {
  const b = initBoard()
  b[4][3] = diskColor.light
  b[3][4] = diskColor.light
  expect(game.isGameEnd(b)).toBeTruthy()
})

test('when initial board, countDisk returns [2, 2]', () => {
  expect(game.countDisk(initBoard())).toEqual([2, 2])
})

test('when all dark, countDisk returns [4, 0]', () => {
  const b = initBoard()
  b[3][3] = diskColor.dark
  b[4][4] = diskColor.dark
  expect(game.countDisk(b)).toEqual([4, 0])
})

test('when all light, countDisk returns [0, 4]', () => {
  const b = initBoard()
  b[4][3] = diskColor.light
  b[3][4] = diskColor.light
  expect(game.countDisk(b)).toEqual([0, 4])
})

test('when initial board, winnerMessage returns draw', () => {
  expect(game.winnerMessage(initBoard())).toEqual('黒:2 - 白:2<br>引き分けです<br><br>')
})

test('when all dark, winnerMessage returns dark win', () => {
  const b = initBoard()
  b[3][3] = diskColor.dark
  b[4][4] = diskColor.dark
  expect(game.winnerMessage(b)).toEqual('黒:4 - 白:0<br>黒の勝ちです。<br><br>')
})

test('when all light, winnerMessage returns light win', () => {
  const b = initBoard()
  b[4][3] = diskColor.light
  b[3][4] = diskColor.light
  expect(game.winnerMessage(b)).toEqual('黒:0 - 白:4<br>白の勝ちです。<br><br>')
})

test('when game ends, gameExplanation returns press any key', () => {
  expect(game.gameExplanation('', diskColor.dark, true))
    .toEqual('黒のターンです。<br>なにかキーを押してください。')
})

test('when game does not end, gameExplanation returns game explanation', () => {
  expect(game.gameExplanation('', diskColor.dark, false))
    .toEqual('黒のターンです。<br><br>\n      [w]:カーソルを上に移動<br>\n      [s]:カーソルを下に移動<br>\n      [a]:カーソルを左に移動<br>\n      [d]:カーソルを右に移動<br>\n      [その他のキー]:石を置く')
})
