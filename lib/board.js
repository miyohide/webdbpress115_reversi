import { boardSize, diskAA, diskColor } from './const'
import { Vec2 } from './vec2'

// 任意の座標が範囲内かチェックする
export function isInBoard (v) {
  return v.x >= 0 &&
    v.x < boardSize.x &&
    v.y >= 0 &&
    v.y < boardSize.y
}

export function initBoard () {
  const board = []
  for (let i = 0; i < boardSize.y; i++) {
    board[i] = []
    for (let j = 0; j < boardSize.x; j++) {
      board[i][j] = diskColor.none
    }
  }
  board[3][3] = diskColor.light
  board[4][4] = diskColor.light
  board[3][4] = diskColor.dark
  board[4][3] = diskColor.dark

  return board
}

export function checkCanPlace (board, color, pos, reverse) {
  let result = false // 置けるかどうかの結果
  // 指定された座標を中心に周囲8方向において石が置けるかチェックする
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const dir = new Vec2(j, i)
      // 指定された座標そのままは処理をスキップ
      if ((dir.x === 0) && (dir.y === 0)) {
        continue
      }
      const checkPos = new Vec2(pos.x + dir.x, pos.y + dir.y)
      if (!isInBoard(checkPos)) {
        // 座標が盤の範囲外であれば処理をスキップ
        continue
      }
      // 相手の石の色を取得する
      let opponent
      if (color === diskColor.dark) {
        opponent = diskColor.light
      } else {
        opponent = diskColor.dark
      }
      // 隣が相手の石でなければその方向のチェックはしない
      if (board[checkPos.y][checkPos.x] !== opponent) {
        continue
      }
      // 連続して石をチェックする
      while (true) {
        checkPos.x += dir.x
        checkPos.y += dir.y
        // 座標が範囲外であればループを抜ける
        if (!isInBoard(checkPos)) {
          break
        }
        // その座標に石がなかった場合も挟めなかったことを示すのでループを抜ける
        if (board[checkPos.y][checkPos.x] === diskColor.none) {
          break
        }
        if (board[checkPos.y][checkPos.x] === color) {
          result = true
          if (reverse) {
            // ひっくり返す処理
            const reversePos = new Vec2(pos.x, pos.y)
            while (true) {
              reversePos.x += dir.x
              reversePos.y += dir.y

              // ひっくり返す座標がひっくり返しの終わる座標に到着したら終了
              if ((reversePos.x === checkPos.x) && (reversePos.y === checkPos.y)) {
                break
              }
              board[reversePos.y][reversePos.x] = color
            }
          }
        }
      }
    }
  }
  return result
}

// 石を置ける場所があるかどうかチェック
export function checkCanPlaceAll (board, color) {
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      if (checkCanPlace(board, color, new Vec2(j, i), false)) {
        return true
      }
    }
  }
  return false
}

export function renderBoard (board, cursorPos) {
  let html = ''
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      html += diskAA[board[i][j]]
    }
    if (i === cursorPos.y) {
      html += '←'
    }
    html += '<br>'
  }
  // カーソルの列を示す矢印を表示
  for (let i = 0; i < boardSize.x; i++) {
    html += (i === cursorPos.x) ? '↑' : '　'
  }
  html += '<br>'
  return html
}
