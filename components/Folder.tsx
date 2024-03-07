import Image, { ImageProps } from 'next/image'

export type FolderProps = {
   loading: boolean
   src: ImageProps['src']
}

export function Folder({ loading, src }: FolderProps) {
   return (
      <div className=' flex justify-center items-center relative md:flex-1 md:h-[calc(100vh_-_40px)]'>
         <Image
            width={512}
            height={512}
            src={src}
            alt='macOS folder icon'
            priority
         />

         {loading && <div className='loader bg-[#339ee0] absolute mt-10' />}
      </div>
   )
}
