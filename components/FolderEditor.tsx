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
      adjustColor: 1,
      icon: 'github',
   })

   const defaultPreview =
      configuration.theme === 'dark' ? githubFolderDark : githubFolderLight

   const onChangeConfig: OnChangeConfig = async (key, value) => {
      const currentConfig = configuration
      const config = { ...configuration, [key]: value }
      setConfiguration(config)

      if (config.icon) {
         setLoadingPreview(true)

         const form = new FormData()
         form.append('icon', config.icon)
         form.append('theme', config.theme)
         form.append('adjustColor', config.adjustColor.toString())

         try {
            const data = await generatePreview(form)

            if (data) {
               setPreview(`data:image/png;base64,${data}`)
            } else {
               throw new Error("Couldn't create preview")
            }
         } catch (err) {
            if (err instanceof Error) {
               alert(err.message)
            }
            setConfiguration(currentConfig)
         } finally {
            setLoadingPreview(false)
         }
      } else {
         console.log('Default preview')
      }
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
