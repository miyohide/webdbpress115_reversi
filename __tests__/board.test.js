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

describe('when initial board', () => {
  /*
   * 初期のレイアウトに対する置ける石の場所を確認する
   * ・(2, 2) ・(3, 2) ・(4, 2) ・(5, 2)
   * ・(2, 3) ○(3, 3) ●(4, 3) ・(5, 3)
   * ・(2, 4) ●(3, 4) ○(4, 4) ・(5, 4)
   * ・(2, 5) ・(3, 5) ・(4, 5) ・(5, 5)
   * 黒手番の場合、置ける場所は(2, 3) (3, 2) (4, 5) (5, 4)
   * 白手番の場合、置ける場所は(2, 4) (3, 5) (4, 2) (5, 3)
   */
  test('all conditions are satisfied, checkCanPlace returns true', () => {
    // 黒手番の確認
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(2, 3), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(3, 2), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(4, 5), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(5, 4), false)).toBeTruthy()
    // 白手番の確認
    expect(board.checkCanPlace(initBoard(), diskColor.light, new Vec2(2, 4), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.light, new Vec2(3, 5), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.light, new Vec2(4, 2), false)).toBeTruthy()
    expect(board.checkCanPlace(initBoard(), diskColor.light, new Vec2(5, 3), false)).toBeTruthy()
  })

  test('and adjacent stones have the same color, checkCanPlace returns false', () => {
    // 隣接する石が手番と同じ色
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(4, 2), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(5, 2), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(5, 3), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(2, 4), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(2, 5), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(3, 5), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(5, 5), false)).toBeFalsy()
  })

  test('and not sandwiched by the same color, checkCanPlace returns false', () => {
    // 同じ色で挟んでいない
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(2, 2), false)).toBeFalsy()
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(5, 5), false)).toBeFalsy()
  })

  test('and there is a gap, checkCanPlace returns false', () => {
    // 間に石が置かれていない
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(1, 3), false)).toBeFalsy()
  })

  test('and stone is already placed, checkCanPlace returns false', () => {
    // すでに石が置かれている
    expect(board.checkCanPlace(initBoard(), diskColor.dark, new Vec2(3, 3), false)).toBeFalsy()
  })
})
