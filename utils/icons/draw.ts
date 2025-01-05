import { loadImage } from '@/utils/load-image'
import { IconColor, Resolution, Size } from '@/utils/icons/consts'
import { getFolderPath } from './common'
import { Canvas, Color, Context } from './types'
import { Dimension, getIconPosition } from './format-icon'
import { createConstraints } from '@/utils/icons/create-constraints'

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
   dimension: Dimension,
   resolution: Resolution
) {
   const { x, y } = getIconPosition(dimension.width, dimension.height, resolution)
   ctx.drawImage(icon, x, y, dimension.width, dimension.height)
}

export function drawText(ctx: Context, text: string, color: Color, resolution: Resolution) {
   const config = createConstraints(resolution)

   const selectedColor = IconColor[color]
   const textColor = `rgb(${selectedColor.red}, ${selectedColor.green}, ${selectedColor.blue})`

   let fontSize = 300
   const fontFamily = 'Arial'
   ctx.font = `${fontSize}px ${fontFamily}`

   // Dynamically adjust font size to fit within maxWidth
   while (ctx.measureText(text).width > config.maxWidth) {
      fontSize -= 1
      ctx.font = `${fontSize}px ${fontFamily}`
   }

   const textWidth = ctx.measureText(text).width
   const x = Size[resolution] / 2 - textWidth / 2
   const y = config.startY + config.folderAreaHeight / 2 + 20

   ctx.textBaseline = 'middle'
   ctx.fillStyle = textColor
   ctx.fillText(text, x, y, config.maxWidth)
}
