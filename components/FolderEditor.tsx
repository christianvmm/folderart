'use client'
import { Folder } from '@/components/Folder'
import { type Config } from '@/utils/icons'
import { useState } from 'react'
import { Configuration } from '@/components/Configuration'
import { downloadFolderArt } from '@/utils/icons'

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
   const [configuration, setConfiguration] = useState<Config>({
      theme: 'dark',
      adjustColor: 1,
      icon: 'github',
   })

   const onChangeConfig: OnChangeConfig = async (key, value) => {
      const config = { ...configuration, [key]: value }
      setConfiguration(config)
   }

   async function onDownloadFile() {
      if (!configuration.icon) return

      const { icon, ...config } = configuration
      const form = new FormData()
      form.append('file', icon)
      downloadFolderArt(form, config)
   }

   return (
      <div className='hidden md:flex items-center'>
         <Configuration
            loadingPreview={false}
            configuration={configuration}
            onChangeConfig={onChangeConfig}
            downloadFile={() => onDownloadFile()}
            downloading={false}
         />

         <div className=' flex justify-center items-center relative md:flex-1 md:h-[calc(100vh_-_40px)]'>
            <Folder config={configuration} />
         </div>
      </div>
   )
}
