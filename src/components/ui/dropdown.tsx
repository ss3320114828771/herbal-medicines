// components/ui/dropdown.tsx - Super Ultra Simplified Version

'use client'

import { useState, useRef, useEffect } from 'react'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
}

export default function Dropdown({ trigger, children, align = 'left' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            absolute top-full mt-2 min-w-[200px] 
            bg-purple-900 rounded-lg shadow-xl 
            border border-white/20 z-50
            ${align === 'left' ? 'left-0' : 'right-0'}
          `}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

// Dropdown Item Component
export function DropdownItem({ 
  children, 
  onClick,
  href
}: { 
  children: React.ReactNode
  onClick?: () => void
  href?: string
}) {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
    >
      {children}
    </Component>
  )
}

// Dropdown Divider Component
export function DropdownDivider() {
  return <div className="border-t border-white/20 my-1" />
}