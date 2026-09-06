// components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-gray-800 
        rounded-lg 
        overflow-hidden 
        shadow-lg 
        ${hover ? 'hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}