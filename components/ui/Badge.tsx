// components/ui/Badge.tsx
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'live' | 'recorded' | 'success' | 'warning' | 'info' | 'default'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    live: 'bg-red-500 text-white animate-pulse',
    recorded: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-cyan-500 text-white',
    default: 'bg-gray-500 text-white'
  }

  return (
    <span className={`
      ${variants[variant]}
      px-2.5
      py-0.5
      rounded-full
      text-xs
      font-semibold
      inline-flex
      items-center
      gap-1
    `}>
      {variant === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
      )}
      {children}
    </span>
  )
}