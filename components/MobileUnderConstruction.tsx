import Image from 'next/image'
import fallbackFolder from '../../public/fallback-folder.png'

export function MobileUnderConstruction() {
   return (
      <div className='flex flex-col h-full md:hidden text-center items-center'>
         <Image src={fallbackFolder} alt='macOS folder icon' width={512} height={512} priority />

         <div>
            <h1 className='text-xl font-medium'>FolderArt mobile coming soon</h1>

            <p className='mt-3'>In the meantime, please use a Desktop Browser.</p>

            <p>
               Stay tuned for updates at the{' '}
               <a
                  className='font-medium underline underline-offset-2'
                  href='https://www.github.com/christianvmm/folderart'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  official repository.
               </a>
            </p>
         </div>
      </div>
   )
}
