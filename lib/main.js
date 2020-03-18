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
let board // 盤面の各マスの状態を保持
let cursorPos // カーソル座標を保持

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
  // eslint-disable-next-line no-constant-condition
  if (true) {
    message += `<br>
      [w, s, a, d]:カーソル移動<br>
      [その他のキー]:石を置く`
  }

  html += '<br>' + message
  const div = document.querySelector('div')
  div.innerHTML = html

  window.onKeyDown = onKeyDown
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
  }
}
