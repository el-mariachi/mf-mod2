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
export type AxisVector = {
  direction: AxisDirection | Axis
  length: number
}

export type SpriteGeometry = Geometry & {
  origin: Geometry | null
}
export type SpriteAtlas = HTMLImageElement

export interface AnimatableOnCanvas {
  canvas: CanvasRenderingContext2D
  update(dt: number): void
  render(): void
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

export type MotionTypes = typeof IdleMotionType &
  typeof MoveMotionType &
  typeof AttackMotionType &
  typeof DeathMotionType &
  typeof DamageMotionType &
  typeof TurnMotionType &
  typeof UnspecifiedMotionType
export type MotionType = keyof MotionTypes
export enum IdleMotionType {
  idle = 'idle',
  look2Top = 'look2Top',
  look2Right = 'look2Right',
  look2Bottom = 'look2Bottom',
  look2Left = 'look2Left',
}
export enum MoveMotionType {
  move = 'move',
  move2Top = 'move2Top',
  move2Right = 'move2Right',
  move2Bottom = 'move2Bottom',
  move2Left = 'move2Left',
}
export enum AttackMotionType {
  attack = 'attack',
  attack2Top = 'attack2Top',
  attack2Right = 'attack2Right',
  attack2Bottom = 'attack2Bottom',
  attack2Left = 'attack2Left',
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
export type SpriteMotions = Record<MotionType, AnimationMotionParams>
export type CellSpriteMotions = Record<MotionType, CellAnimationMotionParams>
