'use client'
import { Folder } from '@/components/Folder'
import { type Config, generatePreview } from '@/utils/icons'
import { useState } from 'react'
import { ImageProps } from 'next/image'
import { MobileUnderConstruction } from '@/components/MobileUnderConstruction'
import { Configuration } from '@/components/Configuration'
import githubFolderLight from '../public/github-folder-light.png'
import githubFolderDark from '../public/github-folder-dark.png'

export type OnChangeConfig = <T extends keyof Config>(
   key: T,
   value: Config[T]
) => void

export function FolderEditor() {
   const [loadingPreview, setLoadingPreview] = useState(false)
   const [downloading, setDownloading] = useState(false)
   const [preview, setPreview] = useState<ImageProps['src']>()
   const [configuration, setConfiguration] = useState<Config>({
      theme: 'dark',
   })
   const defaultPreview =
      configuration.theme === 'dark' ? githubFolderDark : githubFolderLight

   async function loadPreview(config: Config) {
      if (config.image) {
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
      } else {
         console.log('Default preview')
      }
   }

   const onChangeConfig: OnChangeConfig = (key, value) => {
      const config = { ...configuration, [key]: value }
      setConfiguration(config)
      loadPreview(config)
   }

   async function downloadFile() {
      setDownloading(true)
   }

   return (
      <>
         <div className='hidden md:flex items-center'>
            <Configuration
               loadingPreview={loadingPreview}
               configuration={configuration}
               onChangeConfig={onChangeConfig}
               downloadFile={downloadFile}
               downloading={downloading}
            />

            <Folder loading={loadingPreview} src={preview ?? defaultPreview} />
         </div>

         <MobileUnderConstruction
            loading={loadingPreview}
            src={preview ?? defaultPreview}
         />
      </>
   )
}
