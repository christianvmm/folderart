import { Canvas, Color, Config, Context } from './types'
import { ShadowColor, ICON_SHADOW_SIZE, Resolution, Size, IconColor } from './consts'

export function getIconPath(icon: string) {
   return `/icons/${icon}.svg`
}

export function getFolderPath(color: Color) {
   return `folders/${color}.png`
}

export function drawIcon<Image extends HTMLImageElement>(
   canvas: Canvas,
   ctx: Context,
   icon: Image,
   width: number,
   height: number,
   config: Config
) {
   ctx!.drawImage(icon, 0, 0, width, height)
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
}

export function drawFolderArt<Image extends HTMLImageElement>(
   ctx: Context,
   folder: Image,
   icon: Image,
   x: number,
   y: number,
   width: number,
   height: number,
   resolution: Resolution,
   color: Color
) {
   const size = Size[resolution]
   ctx.drawImage(folder, 0, 0, size, size)

   ctx.shadowColor = ShadowColor[color]
   ctx.shadowOffsetY = ICON_SHADOW_SIZE
   ctx.shadowBlur = ICON_SHADOW_SIZE
   ctx.globalCompositeOperation = 'source-over'
   ctx.drawImage(icon, x, y, width, height)
}
