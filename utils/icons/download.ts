'use server'
import {
   FolderImage,
   ICON_SHADOW_COLOR,
   ICON_SHADOW_SIZE,
   IconColor,
   Resolution,
   Size,
   resolutions,
} from '@/utils/icons/consts'
import { Canvas as NapiCanvas, Image, loadImage as loadFile } from '@napi-rs/canvas'
import { base } from '@/consts'
import { getIconDimensions, getIconPosition } from '@/utils/icons/format-icon'
import { Theme } from '@/utils/icons'
import fs from 'fs/promises'

function createIcon2(iconImage: Image, width: number, height: number) {
   const canvas = new NapiCanvas(width, height)
   const ctx = canvas.getContext('2d')
   ctx.drawImage(iconImage, 0, 0, width, height)

   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
   const data = imageData.data

   for (var i = 0; i < data.length; i += 4) {
      data[i] = IconColor['dark'].red
      data[i + 1] = IconColor['dark'].green
      data[i + 2] = IconColor['dark'].blue

      // avoid transparency
      if (data[i + 3] > 100) {
         data[i + 3] = 255
      }
   }

   ctx.putImageData(imageData, 0, 0)
   return canvas.toBuffer('image/png')
}

function getFolder(resolution: Resolution, theme: Theme) {
   return `${base}/public/resources/folders/${theme}/${FolderImage[resolution]}.png`
}

export async function downloadFolderArt(formData: FormData) {
   const file = formData.get('file') as File
   const data = await file.arrayBuffer()
   const iconImage = await loadFile(data)

   for (const resolution of resolutions) {
      const { width, height } = getIconDimensions(iconImage.width, iconImage.height, resolution)
      const { x, y } = getIconPosition(width, height, resolution)

      const iconData = createIcon2(iconImage, width, height)
      const folder = await loadFile(getFolder(resolution, 'dark'))
      const icon = await loadFile(iconData)

      const result = await createPreview(folder, icon, x, y, width, height, resolution)
      await fs.writeFile(`${base}/previews/preview-${FolderImage[resolution]}.png`, result)
   }
}

async function createPreview(
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
   const canvas = new NapiCanvas(size, size)
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
