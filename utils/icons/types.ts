export type Color =
   | 'windows-11-default'
   
   | 'mac-os-default-dark'
   | 'mac-os-default-light'
   | 'mac-os-green'
   | 'mac-os-lime'
   | 'mac-os-yellow'
   | 'mac-os-orange'
   | 'mac-os-red'
   | 'mac-os-purple'
   | 'mac-os-gray'
   | 'mac-os-black'

export type OS = 'windows-11' | 'mac-os'

export type IconConstraints = {
   maxWidth: number
   maxHeight: number
   preferredSize: number
   startY: number
   folderAreaHeight: number
}

export type Config = {
   adjustColor: number
   os: OS
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
