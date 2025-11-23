import * as React from 'react'

interface IconProps extends React.SVGAttributes<SVGElement> {
   children?: never
   color?: string
}

export const ReloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
   ({ color = 'currentColor', ...props }, forwardedRef) => {
      return (
         <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            ref={forwardedRef}
         >
            <path
               d='M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z'
               fill={color}
               fillRule='evenodd'
               clipRule='evenodd'
            />
         </svg>
      )
   }
)

ReloadIcon.displayName = 'ReloadIcon'

export const FolderIcon = React.forwardRef<SVGSVGElement, IconProps>(
   ({ color = 'currentColor', ...props }, forwardedRef) => {
      return (
         <svg
            fill='none'
            height='24'
            shapeRendering='geometricPrecision'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            width='24'
            {...props}
            ref={forwardedRef}
         >
            <path d='M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662' />
         </svg>
      )
   }
)
FolderIcon.displayName = 'FolderIcon'

export const DownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
   ({ color = 'currentColor', ...props }, forwardedRef) => {
      return (
         <svg
            data-testid='geist-icon'
            fill='none'
            height='24'
            shapeRendering='geometricPrecision'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            width='24'
            {...props}
            ref={forwardedRef}
         >
            <path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' />
            <path d='M7 10l5 5 5-5' />
            <path d='M12 15V3' />
         </svg>
      )
   }
)

DownloadIcon.displayName = 'DownloadIcon'

export const QuestionMarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
   ({ color = 'currentColor', ...props }, forwardedRef) => {
      return (
         <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            ref={forwardedRef}
         >
            <path
               d='M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z'
               fill={color}
               fillRule='evenodd'
               clipRule='evenodd'
            />
         </svg>
      )
   }
)

QuestionMarkIcon.displayName = 'QuestionMarkIcon'

// document.documentElement.classList.add('dark')