import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
   title: 'FolderArt for macOS',
   description: 'Generate folder icons for macOS',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
         <body>{children}</body>
      </html>
   )
}
