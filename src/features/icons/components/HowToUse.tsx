'use client'
import { QuestionMarkIcon } from '@/src/icons'
import { useState } from 'react'
import HowToUseMacOSGif from '../../../../public/how-to-use-macos.gif'
import Image from 'next/image'
import { IconType } from '@/src/features/icons/types'

export function HowToUse({ os }: { os: IconType }) {
   const [open, setOpen] = useState(false)

   return (
      <>
         <button
            title='How to Use'
            className='bg-zinc-950 hover:bg-zinc-800 text-white p-2 rounded-full ml-auto'
            onClick={() => setOpen(true)}
         >
            <QuestionMarkIcon className='w-5 h-5 stroke-2' />
         </button>

         <div
            role='dialog'
            aria-labelledby='dialog-title'
            className={
               'fixed inset-0 h-screen w-full px-6 flex items-center justify-center backdrop-brightness-50 transition-all ' +
               (open ? 'opacity-100 z-50' : 'opacity-0 -z-10')
            }
            onClick={(e) => {
               if (e.target === e.currentTarget) {
                  setOpen(false)
               }
            }}
         >
            <div
               onClick={(e) => {
                  e.stopPropagation()
               }}
               className={
                  'px-6 py-4 bg-white border border-zinc-300 rounded-2xl pointer-events-auto w-full max-w-lg max-h-[80vh] overflow-y-auto min-h-96 transition-transform duration-200 ' +
                  (open ? 'scale-100' : 'scale-50')
               }
            >
               <div className='w-full h-full'>
                  <h1 className='text-lg font-semibold mb-4' id='dialog-title'>
                     How to use ({os === 'mac-os' ? 'macOS' : 'Windows'})
                  </h1>

                  {os === 'mac-os' ? <MacOS /> : <Windows />}
               </div>
            </div>
         </div>
      </>
   )
}

function MacOS() {
   return (
      <div className='flex w-full flex-col gap-4'>
         <ol className='text-zinc-600 flex w-full flex-col gap-4'>
            <li>
               1. <span className='font-medium'>Select</span> an icon or{' '}
               <span className='font-medium'>upload</span> a custom one.
            </li>
            <li>
               2. <span className='font-medium'>Download</span> the icon.
            </li>

            <li>
               3. <span className='font-medium'>Choose File &gt; Get Info</span> in the menu bar.
            </li>

            <li>
               4. <span className='font-medium'>Drag and Drop</span> the custom icon into the
               folder.
            </li>
         </ol>

         <Image
            src={HowToUseMacOSGif}
            alt='Video of how to set a custom folder icon in macOS'
            unoptimized
         />
      </div>
   )
}

function Windows() {
   return (
      <div className='flex w-full flex-col gap-4'>
         <ol className='text-zinc-600 flex w-full flex-col gap-4'>
            <li>
               1. <span className='font-medium'>Select</span> an icon or{' '}
               <span className='font-medium'>upload</span> a custom one.
            </li>
            <li>
               2. <span className='font-medium'>Download</span> the icon.
            </li>

            <li>
               3. Right-click on the folder, then select{' '}
               <span className='font-medium'>Properties &gt; Customize &gt; Change Icon</span>.
            </li>
            <li>
               4. <span className='font-medium'>Browse</span> to the location of your downloaded
               icon and <span className='font-medium'>select</span> it.
            </li>
            <li>
               5. Click <span className='font-medium'>OK</span>, then{' '}
               <span className='font-medium'>Apply</span>, and finally{' '}
               <span className='font-medium'>OK</span> again to confirm.
            </li>
         </ol>

         <video autoPlay controls>
            <source src='/how-to-use-windows.mp4' />
         </video>
      </div>
   )
}
