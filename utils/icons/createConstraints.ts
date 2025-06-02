import type { IconConstraints } from './types'
import { BaseConfig, Resolution, Size } from './consts'

export function createConstraints(resolution: Resolution): IconConstraints {
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
