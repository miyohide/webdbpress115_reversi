function gameExplain () {
  let explain = '      [w]:カーソルを上に移動<br>\n'
  explain += '      [s]:カーソルを下に移動<br>\n'
  explain += '      [a]:カーソルを左に移動<br>\n'
  explain += '      [d]:カーソルを右に移動<br>\n'
  explain += '      [その他のキー]:石を置く'
  return explain
}

function blackTurn () {
  return '<br>黒のターンです。<br><br>\n'
}

function whiteTurn () {
  return '<br>白のターンです。<br><br>\n'
}

function nonDisk () {
  return '・・・・・・・・<br>'
}

function nonDiskWithCurrentLine () {
  return '・・・・・・・・←<br>'
}

function initialPage () {
  let page = nonDiskWithCurrentLine()
  page += nonDisk()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '↑　　　　　　　<br>'
  page += blackTurn()
  page += gameExplain()
  return page
}

function initialPageWithErrormessage () {
  let page = nonDiskWithCurrentLine()
  page += nonDisk()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '↑　　　　　　　<br>'
  page += '<br>そこには置けません。'
  page += blackTurn()
  page += gameExplain()
  return page
}

function moveUpFromInitialPage () {
  let page = nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDiskWithCurrentLine()
  page += '↑　　　　　　　<br>'
  page += blackTurn()
  page += gameExplain()
  return page
}

function moveDownFromInitialPage () {
  let page = nonDisk()
  page += nonDiskWithCurrentLine()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '↑　　　　　　　<br>'
  page += blackTurn()
  page += gameExplain()
  return page
}

function moveRightFromInitialPage () {
  let page = nonDiskWithCurrentLine()
  page += nonDisk()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '　↑　　　　　　<br>'
  page += blackTurn()
  page += gameExplain()
  return page
}

function moveLeftFromInitialPage () {
  let page = nonDiskWithCurrentLine()
  page += nonDisk()
  page += nonDisk()
  page += '・・・○●・・・<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '　　　　　　　↑<br>'
  page += blackTurn()
  page += gameExplain()
  return page
}

function turnBlack () {
  let page = nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '・・●●●・・・←<br>'
  page += '・・・●○・・・<br>'
  page += nonDisk()
  page += nonDisk()
  page += nonDisk()
  page += '　　↑　　　　　<br>'
  page += whiteTurn()
  page += gameExplain()
  return page
}

describe('onKeydown', () => {
  let main

  beforeAll(() => {
    document.body.innerHTML = '<div></div>'
    main = require('../lib/main')
  })

  beforeEach(() => {
    main.init()
  })

  test('initial load', () => {
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(initialPage())
  })

  test('when w key down, move up', () => {
    const wDown = new window.KeyboardEvent('keydown', { key: 'w' })
    main.onKeyDown(wDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(moveUpFromInitialPage())
  })

  test('when s key down, move down', () => {
    const sDown = new window.KeyboardEvent('keydown', { key: 's' })
    main.onKeyDown(sDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(moveDownFromInitialPage())
  })

  test('when s key down * 8, move top position', () => {
    const sDown = new window.KeyboardEvent('keydown', { key: 's' })
    for (let i = 0; i < 8; i++) {
      main.onKeyDown(sDown)
    }
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(initialPage())
  })

  test('when d key down, move right', () => {
    const dDown = new window.KeyboardEvent('keydown', { key: 'd' })
    main.onKeyDown(dDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(moveRightFromInitialPage())
  })

  test('when a key down, move left', () => {
    const aDown = new window.KeyboardEvent('keydown', { key: 'a' })
    main.onKeyDown(aDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(moveLeftFromInitialPage())
  })

  test('when x key down, show a error message', () => {
    const xDown = new window.KeyboardEvent('keydown', { key: 'x' })
    main.onKeyDown(xDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(initialPageWithErrormessage())
  })

  test('change black disk', () => {
    const sDown = new window.KeyboardEvent('keydown', { key: 's' })
    const dDown = new window.KeyboardEvent('keydown', { key: 'd' })
    const xDown = new window.KeyboardEvent('keydown', { key: 'x' })
    main.onKeyDown(sDown)
    main.onKeyDown(sDown)
    main.onKeyDown(sDown)
    main.onKeyDown(dDown)
    main.onKeyDown(dDown)
    main.onKeyDown(xDown)
    const div = document.querySelector('div')
    expect(div.innerHTML).toEqual(turnBlack())
  })
})
