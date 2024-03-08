import Image, { ImageProps } from 'next/image'

export type FolderProps = {
   loading: boolean
   src: ImageProps['src']
}

export function Folder({ loading, src }: FolderProps) {
   return (
      <>
         <Image
            width={512}
            height={512}
            src={src}
            alt='macOS folder icon'
            priority
         />

         {loading && <div className='loader bg-[#339ee0] absolute mt-10' />}
      </>
   )
}
