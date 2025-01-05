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
   text: string
   color: Color
}

export type Canvas = {
   width: number
   height: number
   toDataURL(type?: string | undefined, quality?: any): string
}

export type Context = CanvasRenderingContext2D
