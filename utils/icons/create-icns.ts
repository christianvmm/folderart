'use server'
import { sh } from '@/utils/sh'
import { promises as fs } from 'fs'

const base = process.cwd()

export async function createIcns() {
   const theme = 'light'
   const source = `${base}/resources/folders/${theme}`
   const basename = `folder-icon-${theme}`
   const iconset = `${base}/${basename}.iconset`

   await fs.cp(source, iconset, { recursive: true })
   await sh(`iconutil -c icns ${iconset}`)

   const file = await fs.readFile(`${base}/${basename}.icns`)
   return file.toJSON()
}
