import Image from 'next/image'
import { Button } from '@/components/Button'
import { OnChangeConfig } from '@/app/components/FolderEditor'
import { DownloadIcon, FolderIcon } from '@/icons'
import { Config } from '@/utils/icons'
import { useRef } from 'react'
import { defaultIcons } from './defaultIcons'
import { MACOS_COLORS, SO, WINDOWS_COLORS } from '@/utils/icons/consts'

export function Configuration({
   configuration,
   onChangeConfig,
   downloadFile,
}: {
   configuration: Config
   onChangeConfig: OnChangeConfig
   downloadFile: () => void
}) {
   const inputRef = useRef<HTMLInputElement>(null)

   function openFileExporer() {
      if (inputRef.current) {
         inputRef.current.click()
      }
   }

   let colors = []

   if (configuration.os === 'mac-os') {
      colors = MACOS_COLORS
   } else {
      colors = WINDOWS_COLORS
   }

   return (
      <aside
         className='relative lg:w-96 rounded-xl border border-zinc-200 p-5 flex flex-col gap-5 shadow-sm 
         md:h-[calc(100vh_-_40px)] w-full md:w-80'
      >
         <h1 className='font-medium'>Configuration</h1>

         <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={inputRef}
            onChange={(e) => {
               const files = e.target.files
               const file = files ? files[0] : null

               if (!file) {
                  return
               }

               onChangeConfig('icon', file)
            }}
         />

         <input
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none'
            placeholder='Text'
            value={configuration.text}
            onChange={(e) => onChangeConfig('text', e.target.value)}
            maxLength={15}
         />

         <div>
            <select
               className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer mt-2'
               value={configuration.os}
               onChange={(e) => {
                  onChangeConfig('os', e.target.value as Config['os'])
               }}
            >
               {SO.map((so) => {
                  return (
                     <option value={so.value} key={so.value}>
                        {so.label}
                     </option>
                  )
               })}
            </select>
         </div>

         <div>
            <select
               className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer mt-2'
               value={configuration.color}
               onChange={(e) => {
                  onChangeConfig('color', e.target.value as Config['color'])
               }}
            >
               {colors.map((color) => {
                  return (
                     <option value={color.value} key={color.value}>
                        {color.label}
                     </option>
                  )
               })}
            </select>

            <p className='text-sm text-zinc-500 mt-1 ml-1'>
               Select an option or{' '}
               <span className='font-medium text-zinc-700'>click on the folder</span> to change.
            </p>
         </div>

         <select
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer'
            value={configuration.adjustColor}
            onChange={(e) => {
               onChangeConfig('adjustColor', Number(e.target.value))
            }}
         >
            <option value={1}>Adjust icon color</option>
            <option value={0}>Preserve icon color</option>
         </select>

         <ul className='hidden md:grid md:grid-cols-6 lg:grid-cols-7 gap-3'>
            {defaultIcons.map((icon, i) => {
               const selected = configuration.icon === icon.name

               return (
                  <li
                     className={
                        'w-full p-1 aspect-square cursor-pointer border rounded-md ' +
                        (selected ? ' border-zinc-200' : 'border-transparent')
                     }
                     key={i}
                     onClick={() => onChangeConfig('icon', icon.name)}
                  >
                     <Image
                        priority
                        alt={`${icon.name} icon`}
                        src={icon.src}
                        className='w-full h-full'
                     />
                  </li>
               )
            })}
         </ul>

         <Button variant='outlined' className='w-full md:mt-auto' onClick={() => openFileExporer()}>
            <FolderIcon className='h-5 w-5 stroke-2' />
            <span>Custom Icon</span>
         </Button>

         <Button className='w-full' onClick={() => downloadFile()}>
            <DownloadIcon className='h-5 w-5 stroke-2' />

            <span>Download</span>
         </Button>
      </aside>
   )
}
