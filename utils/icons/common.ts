import { base } from '@/consts'
import { Canvas, Config, Context} from './types'
import {
   ICON_SHADOW_COLOR,
   ICON_SHADOW_SIZE,
   IconColor,
   Resolution,
   Size,
} from './consts'

export function getIconPath(icon: string) {
   const publicPath = `/icons/${icon}.svg`
   const serverSide = typeof window === 'undefined'

   if (serverSide) {
      return `${base}/public/${publicPath}`
   } else {
      return publicPath
   }
}

export function getFolderPath(overlay: boolean) {
   let publicPath: string;
   if (overlay) {
      publicPath = `resources/folders/light/icon_512x512@2x.png`
   } else {
      publicPath = `resources/folders/dark/icon_512x512@2x.png`
   }
   const serverSide = typeof window === 'undefined'

   if (serverSide) {
      return `${base}/public/${publicPath}`
   } else {
      return publicPath
   }
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
      for (var i = 0; i < data.length; i += 4) {
         data[i] = IconColor[config.theme].red
         data[i + 1] = IconColor[config.theme].green
         data[i + 2] = IconColor[config.theme].blue

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
   overlay: Image,
   x: number,
   y: number,
   width: number,
   height: number,
   resolution: Resolution
) {
   const size = Size[resolution]
   ctx.drawImage(folder, 0, 0, size, size)
   ctx.drawImage(overlay, 0, 0, size, size)

   ctx.shadowColor = ICON_SHADOW_COLOR
   ctx.shadowOffsetY = ICON_SHADOW_SIZE
   ctx.shadowBlur = ICON_SHADOW_SIZE
   ctx.globalCompositeOperation = 'source-over'
   ctx.drawImage(icon, x, y, width, height)
}