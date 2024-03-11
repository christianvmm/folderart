import Image from 'next/image'
import { Button } from '@/components/Button'
import { OnChangeConfig } from '@/app/components/FolderEditor'
import { DownloadIcon, FolderIcon } from '@/icons'
import { Config } from '@/utils/icons'
import { useRef } from 'react'
import { devIcons } from './defaultIcons'

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

   return (
      <aside
         className='relative h-full md:w-80 lg:w-96 rounded-xl border border-zinc-200 p-5 flex flex-col gap-5 shadow-sm'
         style={{
            height: 'calc(100vh - 40px)',
         }}
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

         <select
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer'
            value={configuration.theme}
            onChange={(e) => {
               onChangeConfig('theme', e.target.value as Config['theme'])
            }}
         >
            <option value='dark'>Dark Mode</option>
            <option value='light'>Light Mode</option>
         </select>

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

         <ul className='grid md:grid-cols-6 lg:grid-cols-7 gap-3'>
            {devIcons.map((icon, i) => {
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

         <Button variant='outlined' className='w-full mt-auto' onClick={() => openFileExporer()}>
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
