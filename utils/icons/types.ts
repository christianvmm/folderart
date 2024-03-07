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
   image?: File
}
