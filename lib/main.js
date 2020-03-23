import { Vec2 } from './vec2'
import { diskColor, diskAA, diskNames, boardSize } from './const'
import { takeTurn } from './game'
import { checkCanPlace, checkCanPlaceAll } from './board'

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
function init () {
  message = ''
  board = []
  for (let i = 0; i < boardSize.y; i++) {
    board[i] = []
    for (let j = 0; j < boardSize.x; j++) {
      board[i][j] = diskColor.none
    }
  }
  board[3][4] = diskColor.dark
  board[4][3] = diskColor.dark
  board[3][3] = diskColor.light
  board[4][4] = diskColor.light

  cursorPos = new Vec2(0, 0)

  turn = diskColor.dark
  draw()
}

// 描画関数
function draw () {
  let html = '' // 出力するHTMLコードを保持

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
  message += `${diskNames[turn]}のターンです。<br>`
  if (!isGameEnd()) {
    message += `<br>
      [w]:カーソルを上に移動<br>
      [s]:カーソルを下に移動<br>
      [a]:カーソルを左に移動<br>
      [d]:カーソルを右に移動<br>
      [その他のキー]:石を置く`
  } else {
    message += 'なにかキーを押してください。'
  }

  html += '<br>' + message
  const div = document.querySelector('div')
  div.innerHTML = html

  window.onkeydown = onKeyDown
}

function onKeyDown (e) {
  if (isGameEnd()) {
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
    if (isGameEnd()) {
      // ゲーム終了処理
      const count = [0, 0]
      for (let i = 0; i < boardSize.y; i++) {
        for (let j = 0; j < boardSize.x; j++) {
          if (board[i][j] !== diskColor.none) {
            count[board[i][j]]++
          }
        }
      }
      message = `${diskNames[diskColor.dark]}:${count[diskColor.dark]} - ${diskNames[diskColor.light]}:${count[diskColor.light]}<br>`
      let winner = diskColor.none
      if (count[diskColor.dark] > count[diskColor.light]) {
        winner = diskColor.dark
      } else if (count[diskColor.light] > count[diskColor.dark]) {
        winner = diskColor.light
      }
      if (winner !== diskColor.none) {
        message += `${diskNames[winner]}の勝ちです。<br>`
      } else {
        message += '引き分けです<br>'
      }
      message += '<br>'
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

// ゲーム終了を判断する処理
function isGameEnd () {
  return (!checkCanPlaceAll(board, diskColor.dark)) && (!checkCanPlaceAll(board, diskColor.light))
}
