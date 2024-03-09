import { loadImage } from '@/utils/load-image'
import { Config, Theme } from './types'
import { getIconDimensions, getIconPosition } from './format-icon'
import {
   FolderImage,
   ICON_SHADOW_COLOR,
   ICON_SHADOW_SIZE,
   IconColor,
   Resolution,
   Size,
} from './consts'

type Canvas = {
   width: number
   height: number
   toDataURL(type?: string | undefined, quality?: any): string
}

type Context = {
   drawImage: (image: any, x: number, y: number, w: number, h: number) => void
   shadowColor: string
   shadowOffsetY: number
   shadowBlur: number
   globalCompositeOperation: GlobalCompositeOperation
   getImageData: (
      sx: number,
      sy: number,
      sw: number,
      sh: number,
      settings?: ImageDataSettings | undefined
   ) => ImageData
   putImageData: (imagedata: ImageData, dx: number, dy: number) => void
}

export class FolderArtBuilder {
   constructor(
      private canvas: Canvas,
      private ctx: Context,
      private config: Config
   ) {}

   private async loadIcon() {
      const icon = this.config.icon

      if (typeof icon === 'string') {
         return await loadImage(`/icons/${icon}.svg`)
      } else if (icon instanceof File) {
         return await loadImage(URL.createObjectURL(icon))
      } else {
         return null
      }
   }

   private async createIcon(icon: HTMLImageElement, width: number, height: number) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = width
      canvas.height = height
      ctx!.drawImage(icon, 0, 0, width, height)
      const iconImgData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = iconImgData.data

      if (this.config.adjustColor) {
         for (var i = 0; i < data.length; i += 4) {
            data[i] = IconColor[this.config.theme].red
            data[i + 1] = IconColor[this.config.theme].green
            data[i + 2] = IconColor[this.config.theme].blue

            if (data[i + 3] > 100) {
               data[i + 3] = 255
            }
         }
      }

      ctx!.putImageData(iconImgData, 0, 0)
      return loadImage(canvas.toDataURL('image/png'))
   }

   private getFolder(resolution: Resolution, theme: Theme) {
      return `/resources/folders/${theme}/${FolderImage[resolution]}.png`
   }

   public async generatePreview() {
      const resolution = Resolution.Retina512
      const iconImg: HTMLImageElement | null = await this.loadIcon()
      if (!iconImg) return

      const { width, height } = getIconDimensions(iconImg.width, iconImg.height, resolution)
      const { x, y } = getIconPosition(width, height, resolution)
      const icon = await this.createIcon(iconImg, width, height)
      const folder = await loadImage(this.getFolder(resolution, this.config.theme))

      // Draw folder
      const size = Size[resolution]
      this.canvas.width = size
      this.canvas.height = size
      this.ctx.drawImage(folder, 0, 0, size, size)

      // Draw icon
      this.ctx.shadowColor = ICON_SHADOW_COLOR
      this.ctx.shadowOffsetY = ICON_SHADOW_SIZE
      this.ctx.shadowBlur = ICON_SHADOW_SIZE
      this.ctx.globalCompositeOperation = 'source-over'
      this.ctx.drawImage(icon, x, y, width, height)
   }
}
