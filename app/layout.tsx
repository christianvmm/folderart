import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
   title: 'FolderArt - Custom Folder Icons',
   description: 'Create custom folder icons for macOS and Windows.',
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
