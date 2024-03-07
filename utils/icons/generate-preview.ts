'use server'

import fs from 'fs/promises'
import { Theme } from "./types"
import { getIconPosition, getIconDimensions } from './format-icon'
import { loadImage } from '@napi-rs/canvas'
import { createIcon } from "./create-icon"
import { createPreview } from "./create-preview"
import { getFolder } from "./config"
import { FolderImage, resolutions } from "./consts"
import { base } from "@/consts"

export async function generatePreview(formData: FormData) {
   const file = formData.get('file') as File
   const theme = formData.get('theme') as Theme
   
   const data = await file.arrayBuffer()
   const iconImage = await loadImage(data)

   let result : Buffer

   for (const resolution of resolutions) {
      const { width, height } = getIconDimensions(iconImage.width, iconImage.height, resolution)
      const { x, y } = getIconPosition(width, height, resolution)

      const iconData = await createIcon(iconImage, width, height, { theme })

      const folder = await loadImage(getFolder(resolution, theme))
      const icon = await loadImage(iconData)

      result = await createPreview(folder, icon, x, y, width, height, resolution)
      await fs.writeFile(`${base}/previews/preview-${FolderImage[resolution]}.png`, result)
   }

   return result!.toString('base64')
}