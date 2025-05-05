import { Color, OS } from './types'

export function getIconPath(icon: string) {
   return `/icons/${icon}.svg`
}

export function getFolderPath(os: OS, color: Color) {
   return `folders/${os}/${color}.png`
}
