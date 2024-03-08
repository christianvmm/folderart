import { FolderEditor } from '@/components/FolderEditor'
import { MobileUnderConstruction } from '@/components/MobileUnderConstruction'

export default function Home() {
   return (
      <main className='p-1 md:p-5'>
         <FolderEditor />
         <MobileUnderConstruction />
      </main>
   )
}
