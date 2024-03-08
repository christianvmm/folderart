import { Config } from './types'
import { ICON_SHADOW_COLOR, ICON_SHADOW_SIZE, Resolution, Size } from './consts'
import { loadImage } from '@/utils/load-image'
import { getIconDimensions, getIconPosition } from './format-icon'
import { getFolder } from '@/utils/icons/config'
import { createIcon } from '@/utils/icons/create-icon'

export async function generatePreview(
   canvas: HTMLCanvasElement,
   ctx: CanvasRenderingContext2D,
   config: Config
) {
   const resolution = Resolution.Retina512
   const iconImg: HTMLImageElement | null = await loadIcon(config.icon)
   if (!iconImg) return

   const { width, height } = getIconDimensions(iconImg.width, iconImg.height, resolution)
   const { x, y } = getIconPosition(width, height, resolution)
   const icon = await createIcon(iconImg, width, height, config)
   const folder = await loadImage(getFolder(resolution, config.theme))

   // Draw folder
   const size = Size[resolution]
   canvas.width = size
   canvas.height = size
   ctx.drawImage(folder, 0, 0, size, size)

   // Draw icon
   ctx.shadowColor = ICON_SHADOW_COLOR
   ctx.shadowOffsetY = ICON_SHADOW_SIZE
   ctx.shadowBlur = ICON_SHADOW_SIZE
   ctx.globalCompositeOperation = 'source-over'
   ctx.drawImage(icon, x, y, width, height)
}

async function loadIcon(icon: Config['icon']) {
   if (typeof icon === 'string') {
      return await loadImage(`/icons/${icon}.svg`)
   } else if (icon instanceof File) {
      return await loadImage(URL.createObjectURL(icon))
   } else {
      return null
   }
}
