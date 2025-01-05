'use client'
import { Folder } from '@/app/components/Folder'
import { type DragEvent, useEffect, useState } from 'react'
import { Configuration } from '@/app/components/Configuration'
import { type Config } from '@/utils/icons'
import { useDragNDrop, useUpdatePreview } from '@/hooks'
import { HowToUse } from '@/app/components/HowToUse'
import { COLORS } from '@/utils/icons/consts'

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
   const [filename] = useState('icon')
   const [configuration, setConfiguration] = useState<Config>({
      color: 'default-dark',
      adjustColor: 1,
      icon: '',
      text: '',
   })
   const [canvasRef, loading] = useUpdatePreview(configuration)

   const onChangeConfig: OnChangeConfig = async (key, value) => {
      setConfiguration((prev) => ({
         ...prev,
         [key]: value,
      }))
   }

   function onChangeColor() {
      const currentIdx = COLORS.findIndex((color) => color.value === configuration.color)
      const idx = (currentIdx + 1) % COLORS.length
      onChangeConfig('color', COLORS[idx].value)
   }

   function proccessImageFiles(files: FileList) {
      const file = files[0]

      if (file && file.type.includes('image')) {
         onChangeConfig('icon', file)
      }
   }

   function onDropHandler(e: DragEvent<HTMLElement>) {
      const files = e.dataTransfer?.files
      proccessImageFiles(files)
   }

   async function onDownload() {
      if (!canvasRef.current) return

      const image = canvasRef.current.toDataURL()

      const link = document.createElement('a')
      link.setAttribute('download', `${filename}.png`)
      link.setAttribute('href', image)
      link.click()
   }

   useEffect(() => {
      const onPaste = (e: ClipboardEvent) => {
         e.preventDefault()

         const clipboardData = e.clipboardData
         if (clipboardData) {
            proccessImageFiles(clipboardData.files)
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
         />

         <div className='flex flex-col-reverse md:flex-col justify-between items-center relative md:flex-1 md:min-h-[calc(100vh_-_40px)] pt-5 md:pt-0 w-full'>
            <p className='hidden md:block text-sm'>
               <span className='text-zinc-500'> FolderArt / </span> {filename}.png
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

               <HowToUse />
            </div>
         </div>
      </div>
   )
}
