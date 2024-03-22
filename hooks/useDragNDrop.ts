import { DragEvent } from 'react'

export function useDragNDrop(handler: (event: DragEvent<HTMLElement>) => void) {
   function onDrop(e: DragEvent<HTMLElement>) {
      e.preventDefault()
      handler(e)
   }

   function onDragOver(e: DragEvent<HTMLElement>) {
      e.preventDefault()
   }

   function onDragEnter(e: DragEvent<HTMLElement>) {
      e.preventDefault()
   }

   return {
      onDragOver,
      onDragEnter,
      onDrop,
   }
}
