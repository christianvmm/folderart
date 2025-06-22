'use client'
import { canvasToIco } from '@/src/features/icons/utils/canvasToIco'
import { canvasToPng } from '@/src/features/icons/utils/canvasToPng'
import { Configuration } from '@/src/features/icons/components/Configuration'
import { Folder } from '@/src/features/icons/components/Folder'
import { HowToUse } from '@/src/features/icons/components/HowToUse'
import {
   defaultMacOs,
   defaultWindows,
   MACOS_VARIANTS,
   WINDOWS_OPTIONS,
} from '@/src/features/icons/consts'
import { type Config } from '@/src/features/icons/types'
import { type DragEvent, useEffect, useState } from 'react'
import { useDragNDrop } from '@/src/hooks/useDragNDrop'
import { useUpdatePreview } from '@/src/features/icons/hooks/useUpdatePreview'

export type OnChangeConfig = (data: Partial<Config>) => void

export function FolderEditor() {
   const [downloading, setDownloading] = useState(false)
   const [filename] = useState('icon')
   const [configuration, setConfiguration] = useState<Config>({
      ...defaultMacOs,
      adjustColor: 1,
      scaleFactor: 1,
      icon: '',
      text: '',
   })
   const [canvasRef, loading] = useUpdatePreview(configuration)
   const isMacOS = configuration.iconType.includes('mac-os')

   const onChangeConfig: OnChangeConfig = async (data) => {
      if (Object.keys(data).length === 1 && 'iconType' in data) {
         data.variant = data['iconType']?.includes('mac-os')
            ? defaultMacOs.variant
            : defaultWindows.variant
      }

      setConfiguration((prev) => ({
         ...prev,
         ...data,
      }))
   }

   function onChangeVariant() {
      const VARIANTS = isMacOS ? MACOS_VARIANTS : WINDOWS_OPTIONS
      const currentIdx = VARIANTS.findIndex((color) => color.value === configuration.variant)
      const nextIdx = (currentIdx + 1) % VARIANTS.length

      onChangeConfig({
         iconType: VARIANTS[nextIdx].iconType,
         variant: VARIANTS[nextIdx].value,
      })
   }

   function proccessImageFile(file: File) {
      if (file.type.includes('image')) {
         onChangeConfig({
            icon: file,
         })
      }
   }

   function onDropHandler(e: DragEvent<HTMLElement>) {
      const files = e.dataTransfer?.files
      const file = files[0]
      if (e instanceof File) proccessImageFile(file)
   }

   async function onDownload() {
      if (!canvasRef.current) return

      try {
         if (isMacOS) {
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
               {isMacOS ? 'png' : 'ico'}
            </p>

            <Folder loading={loading} canvasRef={canvasRef} onChangeColor={onChangeVariant} />

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

               <HowToUse os={configuration.iconType} />
            </div>
         </div>
      </div>
   )
}
