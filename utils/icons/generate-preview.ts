import { Canvas, Config, Context } from './types'
import { Resolution } from '@/utils/icons/consts'
import { Dimension, getIconDimension } from './format-icon'
import { createIcon } from '@/utils/icons/create-icon'
import { loadIconImg } from '@/utils/icons/load-icon-img'
import { drawFolder, drawIcon, drawText } from '@/utils/icons/draw'

export async function generatePreview(canvas: Canvas, ctx: Context, config: Config) {
   /**
    * Preload Icon
    */
   const resolution = Resolution.Retina512
   const iconImg: HTMLImageElement | null = await loadIconImg(config.icon)
   let icon: HTMLImageElement | null = null
   let dimension: Dimension | null = null

   if (iconImg) {
      dimension = getIconDimension(iconImg.width, iconImg.height, resolution)
      icon = await createIcon(iconImg, dimension.width, dimension.height, config)
   }

   /**
    * Draw Folder
    */
   await drawFolder(ctx, canvas, resolution, config.color)

   /**
    * Draw Icon
    */
   if (icon && dimension) {
      drawIcon(ctx, icon, config.color, dimension, resolution)
   }

   /**
    * Draw Text
    */
   drawText(ctx, 'hi', config.color)
}
