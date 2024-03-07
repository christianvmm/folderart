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

export const resolutions: Resolution[] = [
   Resolution.NonRetina16,
   Resolution.Retina16,
   Resolution.NonRetina32,
   Resolution.Retina32,
   Resolution.NonRetina128,
   Resolution.Retina128,
   Resolution.NonRetina256,
   Resolution.Retina256,
   Resolution.NonRetina512,
   Resolution.Retina512,
]

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

export const FolderImage: Record<Resolution, string> = {
   [Resolution.NonRetina16]: 'icon_16x16',
   [Resolution.Retina16]: 'icon_16x16@2x',
   [Resolution.NonRetina32]: 'icon_32x32',
   [Resolution.Retina32]: 'icon_32x32@2x',
   [Resolution.NonRetina128]: 'icon_128x128',
   [Resolution.Retina128]: 'icon_128x128@2x',
   [Resolution.NonRetina256]: 'icon_256x256',
   [Resolution.Retina256]: 'icon_256x256@2x',
   [Resolution.NonRetina512]: 'icon_512x512',
   [Resolution.Retina512]: 'icon_512x512@2x',
}

export const IconColor: Record<
   Theme,
   { red: number; green: number; blue: number }
> = {
   dark: {
      red: 51,
      green: 157,
      blue: 224,
   },
   light: {
      red: 63,
      green: 170,
      blue: 230,
   },
}

export const ICON_SHADOW_SIZE = 3
export const ICON_SHADOW_COLOR = '#97D8FC'