import { IconConstraints, Color, OS as OS_T } from './types'
import MacOSIcon from '@/public/apple-logo.svg'
import Windows11Icon from '@/public/windows-11-logo.svg'

export const OS: { value: OS_T; label: string; icon: string }[] = [
   {
      value: 'mac-os',
      label: 'macOS',
      icon: MacOSIcon,
   },
   {
      value: 'windows-11',
      label: 'Windows 11',
      icon: Windows11Icon,
   },
]

type ColorWithLabel = {
   value: Color
   label: string
}

export const MACOS_COLORS: ColorWithLabel[] = [
   {
      value: 'mac-os-default-dark',
      label: 'Default Dark',
   },
   {
      value: 'mac-os-default-light',
      label: 'Default Light',
   },
   {
      value: 'mac-os-green',
      label: 'Green',
   },
   {
      value: 'mac-os-lime',
      label: 'Lime',
   },
   {
      value: 'mac-os-yellow',
      label: 'Yellow',
   },
   {
      value: 'mac-os-orange',
      label: 'Orange',
   },
   {
      value: 'mac-os-red',
      label: 'Red',
   },
   {
      value: 'mac-os-purple',
      label: 'Purple',
   },
   {
      value: 'mac-os-gray',
      label: 'Gray',
   },
   {
      value: 'mac-os-black',
      label: 'Black',
   },
]

export const WINDOWS_COLORS: ColorWithLabel[] = [
   {
      value: 'windows-11-default',
      label: 'Default',
   },
   {
      value: 'windows-11-pink',
      label: 'Pink',
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
   'mac-os-default-dark': {
      red: 51,
      green: 157,
      blue: 224,
   },
   'mac-os-default-light': {
      red: 63,
      green: 170,
      blue: 230,
   },
   'mac-os-green': {
      red: 24,
      green: 171,
      blue: 104,
   },
   'mac-os-lime': {
      red: 58,
      green: 173,
      blue: 75,
   },
   'mac-os-yellow': {
      red: 202,
      green: 164,
      blue: 27,
   },
   'mac-os-orange': {
      red: 205,
      green: 111,
      blue: 4,
   },
   'mac-os-red': {
      red: 206,
      green: 45,
      blue: 36,
   },
   'mac-os-purple': {
      red: 131,
      green: 63,
      blue: 157,
   },
   'mac-os-gray': {
      red: 102,
      green: 102,
      blue: 102,
   },
   'mac-os-black': {
      red: 17,
      green: 17,
      blue: 17,
   },
   'windows-11-default': {
      red: 180,
      green: 126,
      blue: 1,
   },
   'windows-11-pink': {
      red: 201,
      green: 84,
      blue: 122,
   },
}

export const ShadowColor: Record<Color, string> = {
   'windows-11-default': '#ffdd7b',
   'windows-11-pink': '#f8a5c2',
   'mac-os-default-dark': '#97D8FC',
   'mac-os-default-light': '#97D8FC',
   'mac-os-green': '#91E2BC',
   'mac-os-lime': '#99EAA4',
   'mac-os-yellow': '#F4DA86',
   'mac-os-orange': '#F1C287',
   'mac-os-red': '#F89B97',
   'mac-os-purple': '#CF9BE3',
   'mac-os-gray': '#C2C2C2',
   'mac-os-black': '#5F5F5F',
}

export const SHADOW_SIZE = 3
