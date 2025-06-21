import { IMAGES_API } from '@/src/consts'

export async function canvasToIco(canvas: HTMLCanvasElement, filename: string) {
   return new Promise<void>((resolve, reject) => {
      canvas.toBlob(async (blob) => {
         if (!blob) {
            reject()
            return
         }

         const formData = new FormData()
         formData.append('file', blob, 'icon.png')

         try {
            const response = await fetch(`${IMAGES_API}/ico`, {
               method: 'POST',
               body: formData,
            })

            if (!response.ok) {
               reject()
               return
            }

            const icoBlob = await response.blob()
            const url = URL.createObjectURL(icoBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${filename}.ico`
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
            resolve()
         } catch (error) {
            reject(error)
         }
      }, 'image/png')
   })
}
