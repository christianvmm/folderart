import { ICON_SHADOW_COLOR, ICON_SHADOW_SIZE, Resolution, Size } from './consts'
import { Canvas, Image } from '@napi-rs/canvas'

export async function createPreview(
   folder: Image,
   icon: Image,
   x: number,
   y: number,
   width: number,
   height: number,
   resolution: Resolution
) {
   // Draw folder
   const size = Size[resolution]
   const canvas = new Canvas(size, size)
   const ctx = canvas.getContext('2d')
   ctx.drawImage(folder, 0, 0, size, size)

   // Draw icon
   ctx.shadowColor = ICON_SHADOW_COLOR
   ctx.shadowOffsetY = ICON_SHADOW_SIZE
   ctx.shadowBlur = ICON_SHADOW_SIZE
   ctx.globalCompositeOperation = 'source-over'
   ctx.drawImage(icon, x, y, width, height)

   return canvas.toBuffer('image/png')
}
