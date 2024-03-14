'use client'
import Image from 'next/image'
import fallbackFolder from '../../public/fallback-folder.png'
import { RefObject } from 'react'

export function Folder({
   loading,
   canvasRef,
}: {
   loading: boolean
   canvasRef: RefObject<HTMLCanvasElement>
}) {
   return (
      <>
         <canvas
            className={loading ? 'hidden' : 'w-[512px] h-auto max-w-[90vw]'}
            ref={canvasRef}
         ></canvas>

         {loading && (
            <Image
               src={fallbackFolder}
               alt='macOS folder icon '
               width={512}
               height={512}
               className='max-w-[90vw]'
               priority
            />
         )}
      </>
   )
}
