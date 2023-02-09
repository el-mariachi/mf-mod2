import GameObject from '@game/Objects/GameObject'
import MapController, { Cell } from './MapController'
import * as Types from '@game/core/types'

export default class LifeController {
  map: MapController['map']
  cells: MapController['cells']
  constructor(mapController: MapController, statistic = null) {
    this.map = mapController.map
    this.cells = mapController.cells
  }
  turn(direction: Types.AxisDirection) {
    const radius = 1
    const hero = this.cells.hero
    const heroCell = this.cells.heroCell
    const targetCells = this.map.nearbyCells(
      heroCell,
      radius,
      direction
    ) as Cell[]

    heroCell.remove(hero)
    this.moveToCell(this.cells.hero, targetCells[0])
  }
  async moveToCell(gameObject: GameObject, cell: Cell) {
    const [row, col] = cell.position
    if (cell.gameObjects.length === 0) {
      this.map[row][col].push(gameObject)
      console.log(this.map)
    } else {
      for (const cellObject of cell.gameObjects) {
        await this.interaction(gameObject, cellObject)
      }
    }
  }
  async interaction(
    gameObjectActive: GameObject,
    gameObjectPasive: GameObject
  ) {}
  /*  async heroMove(direction) {
    const heroCell = this.hero.cell;
    const nearbyCells = map.getNearbyCell(heroCell, direction)
    nearbyCells.entities.forEach(entity=> {
      if(entity.type === 'monster'){
        this.hero.atack(entity);
      }else if(entity.uncrossable === true){
        // sound beep
        return
      }else{
        await this.hero.moveToCell(adjacentCell)
      }
    })
    return adjacentCell;
  }
  monsterMove(heroCell) {
    map.monsters.forEach(monster=> {
      if(map.cellsIsNearby(this.hero.cell, monster.cell)) {
        monster.atack(this.hero.cell) ||
        monster.moveToCell(this.hero.cell)
      }else{
        monster.moveRandom()
      }
    })
  }*/
}
