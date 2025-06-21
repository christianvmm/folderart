import { Variant, IconType, Config } from '../types'
import MacOSIcon from '@/public/apple-logo.svg'
import Windows11Icon from '@/public/windows-11-logo.svg'

type Default = Pick<Config, 'iconType' | 'variant'>

export const defaultMacOs: Default = {
   iconType: 'mac-os',
   variant: 'mac-os-default-dark',
}

export const defaultWindows: Default = {
   iconType: 'windows-11',
   variant: 'windows-11-default',
}

export const OS_OPTIONS: { value: string; label: string; icon: string }[] = [
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
] as const

export type VariantItem = {
   iconType: IconType
   value: Variant
   label: string
}

export const MACOS_VARIANTS: VariantItem[] = [
   {
      iconType: 'mac-os',
      value: 'mac-os-default-dark',
      label: 'Default Dark',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-default-light',
      label: 'Default Light',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-green',
      label: 'Green',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-lime',
      label: 'Lime',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-yellow',
      label: 'Yellow',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-orange',
      label: 'Orange',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-red',
      label: 'Red',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-purple',
      label: 'Purple',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-gray',
      label: 'Gray',
   },
   {
      iconType: 'mac-os',
      value: 'mac-os-black',
      label: 'Black',
   },
   {
      iconType: 'mac-os-hd',
      value: 'mac-os-hd-removable',
      label: 'Hard Drive Removable',
   },
   {
      iconType: 'mac-os-hd',
      value: 'mac-os-hd-external',
      label: 'Hard Drive External',
   },
   {
      iconType: 'mac-os-flat-drive',
      value: 'mac-os-time-machine',
      label: 'Time Machine',
   },
   {
      iconType: 'mac-os-flat-drive',
      value: 'mac-os-file-server',
      label: 'File Server',
   },
]

export const WINDOWS_OPTIONS: VariantItem[] = [
   {
      iconType: 'windows-11',
      value: 'windows-11-default',
      label: 'Default',
   },
   {
      iconType: 'windows-11',
      value: 'windows-11-pink',
      label: 'Pink',
   },
]

type RGB = { red: number; green: number; blue: number }

export const IconColor: Record<Variant, RGB> = {
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
   'mac-os-hd-removable': {
      red: 40,
      green: 40,
      blue: 40,
   },
   'mac-os-hd-external': {
      red: 70,
      green: 50,
      blue: 54,
   },
   'mac-os-time-machine': {
      red: 13,
      green: 80,
      blue: 77,
   },
   'mac-os-file-server': {
      red: 35,
      green: 53,
      blue: 74,
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

export const ShadowColor: Record<Variant, string> = {
   'windows-11-default': '#ffdd7b',
   'windows-11-pink': '#f8a5c2',
   'mac-os-default-dark': '#97D8FC',
   'mac-os-default-light': '#97D8FC',
   'mac-os-hd-removable': '#000000',
   'mac-os-hd-external': '#241b1d',
   'mac-os-time-machine': '#082b2a',
   'mac-os-file-server': '#241b1d',
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
