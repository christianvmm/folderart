import { IconCustomizer } from '@/src/features/icons/IconCustomizer'

export class WindowsFolderCustomizer extends IconCustomizer {
   protected get constraints() {
      return {
         maxWidth: 768,
         maxHeight: 384,
         preferredSize: 384,
         folderAreaHeight: 546,
         startY: 286,
      }
   }
}
