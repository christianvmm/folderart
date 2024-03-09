import { Canvas, Config, Context } from './types'
import { drawFolderArt, drawIcon, getFolderPath, getIconPath } from './common'
import { Resolution, Size } from '@/utils/icons/consts'
import { getIconDimensions, getIconPosition } from './format-icon'
import { loadImage } from '@/utils/load-image'

async function loadIconImg(icon: Config['icon']): Promise<HTMLImageElement | null> {
   const isDefaultIcon = typeof icon === 'string'

   if (isDefaultIcon) {
      return await loadImage(getIconPath(icon))
   } else if (icon instanceof File) {
      return await loadImage(URL.createObjectURL(icon))
   } else {
      return null
   }
}

async function createIcon(
   iconImg: HTMLImageElement,
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

   drawIcon(canvas, ctx, iconImg, width, height, config)
   return loadImage(canvas.toDataURL('image/png'))
}

export async function generatePreview(canvas: Canvas, ctx: Context, config: Config) {
   const resolution = Resolution.Retina512
   const iconImg: HTMLImageElement | null = await loadIconImg(config.icon)
   if (!iconImg) return

   const { width, height } = getIconDimensions(iconImg.width, iconImg.height, resolution)
   const { x, y } = getIconPosition(width, height, resolution)
   const icon = await createIcon(iconImg, width, height, config)
   const folder = await loadImage(getFolderPath(resolution, config.theme))

   const size = Size[resolution]
   canvas.width = size
   canvas.height = size
   drawFolderArt(ctx, folder, icon, x, y, width, height, resolution)
}
