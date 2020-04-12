import { Vec2 } from './vec2'
import { diskColor, diskNames, boardSize } from './const'
import { gameExplanation, isGameEnd, takeTurn, winnerMessage } from './game'
import {
  checkCanPlace,
  checkCanPlaceAll,
  initBoard,
  renderBoard
} from './board'

let message // ゲームの状態を知らせるメッセージ
/* 盤面の各マスの状態を保持
  以下の盤レイアウト
  (0,0) (1,0) (2,0) ... (7,0)
  (0,1) (1,1) (2,1) ... (7,1)
  ...
  (0,7) (1,7) (2,7) ... (7,7)
 */
let board
let cursorPos // カーソル座標を保持
let turn // 現在のターンを保持

init()

// 初期化関数
export function init () {
  message = ''
  board = initBoard()

  cursorPos = new Vec2(0, 0)

  turn = diskColor.dark
  draw()
}

// 描画関数
function draw () {
  let html = renderBoard(board, cursorPos) // 出力するHTMLコードを保持
  message = gameExplanation(message, turn, isGameEnd(board))

  html += '<br>' + message
  const div = document.querySelector('div')
  div.innerHTML = html

  window.onkeydown = onKeyDown
}

export function onKeyDown (e) {
  if (isGameEnd(board)) {
    // ゲームが終了しているのであれば初期化してはじめからスタート
    init()
    return
  }
  message = ''

  switch (e.key) {
    case 'w':
      cursorPos.y--
      break
    case 's':
      cursorPos.y++
      break
    case 'a':
      cursorPos.x--
      break
    case 'd':
      cursorPos.x++
      break
    default:
      onOtherKeyDown()
  }

  // カーソルが盤面の範囲を超えた場合の処理を対応
  if (cursorPos.x < 0) {
    cursorPos.x += boardSize.x
  }
  if (cursorPos.x >= boardSize.x) {
    cursorPos.x -= boardSize.x
  }
  if (cursorPos.y < 0) {
    cursorPos.y += boardSize.y
  }
  if (cursorPos.y >= boardSize.y) {
    cursorPos.y -= boardSize.y
  }

  // 再描画
  draw()
}

// 石を置く処理
function onOtherKeyDown () {
  if (checkCanPlace(board, turn, cursorPos, false)) {
    checkCanPlace(board, turn, cursorPos, true)
    board[cursorPos.y][cursorPos.x] = turn
    if (isGameEnd(board)) {
      // ゲーム終了処理
      message = winnerMessage(board)
      return
    }
    turn = takeTurn(turn)
    if (!checkCanPlaceAll(board, turn)) {
      message = `${diskNames[turn]}はパスしました。<br>`
      turn = takeTurn(turn)
    }
  } else {
    message += 'そこには置けません。<br>'
  }
}
