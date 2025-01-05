import { Canvas, Config, Context } from './types'
import { getFolderPath } from './common'
import { ICON_SHADOW_SIZE, Resolution, ShadowColor, Size } from '@/utils/icons/consts'
import { getIconDimensions, getIconPosition } from './format-icon'
import { loadImage } from '@/utils/load-image'
import { createIcon } from '@/utils/icons/create-icon'
import { loadIconImg } from '@/utils/icons/load-icon-img'

export async function generatePreview(canvas: Canvas, ctx: Context, config: Config) {
   /**
    * Preload Icon
    */
   const resolution = Resolution.Retina512
   const iconImg: HTMLImageElement | null = await loadIconImg(config.icon)
   let icon: HTMLImageElement | null = null
   let dimensions: { width: number; height: number } | null = null

   if (iconImg) {
      dimensions = getIconDimensions(iconImg.width, iconImg.height, resolution)
      icon = await createIcon(iconImg, dimensions.width, dimensions.height, config)
   }

   /**
    * Draw Folder
    */
   const size = Size[resolution]
   const folder = await loadImage(getFolderPath(config.color))
   canvas.width = size
   canvas.height = size
   ctx.drawImage(folder, 0, 0, size, size)

   /**
    * Draw Icon
    */
   if (icon && dimensions) {
      ctx.shadowColor = ShadowColor[config.color]
      ctx.shadowOffsetY = ICON_SHADOW_SIZE
      ctx.shadowBlur = ICON_SHADOW_SIZE
      ctx.globalCompositeOperation = 'source-over'

      const { x, y } = getIconPosition(dimensions.width, dimensions.height, resolution)
      ctx.drawImage(icon, x, y, dimensions.width, dimensions.height)
   }
}
