import * as Types from '@game/core/types'
import minecraftFont from '@fonts/minecraft-regular.woff2'
//@import '@fonts/minecraft/minecraft.css';

export const MAP_CELL = 32
export const SPRITE_SIZE: Types.Size = [MAP_CELL, MAP_CELL]

export const STEP_TIME = 1000
export const DEF_FRAME_PER_SECOND_SPEED = 7
export const DEF_MOVE_DURATION = 500
export const HERO_MOVE_DELAY = 10

// TODO это константы сайта

export const BG_COLOR = '#260a13'

export const COLOR_YELLOW = '#e69e61'
export const COLOR_WHITE = '#e7d8c3'
export const COLOR_PURPLE_LIGHT = '#9d5e6e'
export const CAPTION_FONT_COLOR = COLOR_YELLOW
export const TXT_FONT_LIGHT_COLOR = COLOR_WHITE
export const TXT_FONT_COLOR = COLOR_PURPLE_LIGHT

// console.log('minecraftFont', minecraftFont);

export const FONT_MINECRAFT_REGULAR = new FontFace(
  'Minecraft',
  'url(/src/assets/fonts/minecraft/minecraft-regular.woff2)',
  {
    style: 'normal',
    weight: '400',
  }
)
export const FONT_MINECRAFT_BOLD = new FontFace(
  'MinecraftBold',
  'url(/src/assets/fonts/minecraft/minecraft-bold.woff2)',
  {
    style: 'normal',
    weight: '700',
  }
)
export const MINECRAFT_FONTS = [FONT_MINECRAFT_REGULAR, FONT_MINECRAFT_BOLD]

// E69E61 yellow
// E7D8C3 kinda white

// TODO need refactoring for motions/behaviors types
export const motionTypes: Types.MotionTypes = {
  ...Types.IdleMotionType,
  ...Types.MoveMotionType,
  ...Types.AttackMotionType,
  ...Types.DeathMotionType,
  ...Types.DamageMotionType,
  ...Types.TurnMotionType,
  ...Types.UnspecifiedMotionType,
}
