import { boardSize, diskColor, diskNames } from './const'
import { checkCanPlaceAll } from './board'

// ターンを反転する
export function takeTurn (turn) {
  if (turn === diskColor.dark) {
    return diskColor.light
  } else {
    return diskColor.dark
  }
}

// ゲーム終了を判断する処理
export function isGameEnd (board) {
  return (!checkCanPlaceAll(board, diskColor.dark)) && (!checkCanPlaceAll(board, diskColor.light))
}

export function countDisk (board) {
  const count = [0, 0]
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++) {
      if (board[i][j] !== diskColor.none) {
        count[board[i][j]]++
      }
    }
  }
  return count
}

export function winnerMessage (board) {
  const count = countDisk(board)
  let message = `${diskNames[diskColor.dark]}:${count[diskColor.dark]} - ${diskNames[diskColor.light]}:${count[diskColor.light]}<br>`
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
  return message
}

export function gameExplanation (message, turn, isGameEnd) {
  let rMessage = ''
  rMessage = message + `${diskNames[turn]}のターンです。<br>`
  if (!isGameEnd) {
    rMessage += `<br>
      [w]:カーソルを上に移動<br>
      [s]:カーソルを下に移動<br>
      [a]:カーソルを左に移動<br>
      [d]:カーソルを右に移動<br>
      [その他のキー]:石を置く`
  } else {
    rMessage += 'なにかキーを押してください。'
  }
  return rMessage
}
