'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Config, generatePreview } from '@/utils/icons'
import fallbackFolder from '../public/fallback-folder.png'

export function Folder({ config }: { config: Config }) {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      generatePreview(canvas, ctx, config).then(() => setLoading(false))
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
