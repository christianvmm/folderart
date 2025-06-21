import { IconCustomizer } from '@/src/features/icons/IconCustomizer'

export class MacFolderCustomizer extends IconCustomizer {
   protected get constraints() {
      return {
         maxWidth: 768,
         maxHeight: 384,
         preferredSize: 384,
         folderAreaHeight: 604,
         startY: 258,
      }
   }
}
