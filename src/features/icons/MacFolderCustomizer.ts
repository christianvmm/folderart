import { IconCustomizer } from '@/src/features/icons/IconCustomizer'

export class MacFolderCustomizer extends IconCustomizer {
   protected get constraints() {
      return {
         maxWidth: 768 * this.config.scaleFactor,
         maxHeight: 384 * this.config.scaleFactor,
         preferredSize: 384 * this.config.scaleFactor,

         folderAreaHeight: 604,
         startY: 258,
      }
   }
}
