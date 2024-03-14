import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
   title: 'FolderArt by christianvm - Folder Icon Maker',
   description: 'Create custom icons for files or folders for macOS',
   metadataBase: new URL('https://folderart.christianvm.dev'),
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
         <body>
            {children}
            <Analytics />
         </body>
      </html>
   )
}
