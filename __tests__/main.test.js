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
  page += '      [w]:カーソルを上に移動<br>\n'
  page += '      [s]:カーソルを下に移動<br>\n'
  page += '      [a]:カーソルを左に移動<br>\n'
  page += '      [d]:カーソルを右に移動<br>\n'
  page += '      [その他のキー]:石を置く'
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
  page += '      [w]:カーソルを上に移動<br>\n'
  page += '      [s]:カーソルを下に移動<br>\n'
  page += '      [a]:カーソルを左に移動<br>\n'
  page += '      [d]:カーソルを右に移動<br>\n'
  page += '      [その他のキー]:石を置く'
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
