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
import { base } from '@/consts'
import { Image as NapiImage } from '@napi-rs/canvas'

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
      private canvas?: Canvas,
      private ctx?: Context,
      private config?: Config
   ) {}

   public setCanvas(canvas: Canvas) {
      this.canvas = canvas
   }

   public setContext(ctx: Context) {
      this.ctx = ctx
   }

   public setConfig(config: Config) {
      this.config = config
   }

   public async loadIcon() {
      if (!this.config) {
         throw new Error()
      }

      const icon = this.config.icon

      if (typeof icon === 'string') {
         return await loadImage(`/icons/${icon}.svg`)
      } else if (icon instanceof File) {
         return await loadImage(URL.createObjectURL(icon))
      } else {
         return null
      }
   }

   public async createIcon(icon: HTMLImageElement, width: number, height: number) {
      if (!this.config) {
         throw new Error()
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      if (!ctx) {
         throw new Error()
      }

      FolderArtBuilder.drawIcon(canvas, ctx, icon, width, height, this.config)

      return loadImage(canvas.toDataURL('image/png'))
   }

   public static drawIcon(
      canvas: Canvas,
      ctx: Context,
      icon: any,
      width: number,
      height: number,
      config: Config
   ) {
      ctx!.drawImage(icon, 0, 0, width, height)
      const iconImgData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = iconImgData.data

      if (config.adjustColor) {
         for (var i = 0; i < data.length; i += 4) {
            data[i] = IconColor[config.theme].red
            data[i + 1] = IconColor[config.theme].green
            data[i + 2] = IconColor[config.theme].blue

            if (data[i + 3] > 100) {
               data[i + 3] = 255
            }
         }
      }

      ctx.putImageData(iconImgData, 0, 0)
   }

   public static getIconPath(icon: string) {
      const publicPath = `/icons/${icon}.svg`
      const serverSide = typeof window === 'undefined'

      if (serverSide) {
         return `${base}/public/${publicPath}`
      } else {
         return publicPath
      }
   }

   public static getFolderPath(resolution: Resolution, theme: Theme) {
      const publicPath = `resources/folders/${theme}/${FolderImage[resolution]}.png`
      const serverSide = typeof window === 'undefined'

      if (serverSide) {
         return `${base}/public/${publicPath}`
      } else {
         return publicPath
      }
   }

   public static drawFolderArt(
      ctx: Context,
      folder: any,
      icon: any,
      x: number,
      y: number,
      width: number,
      height: number,
      resolution: Resolution
   ) {
      // Draw folder
      const size = Size[resolution]
      ctx.drawImage(folder, 0, 0, size, size)

      // Draw icon
      ctx.shadowColor = ICON_SHADOW_COLOR
      ctx.shadowOffsetY = ICON_SHADOW_SIZE
      ctx.shadowBlur = ICON_SHADOW_SIZE
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(icon, x, y, width, height)
   }

   public async generatePreview() {
      if (!this.config || !this.canvas || !this.ctx) {
         throw new Error()
      }

      const resolution = Resolution.Retina512
      const iconImg: HTMLImageElement | null = await this.loadIcon()
      if (!iconImg) return

      const { width, height } = getIconDimensions(iconImg.width, iconImg.height, resolution)
      const { x, y } = getIconPosition(width, height, resolution)
      const icon = await this.createIcon(iconImg, width, height)
      const folder = await loadImage(FolderArtBuilder.getFolderPath(resolution, this.config.theme))

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
