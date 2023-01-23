export enum GameObjectType {
  hero = 'HERO',
  monster = 'MONSTER',
  item = 'ITEM',
}

export type CoordinateType = {
  x: number,
  y: number
}

export type SizeType = {
  width : number,
  height: number
}

export type SpriteDirectin = 'verical' | 'horizontal'


export type Sprite = {
  position : CoordinateType;
  size : SizeType;
  speed? : number;
  frames? : number[];
  _index? : number;
  url : string;
  dir? : SpriteDirectin;
  once? : boolean;
}


export default class GameObject {
  name = ''
  type = GameObjectType.item
  crossable = false
  static = true
  animated = false
  destroyable = false
  sprite! : Sprite
}
