// TODO decent resources manager will work out with TS-111

import heroSprite from '@sprites/knight.png'
import skeletonSprite from '@sprites/skeleton.png'
import tilesetSprite from '@sprites/tileset.png'
import itemsSprite from '@sprites/items.png'
import uiSprite from '@sprites/ui.png'

import chestIcn from '@images/chest_icn.png'
import clockIcn from '@images/clock_icn.png'
import coinIcn from '@images/coin_icn.png'
import deathIcn from '@images/death_icn.png'
import stepsIcn from '@images/steps_icn.png'
import joystickIcn from '@images/joystick_icn.png'
import scrollIcn from '@images/scroll_icn.png'

import knightImg from '@images/knight.png'
import knightHeadImg from '@images/knight-head.png'

const images = [
  heroSprite,
  skeletonSprite,
  tilesetSprite,
  itemsSprite,
  uiSprite,
  chestIcn,
  clockIcn,
  coinIcn,
  deathIcn,
  stepsIcn,
  joystickIcn,
  scrollIcn,
  knightImg,
  knightHeadImg,
]

export default new (class {
  images: Record<string, HTMLImageElement> = {}
  load() {
    return images.map(src => {
      return new Promise<void>(res => {
        const img = new Image()
        const name = src.replace(/^.+?(\w+)\.\w+$/, '$1')
        img.src = src
        img.onload = () => {
          res()
        }
        this.images[name] = img
      })
    })
  }
})()
