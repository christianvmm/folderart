'use server'
import fs from 'fs/promises'
import { Canvas as NapiCanvas, Image, loadImage as loadFile } from '@napi-rs/canvas'
import { BaseConfig, FolderImage, Resolution, Size, resolutions } from '@/utils/icons/consts'
import { base } from '@/consts'
import { getIconDimensions, getIconPosition } from '@/utils/icons/format-icon'
import { Config, FolderArtBuilder } from '@/utils/icons'

export async function downloadFolderArt(formData: FormData, config: Omit<Config, 'icon'>) {
   const file = formData.get('file')
   const builder = new FolderArtBuilder()
   builder.setConfig(config)

   if (!file) {
      throw new Error()
   }

   let iconImage: Image
   const customIcon = typeof file !== 'string'

   if (customIcon) {
      const data = await file.arrayBuffer()
      iconImage = await loadFile(data)
   } else {
      iconImage = await loadFile(FolderArtBuilder.getIconPath(file))
      iconImage.width = BaseConfig.preferredSize
      iconImage.height = BaseConfig.preferredSize
   }

   for (const resolution of resolutions) {
      const { width, height } = getIconDimensions(iconImage.width, iconImage.height, resolution)
      const { x, y } = getIconPosition(width, height, resolution)
      const canvas = new NapiCanvas(width, height)
      const ctx = canvas.getContext('2d')
      builder.setCanvas(canvas)
      builder.setContext(ctx)

      FolderArtBuilder.drawIcon(canvas, ctx, iconImage, width, height, config)
      const iconData = canvas.toBuffer('image/png')
      const icon = await loadFile(iconData)
      const folder = await loadFile(FolderArtBuilder.getFolderPath(resolution, config.theme))

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
   const size = Size[resolution]
   const canvas = new NapiCanvas(size, size)
   const ctx = canvas.getContext('2d')
   FolderArtBuilder.drawFolderArt(ctx, folder, icon, x, y, width, height, resolution)
   return canvas.toBuffer('image/png')
}
