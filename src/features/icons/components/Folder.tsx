'use client'
import Image from 'next/image'
import FallbackFolder from '../../../../public/fallback-folder.png'
import { RefObject } from 'react'

export function Folder({
   loading,
   canvasRef,
   onChangeColor,
}: {
   loading: boolean
   canvasRef: RefObject<HTMLCanvasElement>
   onChangeColor: () => void
}) {
   return (
      <>
         <button
            title='Change Variant'
            className={loading ? 'hidden' : 'w-[512px] h-auto max-w-[90vw] cursor-pointer outline-none'}
            onClick={() => onChangeColor()}
         >
            <canvas
               className='w-[512px] max-w-[90vw] h-auto'
               ref={canvasRef}
            ></canvas>
         </button>

         {loading && (
            <Image
               src={FallbackFolder}
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
