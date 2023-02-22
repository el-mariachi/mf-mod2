import { GameEvent, GameAction } from '@types/game'

export type GameActionType = [GameEvent, number, () => void]

const KeysToGameEvents: { [key: string]: GameEvent } = {
  ArrowLeft: GameEvent.Left,
  ArrowRight: GameEvent.Right,
  ArrowUp: GameEvent.Up,
  ArrowDown: GameEvent.Down,
  KeyA: GameEvent.Left,
  KeyD: GameEvent.Right,
  KeyW: GameEvent.Up,
  KeyS: GameEvent.Down,
}

export const useGameController = (
  setGameAction: React.Dispatch<React.SetStateAction<GameAction>>
) => {
  function keydownHandler(e: KeyboardEvent) {
    const pressTime = Date.now()
    const gameEvent = KeysToGameEvents[e.key] as GameEvent
    if (gameEvent) {
      setGameAction([gameEvent, pressTime])
    }
  }

  document.addEventListener('keydown', keydownHandler)

  function removeKeyboardListener() {
    document.removeEventListener('keydown', keydownHandler)
  }

  return removeKeyboardListener
}
