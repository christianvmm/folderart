import { IMAGES_API } from '@/consts'

export function canvasToIco(canvas: HTMLCanvasElement, filename: string) {
   // Convertimos el canvas a un Blob PNG
   canvas.toBlob(async (blob) => {
      if (!blob) {
         console.error('No se pudo convertir el canvas a Blob.')
         return
      }

      // Preparamos el formulario con el archivo PNG
      const formData = new FormData()
      formData.append('file', blob, 'icon.png')

      try {
         // Hacemos POST a tu API Flask
         const response = await fetch(`${IMAGES_API}/ico`, {
            method: 'POST',
            body: formData,
         })

         if (!response.ok) {
            throw new Error(`Error en la conversión: ${response.statusText}`)
         }

         // Obtenemos el blob .ico
         const icoBlob = await response.blob()

         // Creamos un link para descargar el archivo
         const url = URL.createObjectURL(icoBlob)
         const a = document.createElement('a')
         a.href = url
         a.download = `${filename}.ico`
         document.body.appendChild(a)
         a.click()
         a.remove()
         URL.revokeObjectURL(url)
      } catch (error) {
         console.error('Error al convertir y descargar el ícono:', error)
      }
   }, 'image/png')
}
