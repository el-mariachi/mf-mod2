export type Coords = [number, number]
export type CoordsSpeed = [number, number]
export type Size = [number, number]
export type Geometry = {
  position: Coords
  size: Size
}
export type Path = Coords[]
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

export enum PathDirection {
  forward = 'forward',
  back = 'back',
  clockwise = 'clockwise',
  counterClockwise = 'counterClockwise',
}
export type Area = [Coords, Coords] // square selection from point to point

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
export enum DestructionMotionType {
  destruction = 'destruction',
  destructionFromTop = 'destructionFromTop',
  destructionFromRight = 'destructionFromRight',
  destructionFromBottom = 'destructionFromBottom',
  destructionFromLeft = 'destructionFromLeft',
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
  typeof DestructionMotionType &
  typeof DamageMotionType &
  typeof TurnMotionType &
  typeof UnspecifiedMotionType
export type MotionType = keyof MotionTypes
export type BehaviorMotion =
  | IdleMotionType.idle
  | MoveMotionType.move
  | AttackMotionType.attack
  | DamageMotionType.damage
  | DestructionMotionType.destruction
  | TurnMotionType.turn
  | Exclude<keyof typeof UnspecifiedMotionType, 'custom'>

export type SpriteMotions = Record<MotionType, AnimationMotionParams>
export type CellSpriteMotions = Record<MotionType, CellAnimationMotionParams>

export interface LevelMapCell {
  position: Coords
  gameObjects: GameObjectDef[]
  addObject(gameObject: GameObjectDef): GameObjectDef
  extract(gameObject: GameObjectDef): GameObjectDef
}
export type LevelMap = LevelMapCell[][]

// semantic aliases
export type BehaviorDef = BehaviorMotion
export type BehaviorAnimatedProcess = CellSpriteAnimationProcess
export type BehaviorAnimationParams = CellSpriteAnimationParams

export type ViewBehaviorDef = {
  type: BehaviorDef
  dir?: AxisDirection | Rotation
}

export interface GameObjectViewDef {
  position: Coords
  render(): void
  toggle(flag?: boolean): void
  update?(dt: number): void
  do?(behavior: ViewBehaviorDef): BehaviorAnimatedProcess
}
export interface GameObjectDef {
  name: GameObjectName
  crossable: boolean
  view: GameObjectViewDef
  cell: LevelMapCell
  remove(): GameObjectDef
}
export type AttackDef = {
  attacker: Attacker
  points: number
}

export type UnitBehaviorResult<
  Result = unknown,
  Process = BehaviorAnimatedProcess
> = {
  result: Result
  process: Process
}
export interface Unit extends GameObjectDef {
  get active(): boolean
  curBehavior: UnitBehaviorResult | null
}
// export type UnitBehavior = () => UnitBehaviorResult
export interface BehaviorDelegate<
  Object = unknown,
  Result = UnitBehaviorResult
> {
  with(target: Object): Result
}
export type MoveResult = UnitBehaviorResult
export type MoveBehavior = BehaviorDelegate<LevelMapCell, MoveResult>
export interface Movable extends Unit {
  moveDelegate: BehaviorDelegate<LevelMapCell>
  move?(target: LevelMapCell): UnitBehaviorResult
}
export type AttackResult = UnitBehaviorResult<AttackDef>
export type AttackBehavior = BehaviorDelegate<Destroyable, AttackResult>
export interface Attacker extends Unit {
  get strength(): number
  get criticalAttackChance(): number
  get criticalAttackLevel(): number
  attackDelegate: AttackBehavior
  attack?(target: Destroyable): AttackResult
}
export type DefendResult = UnitBehaviorResult<AttackDef>
export type DefendBehavior = BehaviorDelegate<AttackDef, DefendResult>
export interface Defendable extends Unit {
  get stamina(): number
  get successDefenceChance(): number
  get successDefenceLevel(): number
  defendDelegate: DefendBehavior
  defend?(attack: AttackDef): DefendResult
}
export type DamageResult = UnitBehaviorResult<boolean>
export type DamageBehavior = BehaviorDelegate<AttackDef, DamageResult>
export interface Destroyable extends Unit {
  health: number
  get healthMax(): number
  damageDelegate: DamageBehavior
  damage?(damage: AttackDef): DamageResult
}

export enum HeroClass {
  knight = 'knight',
  archer = 'archer',
  wizard = 'wizard',
}
export type UnitResource = {
  value: number
  max: number
  min?: number
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

export type BehaviorDecision = {
  subject: Unit
  behavior: BehaviorDef
  dir?: AxisDirection
  object?: GameObjectDef
  target?: LevelMapCell
}
export interface Ai {
  makeDecision(): BehaviorDecision
}
export interface Npc extends Unit {
  brain: Ai
}
export interface Monster extends Npc, Attacker {}
export interface Collectable extends GameObjectDef {}
export interface Unlockable extends GameObjectDef {}
export interface Warrior extends Movable, Attacker, Defendable, Destroyable {}
export interface Hero extends Unit, Warrior {
  name: GameUnitName.hero
  heroClass: HeroClass
  bag: GameObjectDef[]
  level: number
}

export enum GameInteractionType {
  none = 'none',
  battle = 'battle',
  collect = 'collect',
  unlock = 'unlock',
  finish = 'finish',
  // ...
}
export type GameInteractionDef<Result = unknown> = {
  type: GameInteractionType
  position?: Coords
  result?: Result
  subject?: GameObjectName
  object?: GameObjectName
  behavior?: BehaviorDef
  process?: BehaviorAnimatedProcess
}

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
