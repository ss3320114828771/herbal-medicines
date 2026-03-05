// components/ui/button.tsx - Super Ultra Simplified Version

'use client'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: ButtonProps) {
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/30',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30'
  }

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg font-semibold transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}