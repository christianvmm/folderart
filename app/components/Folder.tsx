'use client'
import Image from 'next/image'
import fallbackFolder from '../../public/fallback-folder.png'
import { RefObject } from 'react'

interface FolderProps {
   loading: boolean
   canvasRef: RefObject<HTMLCanvasElement | null> // <-- Fix: allow null
}

export function Folder({ loading, canvasRef }: FolderProps) {
   return (
      <>
         <canvas
            className={loading ? 'hidden' : 'w-[512px] h-[512px]'}
            ref={canvasRef}
         ></canvas>

         {loading && (
            <Image
               src={fallbackFolder}
               alt='macOS folder icon'
               width={512}
               height={512}
               priority
            />
         )}
      </>
   )
}
