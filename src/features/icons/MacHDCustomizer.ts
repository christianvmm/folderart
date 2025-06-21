import { IconCustomizer } from '@/src/features/icons/IconCustomizer'
import { loadImage } from '@/src/features/icons/utils/loadImage'
import * as THREE from 'three'

export class MacHDCustomizer extends IconCustomizer {
   protected get constraints() {
      return {
         maxWidth: 500,
         maxHeight: 384,
         preferredSize: 384,
         startY: 50,
         folderAreaHeight: 700,
      }
   }

   protected override addShadow() {
      this.ctx.shadowOffsetY = 0
      this.ctx.shadowBlur = 0
   }

   protected async createBaseIcon(): Promise<void> {
      if (!this.dimension || !this.iconImg) return

      const width = this.dimension.width
      const height = this.dimension.height

      const renderer = new THREE.WebGLRenderer({
         preserveDrawingBuffer: true,
         alpha: true,
         antialias: true,
      })
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0) // transparent background

      // Create scene and camera
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.z = 1

      // Texture and geometry
      const texture = new THREE.Texture(this.iconImg)
      texture.needsUpdate = true
      texture.colorSpace = THREE.SRGBColorSpace

      const aspect = width / height
      const geometry = new THREE.PlaneGeometry(aspect, 1)
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      const mesh = new THREE.Mesh(geometry, material)

      // Apply -10° rotation and scale to compensate size shrink
      const tiltRad = THREE.MathUtils.degToRad(-10)
      mesh.rotation.x = tiltRad
      const scale = 1 / Math.cos(tiltRad) // dynamic scale compensation
      mesh.scale.set(scale, scale, 1)

      scene.add(mesh)

      // Render
      renderer.render(scene, camera)

      // Read canvas to 2D context
      const glCanvas = renderer.domElement
      const result = document.createElement('canvas')
      result.width = width
      result.height = height
      const ctx = result.getContext('2d')
      if (!ctx) return

      ctx.drawImage(glCanvas, 0, 0, width, height)

      const iconImgData = ctx.getImageData(0, 0, width, height)
      if (this.config.adjustColor) {
         this.adjustIconColor(iconImgData.data)
      }

      ctx.putImageData(iconImgData, 0, 0)

      // === METALLIC EFFECT ===
      const noiseData = ctx.getImageData(0, 0, width, height)
      const noise = noiseData.data
      for (let i = 0; i < noise.length; i += 4) {
         const v = Math.floor(Math.random() * 20) - 10
         noise[i] = noise[i] + v
         noise[i + 1] = noise[i + 1] + v
         noise[i + 2] = noise[i + 2] + v
      }
      ctx.putImageData(noiseData, 0, 0)

      this.icon = await loadImage(result.toDataURL('image/png'))
   }
}
