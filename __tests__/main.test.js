function gameExplain () {
  let explain = '      [w]:カーソルを上に移動<br>\n'
  explain += '      [s]:カーソルを下に移動<br>\n'
  explain += '      [a]:カーソルを左に移動<br>\n'
  explain += '      [d]:カーソルを右に移動<br>\n'
  explain += '      [その他のキー]:石を置く'
  return explain
}

function initialPage () {
  let page = '・・・・・・・・←<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '↑　　　　　　　<br>'
  page += '<br>黒のターンです。<br><br>\n'
  page += gameExplain()
  return page
}

function moveUpFromInitialPage () {
  let page = '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・<br>'
  page += '・・・・・・・・←<br>'
  page += '↑　　　　　　　<br>'
  page += '<br>黒のターンです。<br><br>\n'
  page += gameExplain()
  return page
}

test('initial load', () => {
  document.body.innerHTML = '<div></div>'
  require('../lib/main')
  const div = document.querySelector('div')
  expect(div.innerHTML).toEqual(initialPage())
})

test('when w key down, move up', () => {
  document.body.innerHTML = '<div></div>'
  const main = require('../lib/main')
  const wDown = new window.KeyboardEvent('keydown', { key: 'w' })
  main.onKeyDown(wDown)
  const div = document.querySelector('div')
  expect(div.innerHTML).toEqual(moveUpFromInitialPage())
})
