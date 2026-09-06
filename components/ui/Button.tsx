// components/ui/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white cursor-pointer justify-center',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-green-500/30 cursor-pointer justify-center',
    outline: 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all cursor-pointer justify-center',
    danger: 'bg-red-600 hover:bg-red-700 text-white cursor-pointer justify-center'
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2 text-base rounded-lg',
    lg: 'px-6 py-2.5 text-lg rounded-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        inline-flex items-center gap-2
        text-center
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}