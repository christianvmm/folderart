'use client'
import Image from 'next/image'
import fallbackFolder from '../public/fallback-folder.png'
import { useEffect, useRef, useState } from 'react'
import { Config } from '@/utils/icons'
import { FolderArtBuilder } from '@/utils/icons'

export function Folder({ config }: { config: Config }) {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      const builder = new FolderArtBuilder(canvas, ctx, config)
      builder.generatePreview().then(() => setLoading(false))
   }, [config])

   return (
      <>
         <canvas className='w-[512px] h-[512px]' ref={canvasRef}></canvas>

         {loading && (
            <Image
               src={fallbackFolder}
               alt='macOS folder icon '
               className='absolute'
               width={512}
               height={512}
               priority
            />
         )}
      </>
   )
}
