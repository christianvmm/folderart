'use client'
import { Configuration } from '@/components/Configuration'
import { Folder } from '@/components/Folder'
import { generatePreview } from '@/utils/generate-preview'
import { useState } from 'react'
import { ImageProps } from 'next/image'
import { MobileUnderConstruction } from '@/components/MobileUnderConstruction'
import githubFolderImage from '../public/github-folder.png'

export type Configuration = {
   theme: 'dark' | 'light'
   image: File | null
}

export type OnChangeConfig = <T extends keyof Configuration>(
   key: T,
   value: Configuration[T]
) => void

export function FolderEditor() {
   const [loadingPreview, setLoadingPreview] = useState(false)
   const [preview, setPreview] = useState<ImageProps['src']>()
   const [configuration, setConfiguration] = useState<Configuration>({
      theme: 'dark',
      image: null,
   })

   async function loadPreview(config: Configuration) {
      if (!config.image) return

      setLoadingPreview(true)

      const form = new FormData()
      form.append('file', config.image)
      form.append('theme', config.theme)

      try {
         const data = await generatePreview(form)
         setPreview(`data:image/png;base64,${data}`)
      } catch (err) {
         if (err instanceof Error) {
            alert(err.message)
         }
      } finally {
         setLoadingPreview(false)
      }
   }

   const onChangeConfig: OnChangeConfig = (key, value) => {
      const config = { ...configuration, [key]: value }
      setConfiguration(config)
      loadPreview(config)
   }

   return (
      <>
         <div className='hidden md:flex items-center'>
            <Configuration
               loadingPreview={loadingPreview}
               configuration={configuration}
               onChangeConfig={onChangeConfig}
            />

            <Folder
               loading={loadingPreview}
               src={preview ?? githubFolderImage}
            />
         </div>

         <MobileUnderConstruction
            loading={loadingPreview}
            src={preview ?? githubFolderImage}
         />
      </>
   )
}
