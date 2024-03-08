'use client'
import { Config, generatePreview } from '@/utils/icons'
import { useEffect, useRef } from 'react'

export function Folder({ config }: { config: Config }) {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      generatePreview(canvas, ctx, config)
   }, [config])

   return <canvas className='w-[512px] h-[512px]' ref={canvasRef}></canvas>
}
