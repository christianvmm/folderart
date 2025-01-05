import { loadImage } from '@/utils/load-image'
import { ICON_SHADOW_SIZE, IconColor, Resolution, ShadowColor, Size } from '@/utils/icons/consts'
import { getFolderPath } from './common'
import { Canvas, Color, Context } from './types'
import { Dimension, getIconPosition } from './format-icon'

export async function drawFolder(
   ctx: Context,
   canvas: Canvas,
   resolution: Resolution,
   color: Color
) {
   const size = Size[resolution]
   const folder = await loadImage(getFolderPath(color))
   canvas.width = size
   canvas.height = size
   ctx.drawImage(folder, 0, 0, size, size)
}

export function drawIcon(
   ctx: Context,
   icon: HTMLImageElement,
   color: Color,
   dimension: Dimension,
   resolution: Resolution
) {
   ctx.shadowColor = ShadowColor[color]
   ctx.shadowOffsetY = ICON_SHADOW_SIZE
   ctx.shadowBlur = ICON_SHADOW_SIZE
   ctx.globalCompositeOperation = 'source-over'

   const { x, y } = getIconPosition(dimension.width, dimension.height, resolution)
   ctx.drawImage(icon, x, y, dimension.width, dimension.height)
}

export function drawText(ctx: Context, text: string, color: Color) {
   const x = 400,
      y = 400

   const selectedColor = IconColor[color]
   const textColor = `rgb(${selectedColor.red}, ${selectedColor.green}, ${selectedColor.blue})`
   const borderColor = ShadowColor[color]
   ctx.font = '220px Arial'
   ctx.fillStyle = textColor
   ctx.strokeStyle = borderColor
   ctx.fillText(text, x + 10, y + 30)
}
