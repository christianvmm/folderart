import { IconConstraints, Color } from './types'

export const COLORS: { value: Color; label: string }[] = [
   {
      value: 'default-dark',
      label: 'Default Dark',
   },
   {
      value: 'default-light',
      label: 'Default Light',
   },
   {
      value: 'green',
      label: 'Green',
   },
   {
      value: 'lime',
      label: 'Lime',
   },
   {
      value: 'yellow',
      label: 'Yellow',
   },
   {
      value: 'orange',
      label: 'Orange',
   },
   {
      value: 'red',
      label: 'Red',
   },
   {
      value: 'purple',
      label: 'Purple',
   },
   {
      value: 'gray',
      label: 'Gray',
   },
   {
      value: 'black',
      label: 'Black',
   },
]

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

type RGB = { red: number; green: number; blue: number }

export const IconColor: Record<Color, RGB> = {
   'default-dark': {
      red: 51,
      green: 157,
      blue: 224,
   },
   'default-light': {
      red: 63,
      green: 170,
      blue: 230,
   },
   green: {
      red: 24,
      green: 171,
      blue: 104,
   },
   lime: {
      red: 58,
      green: 173,
      blue: 75,
   },
   yellow: {
      red: 202,
      green: 164,
      blue: 27,
   },
   orange: {
      red: 205,
      green: 111,
      blue: 4,
   },
   red: {
      red: 206,
      green: 45,
      blue: 36,
   },
   purple: {
      red: 131,
      green: 63,
      blue: 157,
   },
   gray: {
      red: 102,
      green: 102,
      blue: 102,
   },
   black: {
      red: 17,
      green: 17,
      blue: 17,
   },
}

export const ShadowColor: Record<Color, string> = {
   'default-dark': '#97D8FC',
   'default-light': '#97D8FC',
   green: '#91E2BC',
   lime: '#99EAA4',
   yellow: '#F4DA86',
   orange: '#F1C287',
   red: '#F89B97',
   purple: '#CF9BE3',
   gray: '#C2C2C2',
   black: '#5F5F5F',
}

export const SHADOW_SIZE = 3
