import { loadImage } from '@/utils/load-image'
import { Config } from './types'
import { IconColor } from '@/utils/icons/consts'

export async function createIcon(
   icon: HTMLImageElement,
   width: number,
   height: number,
   config: Config
) {
   const canvas = document.createElement('canvas')
   const ctx = canvas.getContext('2d')

   canvas.width = width
   canvas.height = height
   ctx!.drawImage(icon, 0, 0, width, height)
   const iconImgData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
   const data = iconImgData.data

   if (config.adjustColor) {
      for (var i = 0; i < data.length; i += 4) {
         data[i] = IconColor[config.theme].red
         data[i + 1] = IconColor[config.theme].green
         data[i + 2] = IconColor[config.theme].blue

         if (data[i + 3] > 100) {
            data[i + 3] = 255
         }
      }
   }

   ctx!.putImageData(iconImgData, 0, 0)
   return loadImage(canvas.toDataURL('image/png'))
}
