import { createConstraints } from './create-constraints'
import { Resolution, Size } from './consts'

export function getIconPosition(
   width: number,
   height: number,
   resolution: Resolution
) {
   const config = createConstraints(resolution)
   return {
      x: Size[resolution] / 2 - width / 2,
      y: config.startY + config.folderAreaHeight / 2 - height / 2,
   }
}

export function getIconDimensions(
   originalWidth: number,
   originalHeight: number,
   resolution: Resolution
) {
   const config = createConstraints(resolution)
   const aspectRatio = originalWidth / originalHeight
   let iconWidth: number
   let iconHeight: number

   if (aspectRatio === 1) {
      iconHeight = iconWidth = config.preferredSize
   } else if (aspectRatio > 1) {
      iconWidth = config.maxWidth

      if ((iconHeight = iconWidth / aspectRatio) > config.maxHeight) {
         iconHeight = config.maxHeight
         iconWidth = iconHeight * aspectRatio
      }
   } else {
      iconHeight = config.maxHeight

      if ((iconWidth = iconHeight * aspectRatio) > config.maxWidth) {
         iconWidth = config.maxWidth
         iconHeight = iconWidth / aspectRatio
      }
   }

   if (iconWidth > config.maxWidth) {
      throw new Error(`WIDTH: ${iconWidth} > ${config.maxWidth}`)
   }

   if (iconHeight > config.maxHeight) {
      throw new Error(`HEIGHT: ${iconHeight} > ${config.maxHeight}`)
   }

   return { width: iconWidth, height: iconHeight }
}
