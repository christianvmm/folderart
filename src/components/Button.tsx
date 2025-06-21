type ButtonVariant = 'contained' | 'outlined'
type ColorScheme = 'black'

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
   variant?: ButtonVariant
   colorScheme?: ColorScheme
}

export function Button({
   className = '',
   colorScheme = 'black',
   variant = 'contained',
   ...props
}: ButtonProps) {
   const variantCn = variants[colorScheme][variant]

   return (
      <button
         {...props}
         className={`flex items-center justify-center text-center gap-2 px-4 rounded-md cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-65
         transition-colors font-medium h-10 border ${variantCn} ${className}`}
      ></button>
   )
}

const variants: Record<ColorScheme, Record<ButtonVariant, string>> = {
   black: {
      contained: 'border-zinc-950 text-white bg-zinc-950 hover:bg-zinc-800 ',
      outlined: 'border-zinc-200 hover:bg-zinc-50',
   },
}
