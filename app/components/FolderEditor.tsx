'use client'
import { Folder } from '@/app/components/Folder'
import { useState } from 'react'
import { Configuration } from '@/app/components/Configuration'
import { type Config } from '@/utils/icons'
import { useUpdatePreview } from '@/hooks'
import { HowToUse } from '@/app/components/HowToUse'

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
   const [filename] = useState('icon')
   const [configuration, setConfiguration] = useState<Config>({
      theme: 'dark',
      adjustColor: 1,
      icon: 'github',
   })
   const [canvasRef, loading] = useUpdatePreview(configuration)

   const onChangeConfig: OnChangeConfig = async (key, value) => {
      const config = { ...configuration, [key]: value }
      setConfiguration(config)
   }

   async function onDownload() {
      if (!configuration.icon || !canvasRef.current) return

      const image = canvasRef.current.toDataURL()

      const link = document.createElement('a')
      link.setAttribute('download', `${filename}.png`)
      link.setAttribute('href', image)
      link.click()
   }

   return (
      <div className='flex flex-col-reverse md:flex-row items-center relative'>
         <Configuration
            configuration={configuration}
            onChangeConfig={onChangeConfig}
            downloadFile={onDownload}
         />

         <div className='flex flex-col-reverse md:flex-col justify-between items-center md:flex-1 md:min-h-[calc(100vh_-_40px)] md:pt-0'>
            <p className='hidden md:block text-sm'>
               <span className='text-zinc-500'> FolderArt / </span> {filename}.png
            </p>

            <Folder loading={loading} canvasRef={canvasRef} />

            <HowToUse />
         </div>
      </div>
   )
}
