'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeChangeButton() {
   const [isDark, setIsDark] = useState(true)

   useEffect(() => {
      document.querySelector('main')?.classList.toggle('dark', isDark)
   }, [isDark])

   const toggleTheme = () => {
      setIsDark((prev) => !prev)
   }

   return (
      <button
         onClick={toggleTheme}
         className='flex items-center gap-2 px-4 py-2 mt-6 text-sm font-medium border rounded-full transition-colors border-zinc-300 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800'
      >
         {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
   )
}
