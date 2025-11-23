'use client'

import { QuestionMarkIcon } from '@/icons'
import { useState } from 'react'

export function HowToUse() {
   const [isOpen, setIsOpen] = useState(false)

   return (
      <>
         <button
            className='bg-zinc-950 hover:bg-zinc-800 text-white p-2 rounded-full ml-auto'
            aria-label='How to use FolderCanvas'
            onClick={() => setIsOpen(true)}
         >
            <QuestionMarkIcon className='w-5 h-5 stroke-2' />
         </button>

         <div
            role='dialog'
            aria-modal='true'
            className={`fixed inset-0 h-screen w-full px-6 flex items-center justify-center backdrop-brightness-50 transition-all ${
               isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-10'
            }`}
            onClick={(e) => {
               if (e.target === e.currentTarget) {
                  setIsOpen(false)
               }
            }}
         >
            <div
               onClick={(e) => e.stopPropagation()}
               className={`px-6 py-4 bg-white border border-zinc-300 rounded-2xl pointer-events-auto w-full max-w-lg max-h-[80vh] overflow-y-auto min-h-96 transition-transform duration-200 ${
                  isOpen ? 'scale-100' : 'scale-50'
               }`}
            >
               <div className='w-full h-full p-4'>
                  <h2 className='text-lg font-semibold text-zinc-800 mb-4'>How to Use FolderCanvas</h2>
                  <ol className='list-decimal text-zinc-600 space-y-3 pl-5'>
                     <li>
                        <span className='font-medium'>Pick an Icon:</span> Select from the available icons below the
                        input bar (e.g., GitHub, Vercel, React, Tailwind, VSCode, etc.).
                     </li>
                     <li>
                        <span className='font-medium'>Adjust Icon Color:</span> Click &quot;Adjust icon color&quot; to open the
                        color picker and fine-tune the icon&apos;s appearance.
                     </li>
                     <li>
                        <span className='font-medium'>Upload Custom Icon (Optional):</span> Use the &quot;Custom Icon&quot; button
                        to upload your own SVG or PNG icon if preferred.
                     </li>
                     <li>
                        <span className='font-medium'>Preview Your Folder:</span> See the changes reflected instantly in
                        the large folder preview on the right.
                     </li>
                     <li>
                        <span className='font-medium'>Download the Icon:</span> Once satisfied, click the black
                        &quot;Download&quot; button to get your customized folder icon.
                     </li>
                     <li>
                        <span className='font-medium'>Developed by:</span>{' '}
                        <a
                           href='https://github.com/Lashen1227'
                           className='text-blue-600 hover:underline'
                           target='_blank'
                           rel='noopener noreferrer'
                        >
                           Lashen Martino
                        </a>
                     </li>
                  </ol>
               </div>
            </div>
         </div>
      </>
   )
}
