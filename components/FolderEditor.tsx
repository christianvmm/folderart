'use client'
import { Folder } from '@/components/Folder'
import { type DragEvent, useEffect, useState } from 'react'
import { Configuration } from '@/components/Configuration'
import { type Config } from '@/utils/icons'
import { useDragNDrop, useUpdatePreview } from '@/hooks'
import { HowToUse } from '@/components/HowToUse'
import { MACOS_COLORS, WINDOWS_COLORS } from '@/utils/icons/consts'
import { canvasToPng } from '@/utils/canvasToPng'
import { canvasToIco } from '@/utils/canvasToIco'

const defaultMacOs = {
   os: 'mac-os',
   color: 'mac-os-default-dark',
} as const

const defaultWindows = {
   os: 'windows-11',
   color: 'windows-11-default',
} as const

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
   const [downloading, setDownloading] = useState(false)
   const [filename] = useState('icon')
   const [configuration, setConfiguration] = useState<Config>({
      ...defaultMacOs,
      adjustColor: 1,
      icon: '',
      text: '',
   })
   const [canvasRef, loading] = useUpdatePreview(configuration)

   const onChangeConfig: OnChangeConfig = async (key, value) => {
      if (key === 'os') {
         const color = value === 'mac-os' ? defaultMacOs.color : defaultWindows.color

         setConfiguration((prev) => ({
            ...prev,
            [key]: value,
            color,
         }))

         return
      }

      setConfiguration((prev) => ({
         ...prev,
         [key]: value,
      }))
   }

   function onChangeColor() {
      const COLORS = configuration.os === 'mac-os' ? MACOS_COLORS : WINDOWS_COLORS
      const currentIdx = COLORS.findIndex((color) => color.value === configuration.color)
      const nextIdx = (currentIdx + 1) % COLORS.length
      onChangeConfig('color', COLORS[nextIdx].value)
   }

   function proccessImageFile(file: File) {
      if (file.type.includes('image')) {
         onChangeConfig('icon', file)
      }
   }

   function onDropHandler(e: DragEvent<HTMLElement>) {
      const files = e.dataTransfer?.files
      const file = files[0]
      proccessImageFile(file)
   }

   async function onDownload() {
      if (!canvasRef.current) return

      try {
         if (configuration.os === 'mac-os') {
            canvasToPng(canvasRef.current, filename)
         } else {
            setDownloading(true)
            await canvasToIco(canvasRef.current, filename)
         }
      } finally {
         setDownloading(false)
      }
   }

   useEffect(() => {
      const onPaste = (e: ClipboardEvent) => {
         const clipboardData = e.clipboardData
         const file = clipboardData?.files[0]

         if (file) {
            e.preventDefault()
            proccessImageFile(file)
         }
      }

      window.addEventListener('paste', onPaste)
      return () => window.removeEventListener('paste', onPaste)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const dragNDrop = useDragNDrop(onDropHandler)

   return (
      <div className='flex flex-col-reverse md:flex-row items-center px-5 md:px-0' {...dragNDrop}>
         <Configuration
            configuration={configuration}
            onChangeConfig={onChangeConfig}
            downloadFile={onDownload}
            downloading={downloading}
         />

         <div className='flex flex-col-reverse md:flex-col justify-between items-center relative md:flex-1 md:min-h-[calc(100vh_-_40px)] pt-5 md:pt-0 w-full'>
            <p className='hidden md:block text-sm'>
               <span className='text-zinc-500'> FolderArt / </span> {filename}.
               {configuration.os === 'mac-os' ? 'png' : 'ico'}
            </p>

            <Folder loading={loading} canvasRef={canvasRef} onChangeColor={onChangeColor} />

            <div className='ml-auto flex items-center w-full md:w-auto justify-between md:justify-start gap-5'>
               <p className='text-sm'>
                  <span className='text-zinc-500'>Created by</span>{' '}
                  <a
                     href='https://github.com/christianvmm/folderart'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='underline underline-offset-2'
                  >
                     christianvm
                  </a>
               </p>

               <HowToUse os={configuration.os} />
            </div>
         </div>
      </div>
   )
}
