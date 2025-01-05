import { Color } from './types'

export function getIconPath(icon: string) {
   return `/icons/${icon}.svg`
}

export function getFolderPath(color: Color) {
   return `folders/${color}.png`
}
