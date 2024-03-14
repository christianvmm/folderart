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
      <div className='flex flex-col-reverse md:flex-row items-center px-5 md:px-0'>
         <Configuration
            configuration={configuration}
            onChangeConfig={onChangeConfig}
            downloadFile={onDownload}
         />

         <div className='flex flex-col-reverse md:flex-col justify-between items-center relative md:flex-1 md:min-h-[calc(100vh_-_40px)] pt-5 md:pt-0 w-full'>
            <p className='hidden md:block text-sm'>
               <span className='text-zinc-500'> FolderArt / </span> {filename}.png
            </p>

            <Folder loading={loading} canvasRef={canvasRef} />

            <div className='ml-auto flex items-center w-full md:w-auto justify-between md:justify-start gap-5'>
               <p className='text-sm'>
                  <span className='text-zinc-500'>Created by</span>{' '}
                  <a
                     href='https://www.christianvm.dev'
                     target='_blank'
                     className='underline underline-offset-2'
                  >
                     christianvm
                  </a>
               </p>

               <HowToUse />
            </div>
         </div>
      </div>
   )
}
