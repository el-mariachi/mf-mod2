
import { Coords, LevelMap, Path, UnitBehaviorDef } from "@game/core/types";
// TODO не должно быть моков 

import { doNothing, move2bottom } from "@game/animations/behavior"
import UnitAI from "@game/core/AI/UnitAI";
import Skeleton from "@game/Objects/Skeleton";
import { subtractCoords, addCoords } from "@game/utils";
import Hero from "@game/Objects/Hero";

export default class PatrolMonsterAI extends UnitAI {
  protected _goal!:Coords
  constructor (
    levelMap:LevelMap,    
    monster: Skeleton,
    public patrolPath:Path,
    public viewArea:number = 3)
  {
    super(levelMap, monster)
    // GameUnitName
    // 

    this._goal = this._position
    /* 

    viewAreaRange = по гризонтали и вертикали
    unit.position 

    TODO разные координаты позиции и клеток? 
    */

    // const areaFrom = subtractCoords(this._position, [this.viewArea, this.viewArea])
    // const areaTo = addCoords(this._position, [this.viewArea, this.viewArea])

    // const [fromCol, frowRow] = areaFrom
    // const [toCol, toRow] = areaTo

    // // TODO поверять границы, когда вызодим за карту

    // // const areaLength = this.viewArea*2+1
    // for (let row = frowRow; row <= toRow; row++) {
    //   for (let col = fromCol; col <= toCol; col++) {
    //     const cell = levelMap[row][col]

    //     const hero = cell.gameObjects.find(item => item instanceof Hero)

        
    //   }
    // }
  }
  protected get _position(){
    return this._monster.view.position
  }
  /*
  VIEW_AREA
  */
  makeDecision()
  {
    return move2bottom
    // return doNothing
  }
  
}
