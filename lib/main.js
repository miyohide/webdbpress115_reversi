// 座標やサイズを保持する二次元ベクトルクラスを作成
class Vec2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

let message // ゲームの状態を知らせるメッセージ
const boardSize = new Vec2(8, 8) // 盤面のサイズ
const diskColor = {
  dark: 0, // 黒
  light: 1, // 白
  none: 2, // なし
  max: 3 // 要素数
}
const diskAA = [
  '●', // dark
  '○', // light
  '・' // none
]
const diskNames = [
  '黒', // dark
  '白' // light
]
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
  // eslint-disable-next-line no-constant-condition
  if (true) {
    message += `<br>
      [w]:カーソルを上に移動<br>
      [s]:カーソルを下に移動<br>
      [a]:カーソルを左に移動<br>
      [d]:カーソルを右に移動<br>
      [その他のキー]:石を置く`
  }

  html += '<br>' + message
  const div = document.querySelector('div')
  div.innerHTML = html

  window.onkeydown = onKeyDown
}

function onKeyDown (e) {
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
  if (checkCanPlace(turn, cursorPos, false)) {
    checkCanPlace(turn, cursorPos, true)
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
    takeTurn()
    if (!checkCanPlaceAll(turn)) {
      message = `${diskNames[turn]}はパスしました。<br>`
      takeTurn()
    }
  } else {
    message += 'そこには置けません。<br>'
  }
}

// ターンを反転する
function takeTurn () {
  if (turn === diskColor.dark) {
    turn = diskColor.light
  } else {
    turn = diskColor.dark
  }
}

function checkCanPlace (color, pos, reverse) {
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

// 任意の座標が範囲内かチェックする
function isInBoard (v) {
  return v.x >= 0 &&
    v.x < boardSize.x &&
    v.y >= 0 &&
    v.y < boardSize.y
}

// 石を置ける場所があるかどうかチェック
function checkCanPlaceAll (color) {
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      if (checkCanPlace(color, new Vec2(j, i), false)) {
        return true
      }
    }
  }
  return false
}

// ゲーム終了を判断する処理
function isGameEnd () {
  return (!checkCanPlaceAll(diskColor.dark)) && (!checkCanPlaceAll(diskColor.light))
}
