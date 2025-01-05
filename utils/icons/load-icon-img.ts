import { getIconPath } from '@/utils/icons/common'
import { Config } from '@/utils/icons/types'
import { loadImage } from '@/utils/load-image'

export async function loadIconImg(icon: Config['icon']): Promise<HTMLImageElement | null> {
   const isDefaultIcon = typeof icon === 'string' && icon.length

   if (isDefaultIcon) {
      return await loadImage(getIconPath(icon))
   } else if (icon instanceof File) {
      return await loadImage(URL.createObjectURL(icon))
   } else {
      return null
   }
}
