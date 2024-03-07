'use server'
import { getIconPosition, getIconDimensions } from '@/utils/format-icon'
import { Canvas, loadImage, Image } from '@napi-rs/canvas'
const base = process.cwd()

type Theme = 'dark' | 'light'

const colors: Record<Theme, { red: number; green: number; blue: number }> = {
   dark: {
      red: 51,
      green: 157,
      blue: 224,
   },
   light: {
      red: 63,
      green: 170,
      blue: 230,
   },
}

async function createIcon(iconImage: Image, width: number, height: number, theme: Theme) {
   const canvas = new Canvas(width, height)
   const ctx = canvas.getContext('2d')
   ctx.drawImage(iconImage, 0, 0, width, height)

   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
   const data = imageData.data

   for (var i = 0; i < data.length; i += 4) {
      data[i] = colors[theme].red
      data[i + 1] = colors[theme].green
      data[i + 2] = colors[theme].blue

      // avoid transparency
      if (data[i + 3] > 100) {
         data[i + 3] = 255
      }
   }

   ctx.putImageData(imageData, 0, 0)
   return canvas.toBuffer('image/png')
}

async function createFolderArt(
   folder: Image,
   icon: Image,
   x: number,
   y: number,
   width: number,
   height: number
) {
   // Draw folder
   const canvas = new Canvas(1024, 1024)
   const ctx = canvas.getContext('2d')
   ctx.drawImage(folder, 0, 0, 1024, 1024)

   // Draw icon
   ctx.shadowColor = '#97D8FC'
   ctx.shadowOffsetY = 3
   ctx.shadowBlur = 3
   ctx.globalCompositeOperation = 'source-over'
   ctx.drawImage(icon, x, y, width, height)

   return canvas.toBuffer('image/png')
}

export async function generatePreview(formData: FormData) {
   const file = formData.get('file') as File
   const theme = formData.get('theme') as Theme
   
   const data = await file.arrayBuffer()
   const iconImage = await loadImage(data)
   const { width, height } = getIconDimensions(iconImage.width, iconImage.height)
   const { x, y } = getIconPosition(1024, width, height)

   const iconData = await createIcon(iconImage, width, height, theme)

   const folder = await loadImage(`${base}/resources/folders/${theme}/icon_512x512@2x.png`)
   const icon = await loadImage(iconData)

   const result = await createFolderArt(folder, icon, x, y, width, height)
   return result.toString('base64')
}
