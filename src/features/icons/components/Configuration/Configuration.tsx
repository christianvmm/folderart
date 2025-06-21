import Image from 'next/image'
import { Button } from '@/src/components/Button'
import { OnChangeConfig } from '@/src/features/icons/components/FolderEditor'
import { DownloadIcon, FolderIcon, LoaderIcon } from '@/src/icons'
import { Config } from '@/src/features/icons/types'
import { useRef } from 'react'
import { defaultIcons } from './defaultIcons'
import {
   MACOS_VARIANTS,
   OS_OPTIONS,
   WINDOWS_OPTIONS as WINDOWS_VARIANTS,
   VariantItem,
   defaultMacOs,
   defaultWindows,
} from '@/src/features/icons/consts'

export function Configuration({
   configuration,
   onChangeConfig,
   downloadFile,
   downloading,
}: {
   configuration: Config
   onChangeConfig: OnChangeConfig
   downloadFile: () => void
   downloading: boolean
}) {
   const inputRef = useRef<HTMLInputElement>(null)

   function openFileExporer() {
      if (inputRef.current) {
         inputRef.current.click()
      }
   }

   let variants: VariantItem[] = []

   if (configuration.iconType.includes('mac-os')) {
      variants = MACOS_VARIANTS
   } else {
      variants = WINDOWS_VARIANTS
   }

   return (
      <aside
         className='relative lg:w-96 rounded-xl border border-zinc-200 p-5 flex flex-col gap-5 shadow-sm
         md:h-[calc(100vh_-_40px)] w-full md:w-80 overflow-y-auto'
      >
         <h1 className='font-medium'>Configuration</h1>

         <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={inputRef}
            onChange={(e) => {
               const file = e.target.files?.[0]

               if (file) {
                  onChangeConfig({ icon: file })
               }
            }}
         />

         <div>
            <fieldset className='mt-2'>
               <legend className='text-sm font-medium flex items-center gap-2'>OS</legend>
               <div className='flex gap-3 mt-2'>
                  {OS_OPTIONS.map((os) => (
                     <label
                        key={os.value}
                        className={`cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all
            ${
               configuration.iconType.includes(os.value)
                  ? 'border-zinc-400 ring-2 ring-zinc-300 bg-zinc-100'
                  : 'border-zinc-200 hover:bg-zinc-50'
            }`}
                     >
                        <input
                           type='radio'
                           name='os'
                           value={os.value}
                           checked={configuration.iconType.includes(os.value)}
                           onChange={() => {
                              if (os.value.includes('mac-os')) {
                                 onChangeConfig(defaultMacOs)
                              } else {
                                 onChangeConfig(defaultWindows)
                              }
                           }}
                           className='sr-only'
                        />

                        <Image
                           priority
                           alt={`${os.label} icon`}
                           src={os.icon}
                           className='w-6 h-6'
                        />

                        <span className='text-sm font-medium'>{os.label}</span>
                     </label>
                  ))}
               </div>
            </fieldset>
         </div>

         <div>
            <label htmlFor='text' className='text-sm font-medium flex items-center gap-2'>
               Text
            </label>

            <input
               id='text'
               className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none'
               value={configuration.text}
               onChange={(e) => onChangeConfig({ text: e.target.value })}
               maxLength={15}
            />
         </div>

         <div>
            <label htmlFor='variant' className='text-sm font-medium flex items-center gap-2'>
               Variant
            </label>

            <select
               id='variant'
               className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer mt-2'
               value={configuration.variant}
               onChange={(e) => {
                  const value = e.target.value as Config['variant']
                  const variant = variants.find((v) => v.value === value)
                  if (!variant) return

                  onChangeConfig({ variant: variant.value, iconType: variant.iconType })
               }}
            >
               {variants.map((variant) => {
                  return (
                     <option value={variant.value} key={variant.value}>
                        {variant.label}
                     </option>
                  )
               })}
            </select>

            <p className='text-sm text-zinc-500 mt-1 ml-1'>
               Select an option or{' '}
               <span className='font-medium text-zinc-700'>click on the folder</span> to change.
            </p>
         </div>

         <div>
            <label htmlFor='adjustColor' className='text-sm font-medium flex items-center gap-2'>
               Icon Color
            </label>
            <select
               className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer'
               value={configuration.adjustColor}
               onChange={(e) => {
                  onChangeConfig({ adjustColor: Number(e.target.value) })
               }}
            >
               <option value={1}>Adapt to Variant Style</option>
               <option value={0}>Use Original Icon Color</option>
            </select>
         </div>

         <ul className='grid grid-cols-6 lg:grid-cols-7 gap-1'>
            {defaultIcons.map((icon, i) => {
               const selected = configuration.icon === icon.name

               return (
                  <li
                     className={
                        'w-full p-2 aspect-square cursor-pointer border rounded-md ' +
                        (selected
                           ? 'border-zinc-400 ring-2 ring-zinc-300 bg-zinc-100'
                           : 'border-transparent hover:bg-zinc-50')
                     }
                     key={i}
                     onClick={() => onChangeConfig({ icon: icon.name })}
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

         <Button
            variant='outlined'
            className='w-full md:mt-auto min-h-10'
            onClick={() => openFileExporer()}
         >
            <FolderIcon className='h-5 w-5 stroke-2' />
            <span>Custom Icon</span>
         </Button>

         <Button
            className={'w-full min-h-10 ' + (downloading ? 'opacity-50' : '')}
            disabled={downloading}
            onClick={() => downloadFile()}
         >
            {downloading ? (
               <LoaderIcon className='h-5 w-5 animate-spin' />
            ) : (
               <DownloadIcon className='h-5 w-5 stroke-2' />
            )}

            <span>Download</span>
         </Button>
      </aside>
   )
}
