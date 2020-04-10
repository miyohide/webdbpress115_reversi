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

test('initial load', () => {
  document.body.innerHTML = '<div></div>'
  require('../lib/main')
  const div = document.querySelector('div')
  expect(div.innerHTML).toEqual(initialPage())
})
