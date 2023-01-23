import { useState } from 'react'

const PRESS_DELAY = 500

export enum GameEvent {
  Left = 'MOVE_LEFT',
  Right = 'MOVE_RIGHT',
  Up = 'MOVE_UP',
  Down = 'MOVE_DOWN',
  Fullscreen = 'FULLSCREEN',
  Pause = 'PAUSE',
  Escape = 'ESCAPE',
  Mute = 'MUTE',
  Resume = 'RESUME',
}

export type GameActionType = [GameEvent, number, ()=>void]

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

export const useGameController = () => {
  const [gameEvent, setGameEvent]: [
    GameEvent,
    React.Dispatch<React.SetStateAction<GameEvent>>
  ] = useState('' as GameEvent)
  let startTime = Date.now()
  let timerId: ReturnType<typeof setTimeout>

  function keydownHandler(e: KeyboardEvent) {
    const pressTime = Date.now()
    /**  Откладываем событие если между ними прошло времени меньше чем PRESS_DELAY (в случае key.repeat)*/
    if (pressTime - startTime < PRESS_DELAY) {
      if (timerId) {
        timerId = setTimeout(() => {
          keydownHandler(e)
          clearTimeout(timerId)
        }, pressTime - startTime)
      }
    } else {
      setGameEvent(KeysToGameEvents[e.key])
      startTime = pressTime
    }
  }

  document.addEventListener('keydown', keydownHandler)

  function removeKeyboardListener() {
    document.removeEventListener('keydown', keydownHandler)
  }
  const gameAction: GameActionType = [gameEvent, Date.now(), removeKeyboardListener]

  return gameAction
}
