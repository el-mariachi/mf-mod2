import { MAP_CELL } from '@game/core/constants'
import skeletonSrc from '@sprites/skeleton.png'
import heroSrc from '@sprites/hero.png'
import itemsSrc from '@sprites/items.png'

const hero = new Image(MAP_CELL, MAP_CELL)
hero.src = heroSrc

const skeleton = new Image(MAP_CELL, MAP_CELL)
skeleton.src = skeletonSrc

const items = new Image(MAP_CELL, MAP_CELL)
items.src = itemsSrc

export default { hero, skeleton, items }
