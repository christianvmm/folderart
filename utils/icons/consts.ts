import { IconConstraints, Theme } from './types'

export enum Resolution {
   NonRetina16 = 0,
   Retina16 = 1,
   NonRetina32 = 2,
   Retina32 = 3,
   NonRetina128 = 4,
   Retina128 = 5,
   NonRetina256 = 6,
   Retina256 = 7,
   NonRetina512 = 8,
   Retina512 = 9,
}


export const Size: Record<Resolution, number> = {
   [Resolution.NonRetina16]: 16,
   [Resolution.Retina16]: 32,
   [Resolution.NonRetina32]: 32,
   [Resolution.Retina32]: 64,
   [Resolution.NonRetina128]: 128,
   [Resolution.Retina128]: 256,
   [Resolution.NonRetina256]: 256,
   [Resolution.Retina256]: 512,
   [Resolution.NonRetina512]: 512,
   [Resolution.Retina512]: 1024,
}

export const BaseConfig: IconConstraints = {
   maxWidth: 768,
   maxHeight: 384,
   preferredSize: 384,
   folderAreaHeight: 604,
   startY: 258,
}

export let IconColor: Record<
   Theme,
   { red: number; green: number; blue: number }
> = {
   dark: {
      red: 240,
      green: 175,
      blue: 25,
   }
}

function updateIconColor(red: number, green: number, blue: number) {
   IconColor.dark.red = red
   IconColor.dark.green = green
   IconColor.dark.blue = blue
}

export const ICON_SHADOW_SIZE = 8
export const ICON_SHADOW_COLOR = '#44444444'

export { updateIconColor }