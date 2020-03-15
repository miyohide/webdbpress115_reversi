
let message // ゲームの状態を知らせるメッセージ

init()

// 初期化関数
function init () {
  message = ''
  draw()
}

// 描画関数
function draw () {
  let html = '' // 出力するHTMLコードを保持

  html += '<br>' + message
  const div = document.querySelector('div')
  div.innerHTML = html
}
