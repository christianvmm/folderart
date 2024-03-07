import { Button } from '@/components/Button'
import { Configuration, OnChangeConfig } from '@/components/FolderEditor'
import { DownloadIcon, FolderIcon, ReloadIcon } from '@/icons'
import { useRef } from 'react'

export function Configuration({
   loadingPreview,
   configuration,
   onChangeConfig,
}: {
   loadingPreview: boolean
   configuration: Configuration
   onChangeConfig: OnChangeConfig
}) {
   const inputRef = useRef<HTMLInputElement>(null)

   function openFileExporer() {
      if (inputRef.current) {
         inputRef.current.click()
      }
   }

   return (
      <aside
         className='relative h-full w-96 rounded-xl border border-zinc-200 p-5 flex flex-col gap-5 shadow-sm'
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

               onChangeConfig('image', file)
            }}
         />

         <Button
            variant='outlined'
            className='w-full'
            onClick={() => openFileExporer()}
            disabled={loadingPreview}
         >
            <FolderIcon className='h-5 w-5 stroke-2' />
            <span>Replace Icon</span>
         </Button>

         <select
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none'
            value={configuration.theme}
            onChange={(e) => {
               onChangeConfig('theme', e.target.value as Configuration['theme'])
            }}
         >
            <option value='dark'>Dark Mode</option>
            <option value='light'>Light Mode</option>
         </select>

         <Button className='w-full mt-auto' disabled>
            {false ? (
               <ReloadIcon className='h-4 w-4 text-[10px] animate-spin' />
            ) : (
               <DownloadIcon className='h-5 w-5 stroke-2' />
            )}

            <span>Download</span>
         </Button>
      </aside>
   )
}
