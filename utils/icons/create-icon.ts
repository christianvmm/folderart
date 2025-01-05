import { loadImage } from '@/utils/load-image'
import { Config } from './types'
import { IconColor } from '@/utils/icons/consts'

export async function createIcon(
   icon: HTMLImageElement,
   width: number,
   height: number,
   config: Config
): Promise<HTMLImageElement> {
   const canvas = document.createElement('canvas')
   const ctx = canvas.getContext('2d')
   canvas.width = width
   canvas.height = height

   if (!ctx) {
      throw new Error()
   }

   ctx.drawImage(icon, 0, 0, width, height)
   const iconImgData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
   const data = iconImgData.data

   if (config.adjustColor) {
      const COLOR = IconColor[config.color]

      for (let i = 0; i < data.length; i += 4) {
         data[i] = COLOR.red
         data[i + 1] = COLOR.green
         data[i + 2] = COLOR.blue

         if (data[i + 3] > 100) {
            data[i + 3] = 255
         }
      }
   }

   ctx.putImageData(iconImgData, 0, 0)

   return loadImage(canvas.toDataURL('image/png'))
}
