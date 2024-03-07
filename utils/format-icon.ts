const MAX_WIDTH = 768
const MAX_HEIGHT = 384
const PREFERRED_SIZE = 384 // 384x384

// const FOLDER_MAIN_HEIGHT = 940
const REFERENCE_AREA_HEIGHT = 604
const START_Y = 258

export function getIconPosition(
   folderSize: number,
   width: number,
   height: number
) {
   return {
      x: folderSize / 2 - width / 2,
      y: START_Y + REFERENCE_AREA_HEIGHT / 2 - height / 2,
   }
}

export function getIconDimensions(
   originalWidth: number,
   originalHeight: number
) {
   const aspectRatio = originalWidth / originalHeight
   let iconWidth: number
   let iconHeight: number

   if (aspectRatio === 1) {
      iconHeight = iconWidth = PREFERRED_SIZE
   } else if (aspectRatio > 1) {
      iconWidth = MAX_WIDTH

      if ((iconHeight = iconWidth / aspectRatio) > MAX_HEIGHT) {
         iconHeight = MAX_HEIGHT
         iconWidth = iconHeight * aspectRatio
      }
   } else {
      iconHeight = MAX_HEIGHT

      if ((iconWidth = iconHeight * aspectRatio) > MAX_WIDTH) {
         iconWidth = MAX_WIDTH
         iconHeight = iconWidth / aspectRatio
      }
   }

   if (iconWidth > MAX_WIDTH) {
      throw new Error(`WIDTH: ${iconWidth} > ${MAX_WIDTH}`)
   }

   if (iconHeight > MAX_HEIGHT) {
      throw new Error(`HEIGHT: ${iconHeight} > ${MAX_HEIGHT}`)
   }

   return { width: iconWidth, height: iconHeight }
}
