import { defaultMapSize } from '@constants/game'

let width: number
let height: number

if (RENDERED_ON_SERVER) {
  width = defaultMapSize.width
  height = defaultMapSize.height
} else {
  width = window.innerWidth
  height = window.innerHeight
}

export { width, height }

export const center = {
  width: Math.floor(width / 2),
  height: Math.floor(height / 2),
}
