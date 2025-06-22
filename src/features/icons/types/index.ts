export type Variant =
   | 'windows-11-default'
   | 'windows-11-pink'
   | 'mac-os-default-dark'
   | 'mac-os-default-light'
   | 'mac-os-hd-removable'
   | 'mac-os-hd-external'
   | 'mac-os-time-machine'
   | 'mac-os-file-server'
   | 'mac-os-green'
   | 'mac-os-lime'
   | 'mac-os-yellow'
   | 'mac-os-orange'
   | 'mac-os-red'
   | 'mac-os-purple'
   | 'mac-os-gray'
   | 'mac-os-black'

export type IconType = 'windows-11' | 'mac-os' | 'mac-os-hd' | 'mac-os-flat-drive'

export type Config = {
   adjustColor: number
   iconType: IconType
   icon?: File | string
   text: string
   variant: Variant
   scaleFactor: number
}

export type Canvas = {
   width: number
   height: number
   toDataURL(type?: string | undefined, quality?: any): string
}

export type Constraint = {
   maxWidth: number
   maxHeight: number
   preferredSize: number
   folderAreaHeight: number
   startY: number
}

export type Context = CanvasRenderingContext2D
