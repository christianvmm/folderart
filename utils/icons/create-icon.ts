import { Canvas, Image } from '@napi-rs/canvas'
import { Config } from './types'
import { IconColor } from '@/utils/icons/consts'

export async function createIcon(
   iconImage: Image,
   width: number,
   height: number,
   config: {
      theme: Config['theme']
      adjustColor: Config['adjustColor']
   }
) {
   const canvas = new Canvas(width, height)
   const ctx = canvas.getContext('2d')
   ctx.drawImage(iconImage, 0, 0, width, height)

   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
   const data = imageData.data

   if (config.adjustColor) {
      for (var i = 0; i < data.length; i += 4) {
         data[i] = IconColor[config.theme].red
         data[i + 1] = IconColor[config.theme].green
         data[i + 2] = IconColor[config.theme].blue

         // avoid transparency
         if (data[i + 3] > 100) {
            data[i + 3] = 255
         }
      }
   }

   ctx.putImageData(imageData, 0, 0)
   return canvas.toBuffer('image/png')
}
