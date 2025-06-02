export function canvasToPng(canvas: HTMLCanvasElement, filename: string) {
   const png = canvas.toDataURL()
   const link = document.createElement('a')
   link.setAttribute('download', `${filename}.png`)
   link.setAttribute('href', png)
   link.click()
}
