export type Theme = 'dark' | 'light'

export type IconConstraints = {
   maxWidth: number
   maxHeight: number
   preferredSize: number
   startY: number
   folderAreaHeight: number
}

export type Config = {
   theme: Theme
   adjustColor: number
   icon?: File | string
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
