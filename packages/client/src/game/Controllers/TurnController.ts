export default class TurnController {
  constructor({map, statistic}){
    this.map = map;
    this.hero = this.map.hero;
    this.statistic = statistic;
  }
  hero: {cell:''}
  turn(direction) {
    const heroCell = await this.heroMove()
    await this.monstersMove(heroCell)
  }
  async heroMove(direction) {
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
  }
}
