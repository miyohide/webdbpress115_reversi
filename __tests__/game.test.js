import { takeTurn } from '../lib/game'
import { diskColor } from '../lib/const'

test('when turn is dark, taketurn returns light', () => {
  expect(takeTurn(diskColor.dark)).toBe(diskColor.light)
})

test('when turn is light, taketurn returns dark', () => {
  expect(takeTurn(diskColor.light)).toBe(diskColor.dark)
})
