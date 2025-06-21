import { Canvas, Config, Context } from '@/src/features/icons/types'
import { MacFolderCustomizer } from '@/src/features/icons/MacFolderCustomizer'
import { WindowsFolderCustomizer } from '@/src/features/icons/WindowsFolderCustomizer'
import { useEffect, useRef, useState } from 'react'
import { MacHDCustomizer } from '@/src/features/icons/MacHDCustomizer'
import { MacFlatDriveCustomizer } from '@/src/features/icons/MacFlatDriveCustomizer'
import { IconCustomizer } from '@/src/features/icons/IconCustomizer'

export function useUpdatePreview(config: Config) {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      updatePreview(canvas, ctx, config).then(() => setLoading(false))
   }, [config])

   return [canvasRef, loading] as const
}

async function updatePreview(canvas: Canvas, ctx: Context, config: Config) {
   let customizer: IconCustomizer

   switch (config.iconType) {
      case 'windows-11':
         customizer = new WindowsFolderCustomizer(canvas, ctx, config)
         break
      case 'mac-os':
         customizer = new MacFolderCustomizer(canvas, ctx, config)
         break
      case 'mac-os-hd':
         customizer = new MacHDCustomizer(canvas, ctx, config)
         break
      case 'mac-os-flat-drive':
         customizer = new MacFlatDriveCustomizer(canvas, ctx, config)
         break
      default:
         throw new Error('Unsupported icon type')
   }

   await customizer.customize()
}
