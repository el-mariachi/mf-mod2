import _default from 'react-bootstrap/esm/Alert'
// import GameObjectView from './views/GameObjectView'

export type Coords = [number, number]
export type CoordsSpeed = [number, number]
export type Size = [number, number]
export type Geometry = {
  position: Coords
  size: Size
}
export enum Axis {
  vertical = 'vertical',
  horizontal = 'horizontal',
}
export enum AxisDirection {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}
export type Direction = [
  AxisDirection.top | AxisDirection.bottom | null,
  AxisDirection.left | AxisDirection.right | null
]
export type AxisVector = {
  direction: AxisDirection | Axis
  length: number
}

export enum Rotation {
  topRight = 'topRight',
  rightBottom = 'rightBottom',
  bottomLeft = 'bottomLeft',
  leftTop = 'leftTop',
  topLeft = 'topLeft',
  leftBottom = 'leftBottom',
  bottomRight = 'bottomRight',
  rightTop = 'rightTop',
  leftRight = 'leftRight',
  topBottom = 'topBottom',
  rightLeft = 'rightLeft',
  bottomTop = 'bottomTop',
  aroundClockwise = 'aroundClockwise',
  aroundCounterClockwise = 'aroundCounterClockwise',
}

export type SpriteGeometry = Geometry & {
  origin: Geometry | null
}
export type SpriteAtlas = HTMLImageElement

export interface DrawableOnCanvas {
  [x: string]: any
  canvas: CanvasRenderingContext2D
  position: Coords
  size: Size
  toggle(flag?: boolean): void
  render(): void
}
export interface AnimatableOnCanvas extends DrawableOnCanvas {
  update(dt: number): void
}

export type AnimationMotionParams = {
  origin: Geometry
  frames: number[]
  axis?: Axis
}
export type SpriteAnimationParams = {
  to?: AxisVector | Coords
  easing?: 'linear'
  duration?: number
  playMotion?: {
    motion: MotionType | AnimationMotionParams
    speed?: number // frames per second
    once?: boolean
  }
}
export type SpriteAnimationProcessResult = {
  params: SpriteAnimationParams | null
  reason: 'end' | 'cancel'
}
export type SpriteAnimationProcess = Promise<SpriteAnimationProcessResult>

export type CellGeometry = {
  position: Coords
}
export type CellAnimationMotionParams = {
  originPosition: Coords
  frames: number[]
}
export type CellSpriteGeometry = {
  position: Coords
  originPosition: Coords | null
}
export type CellSpriteAnimationParams = SpriteAnimationParams & {
  playMotion?: SpriteAnimationParams['playMotion'] & {
    motion: MotionType | CellAnimationMotionParams
  }
}
export type CellSpriteAnimationProcessResult = {
  params: CellSpriteAnimationParams | null
  reason: 'end' | 'cancel'
}
export type CellSpriteAnimationProcess =
  Promise<CellSpriteAnimationProcessResult>

// TODO need refactoring for motions/behaviors types
export enum IdleMotionType {
  idle = 'idle',
  look2top = 'look2top',
  look2right = 'look2right',
  look2bottom = 'look2bottom',
  look2left = 'look2left',
}
export enum MoveMotionType {
  move = 'move',
  move2top = 'move2top',
  move2right = 'move2right',
  move2bottom = 'move2bottom',
  move2left = 'move2left',
}
export enum AttackMotionType {
  attack = 'attack',
  attack2top = 'attack2top',
  attack2right = 'attack2right',
  attack2bottom = 'attack2bottom',
  attack2left = 'attack2left',
}
export enum DeathMotionType {
  death = 'death',
  deathFromTop = 'deathFromTop',
  deathFromRight = 'deathFromRight',
  deathFromBottom = 'deathFromBottom',
  deathFromLeft = 'deathFromLeft',
}
export enum DamageMotionType {
  damage = 'damage',
  damageFromTop = 'damageFromTop',
  damageFromRight = 'damageFromRight',
  damageFromBottom = 'damageFromBottom',
  damageFromLeft = 'damageFromLeft',
}
export enum TurnMotionType {
  turn = 'turn',
  turnTopRight = 'turnTopRight',
  turnRightBottom = 'turnRightBottom',
  turnBottomLeft = 'turnBottomLeft',
  turnLeftTop = 'turnLeftTop',
  turnTopLeft = 'turnTopLeft',
  turnLeftBottom = 'turnLeftBottom',
  turnBottomRight = 'turnBottomRight',
  turnRightTop = 'turnRightTop',
  turnLeftRight = 'turnLeftRight',
  turnTopBottom = 'turnTopBottom',
  turnRightLeft = 'turnRightLeft',
  turnBottomTop = 'turnBottomTop',
  turnAroundClockwise = 'turnAroundClockwise',
  turnAroundCounterclockwise = 'turnAroundCounterclockwise',
}
export enum UnspecifiedMotionType {
  none = 'none',
  custom = 'custom',
  blow = 'blow',
  open = 'open',
}
export type MotionTypes = typeof IdleMotionType &
  typeof MoveMotionType &
  typeof AttackMotionType &
  typeof DeathMotionType &
  typeof DamageMotionType &
  typeof TurnMotionType &
  typeof UnspecifiedMotionType
export type MotionType = keyof MotionTypes

export type SpriteMotions = Record<MotionType, AnimationMotionParams>
export type CellSpriteMotions = Record<MotionType, CellAnimationMotionParams>

export type UnitBehaviorDef = {
  type:
    | IdleMotionType.idle
    | MoveMotionType.move
    | AttackMotionType.attack
    | DamageMotionType.damage
    | DeathMotionType.death
    | TurnMotionType.turn
    | Exclude<keyof typeof UnspecifiedMotionType, 'custom'>
  dir?: AxisDirection | Rotation
}

export enum GameUnitName {
  hero = 'hero',
  skeleton = 'skeleton',
}
export enum GameItemName {
  coin = 'coin',
  key = 'key',
  chest = 'chest',
  bottle = 'bottle',
}

export enum GameEntourageName {
  wall = 'wall',
  gate = 'gate',
}

export type GameObjectName = GameUnitName | GameItemName | GameEntourageName

// export type GameObjectViewFactory<
//   ViewType extends GameObjectView = GameObjectView
// > = (
//   ctx: CanvasRenderingContext2D,
//   objectName: GameUnitName | GameItemName,
//   position: Coords,
//   initBehavior?: UnitBehaviorDef
// ) => ViewType
export type Path = Coords[]
export enum PathDirection {
  forward = 'forward',
  back = 'back',
  clockwise = 'clockwise',
  counterClockwise = 'counterClockwise',
}
export type Area = [Coords, Coords] // square selection from point to point

export type GameAction = [GameEvent, number]
export enum GameEvent {
  None = 'NONE',
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
export const MapGameEvents2Direction = {
  [GameEvent.Left]: AxisDirection.left,
  [GameEvent.Right]: AxisDirection.right,
  [GameEvent.Up]: AxisDirection.top,
  [GameEvent.Down]: AxisDirection.bottom,
}
export const MoveGameEvents = [
  GameEvent.Left,
  GameEvent.Right,
  GameEvent.Up,
  GameEvent.Down,
]

export enum GameInteractionType {
  none = 'none',
  movement = 'movement', // move, attack, etc from UnitBehaviorDef.type
  collect = 'collect',
  open = 'open',
  // ...
}
// TODO type fields list in draft
export type GameInteractionDef = {
  type: GameInteractionType
  position?: Coords
  result?: unknown
  subject?: GameUnitName
  object?: GameItemName | GameEntourageName
  behavior?: UnitBehaviorDef
  animation?: CellSpriteAnimationProcessResult
}

// TODO r next types temporary ?
export interface GameObjectDef {
  name: GameObjectName
  crossable: boolean
  destroyable: boolean
  cell: LevelMapCell
}
export type LevelMapCell = {
  position: Coords
  gameObjects: GameObjectDef[]
}
export type LevelMap = LevelMapCell[][]
export interface MonsterUnit {}
export interface CollectableItem {}
