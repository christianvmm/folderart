'use server'

import fs from 'fs/promises'
import { Theme } from "./types"
import { getIconPosition, getIconDimensions } from './format-icon'
import { loadImage } from '@napi-rs/canvas'
import { createIcon } from "./create-icon"
import { createPreview } from "./create-preview"
import { getFolder } from "./config"
import { FolderImage, Resolution } from "./consts"
import { base } from "@/consts"

export async function generatePreview(formData: FormData) {
   const formIcon = formData.get('icon')
   const theme = formData.get('theme') as Theme
   const adjustColor = Number(formData.get('adjustColor'))
   let data: ArrayBuffer | undefined

   if (!formIcon) {
      throw new Error("Couldn't read icon")
   }

   try {
      if (typeof formIcon === 'string') {
         data = await fs.readFile(`${base}/public/icons/${formIcon}.svg`)
      } else if (formIcon instanceof File) {
         data = await formIcon.arrayBuffer()
      }
   } catch {
      throw new Error("Couldn't read icon")
   }

   if (!data) {
      throw new Error("Couldn't read icon")
   }

   const iconImage = await loadImage(data)
   const resolution = Resolution.Retina512
   const { width, height } = getIconDimensions(iconImage.width, iconImage.height, resolution)
   const { x, y } = getIconPosition(width, height, resolution)

   const iconData = await createIcon(iconImage, width, height, { theme, adjustColor })

   const folder = await loadImage(getFolder(resolution, theme))
   const icon = await loadImage(iconData)

   const result = await createPreview(folder, icon, x, y, width, height, resolution)
   await fs.writeFile(`${base}/previews/preview-${FolderImage[resolution]}.png`, result)

   return result.toString('base64')
}