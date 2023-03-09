export const BG_COLOR = '#25141a'
export const COLOR_YELLOW = '#e69e61'
export const COLOR_ALMOST_WHITE = '#e7d8c3'
export const COLOR_PURPLE = '#653e69'
export const COLOR_DARK_PURPLE = '#251320'
export const COLOR_DIRTY_PINK = '#9e6274'
export const COLOR_DARK_DIRTY_PINK = '#683e48'

let FONT_MINECRAFT_REGULAR
let FONT_MINECRAFT_BOLD
if (RENDERED_ON_SERVER) {
  FONT_MINECRAFT_REGULAR = true
  FONT_MINECRAFT_BOLD = true
} else {
  FONT_MINECRAFT_REGULAR = new FontFace(
    'Minecraft',
    'url(/src/assets/fonts/minecraft/minecraft-regular.woff2)',
    {
      style: 'normal',
      weight: '400',
    }
  )
  FONT_MINECRAFT_BOLD = new FontFace(
    'MinecraftBold',
    'url(/src/assets/fonts/minecraft/minecraft-bold.woff2)',
    {
      style: 'normal',
      weight: '700',
    }
  )
}
export const MINECRAFT_FONTS = [FONT_MINECRAFT_REGULAR, FONT_MINECRAFT_BOLD]

export const appThemeDefault = {
  active: 'default',
  switch: (theme: string) => {
    appThemeDefault.active = theme
  },
  list: ['default'],
}
