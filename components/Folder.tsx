'use client'
import Image from 'next/image'
import folderImage from '../resources/folders/dark/icon_256x256@2x.png'

export function Folder() {
   return (
      <Image
         width={256}
         height={256}
         src={folderImage}
         alt='macOS folder icon'
      />
   )
}
