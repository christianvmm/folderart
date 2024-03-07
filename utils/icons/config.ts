import { base } from '@/consts'
import type { IconConstraints, Theme } from './types'
import { BaseConfig, FolderImage, Resolution, Size } from './consts'

export function getFolder(resolution: Resolution, theme: Theme) {
   return `${base}/resources/folders/${theme}/${FolderImage[resolution]}.png`
}

export function createConfig(resolution: Resolution): IconConstraints {
   if (resolution === Resolution.Retina512) {
      return BaseConfig
   }

   const factor = Size[resolution] / Size[Resolution.Retina512]

   let resizedConfig = {} as IconConstraints

   Object.entries(BaseConfig).forEach(([key, value]) => {
      resizedConfig[key as keyof IconConstraints] = value * factor
   })

   return resizedConfig
}
