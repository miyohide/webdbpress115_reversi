import { Vec2 } from '../lib/vec2'
import { initBoard } from '../lib/board'
import { boardSize, diskColor } from '../lib/const'

const board = require('../lib/board')

test('(0, 0) is in Board', () => {
  expect(board.isInBoard(new Vec2(0, 0))).toBeTruthy()
})

test('(8, 0) is not in Board', () => {
  expect(board.isInBoard(new Vec2(8, 0))).toBeFalsy()
})

test('initBoard returns board with 2 dark disks and 2 light disks', () => {
  const b = initBoard()
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
        expect(b[i][j]).toBe(diskColor.light)
      } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
        expect(b[i][j]).toBe(diskColor.dark)
      } else {
        expect(b[i][j]).toBe(diskColor.none)
      }
    }
  }
})

test('checkCanPlace return true', () => {
  expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(2, 3), false)).toBeTruthy()
})
