import { Vec2 } from '../lib/vec2'

const board = require('../lib/board')

test('(0, 0) is in Board', () => {
  expect(board.isInBoard(new Vec2(0, 0))).toBeTruthy()
})

test('(8, 0) is not in Board', () => {
  expect(board.isInBoard(new Vec2(8, 0))).toBeFalsy()
})
