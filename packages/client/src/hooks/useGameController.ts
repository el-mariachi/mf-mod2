import { GameEvent, GameAction } from '@type/game'

export type GameActionType = [GameEvent, number, () => void]

const KeysToGameEvents: { [key: string]: GameEvent } = {
  ArrowLeft: GameEvent.Left,
  ArrowRight: GameEvent.Right,
  ArrowUp: GameEvent.Up,
  ArrowDown: GameEvent.Down,
  A: GameEvent.Left,
  Ф: GameEvent.Left,
  D: GameEvent.Right,
  В: GameEvent.Right,
  W: GameEvent.Up,
  Ц: GameEvent.Up,
  S: GameEvent.Down,
  Ы: GameEvent.Down,
  P: GameEvent.Pause,
  З: GameEvent.Pause,
  R: GameEvent.Restart,
  К: GameEvent.Restart,
  I: GameEvent.Inventory,
  Ш: GameEvent.Inventory,
  C: GameEvent.CharacterInfo,
  С: GameEvent.CharacterInfo,
  Q: GameEvent.Exit,
  Й: GameEvent.Exit,
  F: GameEvent.Fullscreen,
  А: GameEvent.Fullscreen,
}

export const useGameController = (
  setGameAction: React.Dispatch<React.SetStateAction<GameAction>>
) => {
  function keydownHandler(e: KeyboardEvent) {
    const pressTime = Date.now()
    const gameEvent = (KeysToGameEvents[e.key] ||
      KeysToGameEvents[e.key.toUpperCase()]) as GameEvent
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
