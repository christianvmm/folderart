import { Folder } from '@/components/Folder'
import githubFolderDark from '../public/github-folder-dark.png'

export function MobileUnderConstruction() {
   return (
      <div className='flex flex-col h-full md:hidden text-center'>
         <Folder loading={false} src={githubFolderDark}/>

         <div>
            <h1 className='text-xl font-medium'>
               FolderArt mobile coming soon
            </h1>

            <p className='mt-3'>
               In the meantime, please use a Desktop Browser.
            </p>

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
