export type Color =
   | 'default-dark'
   | 'default-light'
   | 'green'
   | 'lime'
   | 'yellow'
   | 'orange'
   | 'red'
   | 'purple'
   | 'gray'
   | 'black'

export type IconConstraints = {
   maxWidth: number
   maxHeight: number
   preferredSize: number
   startY: number
   folderAreaHeight: number
}

export type Config = {
   adjustColor: number
   icon?: File | string
   color: Color
}

export type Canvas = {
   width: number
   height: number
   toDataURL(type?: string | undefined, quality?: any): string
}

export type Context = {
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
