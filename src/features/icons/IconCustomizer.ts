import { IconColor, ShadowColor } from '@/src/features/icons/consts'
import { Canvas, Config, Constraint, Context } from './types'
import { loadImage } from '@/src/features/icons/utils/loadImage'

type Dimension = { width: number; height: number }

export abstract class IconCustomizer {
   protected size = 1024
   protected iconImg: HTMLImageElement | null = null
   protected icon: HTMLImageElement | null = null
   protected dimension: Dimension | null = null

   constructor(
      protected canvas: Canvas,
      protected ctx: Context,
      protected config: Config
   ) {}

   private getFolderPath(iconType: string, variant: string) {
      return `folders/${iconType}/${variant}.png`
   }

   private getIconPath(icon: string) {
      return `/icons/${icon}.svg`
   }

   private async loadIconImg(icon: string | File | undefined) {
      const isDefaultIcon = typeof icon === 'string' && icon.length

      if (isDefaultIcon) {
         this.iconImg = await loadImage(this.getIconPath(icon))
      } else if (icon instanceof File) {
         this.iconImg = await loadImage(URL.createObjectURL(icon))
      } else {
         this.iconImg = null
      }
   }

   private async drawFolder() {
      const folder = await loadImage(this.getFolderPath(this.config.iconType, this.config.variant))
      this.canvas.width = this.size
      this.canvas.height = this.size
      this.ctx.drawImage(folder, 0, 0, this.size, this.size)
   }

   protected addShadow() {
      this.ctx.shadowColor = ShadowColor[this.config.variant]
      this.ctx.shadowOffsetY = 3
      this.ctx.shadowBlur = 3
      this.ctx.globalCompositeOperation = 'source-over'
   }

   protected calculateIconDimension() {
      if (!this.iconImg) return

      const originalWidth = this.iconImg.width
      const originalHeight = this.iconImg.height
      const constraints = this.constraints
      const aspectRatio = originalWidth / originalHeight
      let iconWidth: number
      let iconHeight: number

      if (aspectRatio === 1) {
         iconHeight = iconWidth = constraints.preferredSize
      } else if (aspectRatio > 1) {
         iconWidth = constraints.maxWidth

         if ((iconHeight = iconWidth / aspectRatio) > constraints.maxHeight) {
            iconHeight = constraints.maxHeight
            iconWidth = iconHeight * aspectRatio
         }
      } else {
         iconHeight = constraints.maxHeight

         if ((iconWidth = iconHeight * aspectRatio) > constraints.maxWidth) {
            iconWidth = constraints.maxWidth
            iconHeight = iconWidth / aspectRatio
         }
      }

      if (iconWidth > constraints.maxWidth) {
         throw new Error(`WIDTH: ${iconWidth} > ${constraints.maxWidth}`)
      }

      if (iconHeight > constraints.maxHeight) {
         throw new Error(`HEIGHT: ${iconHeight} > ${constraints.maxHeight}`)
      }

      this.dimension = { width: iconWidth, height: iconHeight }
   }

   protected async drawIcon(): Promise<void> {
      if (!this.dimension || !this.icon) return

      const constraints = this.constraints
      const x = 1024 / 2 - this.dimension.width / 2
      const y = constraints.startY + constraints.folderAreaHeight / 2 - this.dimension.height / 2
      this.ctx.drawImage(this.icon, x, y, this.dimension.width, this.dimension.height)
   }

   protected adjustIconColor(data: Uint8ClampedArray<ArrayBufferLike>): void {
      const COLOR = IconColor[this.config.variant]
      for (let i = 0; i < data.length; i += 4) {
         data[i] = COLOR.red
         data[i + 1] = COLOR.green
         data[i + 2] = COLOR.blue
         if (data[i + 3] > 100) data[i + 3] = 255
      }
   }

   protected drawText(): void {
      const text = this.config.text

      if (!text) return

      const constraints = this.constraints
      const selectedColor = IconColor[this.config.variant]
      const textColor = `rgb(${selectedColor.red}, ${selectedColor.green}, ${selectedColor.blue})`

      let fontSize = 300
      const fontFamily = 'Arial'
      this.ctx.font = `${fontSize}px ${fontFamily}`

      // Dynamically adjust font size to fit within maxWidth
      while (this.ctx.measureText(text).width > constraints.maxWidth) {
         fontSize -= 1
         this.ctx.font = `${fontSize}px ${fontFamily}`
      }

      const textWidth = this.ctx.measureText(text).width
      const x = this.size / 2 - textWidth / 2
      const y = constraints.startY + constraints.folderAreaHeight / 2 + 20

      this.ctx.textBaseline = 'middle'
      this.ctx.fillStyle = textColor
      this.ctx.fillText(text, x, y, constraints.maxWidth)
   }

   protected async createBaseIcon(): Promise<void> {
      if (!this.dimension || !this.iconImg) return

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = this.dimension.width
      canvas.height = this.dimension.height
      if (!ctx) return

      ctx.drawImage(this.iconImg, 0, 0, this.dimension.width, this.dimension.height)
      const iconImgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      if (this.config.adjustColor) {
         this.adjustIconColor(iconImgData.data)
      }

      ctx.putImageData(iconImgData, 0, 0)
      this.icon = await loadImage(canvas.toDataURL('image/png'))
   }

   protected abstract get constraints(): Constraint

   public async customize() {
      await this.loadIconImg(this.config.icon)
      this.calculateIconDimension()
      await this.createBaseIcon()
      await this.drawFolder()

      this.addShadow()

      await this.drawIcon()
      this.drawText()
   }
}
