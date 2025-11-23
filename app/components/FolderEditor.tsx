'use client'
import { useState } from 'react'
import { Folder } from '@/app/components/Folder'
import { Configuration } from '@/app/components/Configuration'
import { type Config } from '@/utils/icons'
import { useUpdatePreview } from '@/hooks'
import { HowToUse } from '@/app/components/HowToUse'
import { ThemeChangeButton } from '@/app/components/ThemeChangeButton'

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
   const [filename] = useState('icon')
   const [configuration, setConfiguration] = useState<Config>({
      color: '000,000,000',
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
      <div className='hidden md:flex items-center'>
         <Configuration
            configuration={configuration}
            onChangeConfig={onChangeConfig}
            downloadFile={onDownload}
         />

         <div className='relative flex flex-col justify-between items-center md:flex-1 md:min-h-[calc(100vh_-_40px)] px-6 pt-6'>
            {/* Theme Change Button at top-right */}
            <div className='absolute top-2 right-6'>
               <ThemeChangeButton />
            </div>

            {/* Description */}
            <p className='text-sm mb-4'>
               <span className='text-zinc-500'> Customize your desktop folder icon. </span>
            </p>

            {/* Icon Preview */}
            <div className='icon-preview mb-4'>
               <Folder loading={loading} canvasRef={canvasRef} />
            </div>

            {/* How To Use Section */}
            <HowToUse />
         </div>
      </div>
   )
}
export default FolderEditor