// components/ui/Textarea.tsx
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full
            px-4
            py-2
            bg-gray-700
            border
            ${error ? 'border-red-500' : 'border-gray-600'}
            rounded-lg
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:border-green-500
            focus:ring-1
            focus:ring-green-500
            transition-colors
            resize-vertical
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'