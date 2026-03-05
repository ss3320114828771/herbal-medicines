// components/layout/mobile-nav.tsx - Super Ultra Simplified Version

'use client'

import Link from 'next/link'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Cart', href: '/cart' },
    { name: 'Admin', href: '/dashboard' },
  ]

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 z-50"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-purple-900 to-pink-900 z-50 p-5">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-white font-bold">Menu</h2>
          <button onClick={onClose} className="text-white text-xl">✕</button>
        </div>

        {/* Admin Info */}
        <div className="bg-white/10 p-3 rounded-lg mb-5">
          <p className="text-white text-sm">Hafiz Sajid Syed</p>
          <p className="text-white/50 text-xs">sajid.syed@gmail.com</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block bg-white/10 text-white p-3 rounded-lg hover:bg-white/20"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Bismillah */}
        <div className="absolute bottom-5 left-5 right-5 text-center">
          <p className="text-white/30 text-2xl">﷽</p>
        </div>
      </div>
    </>
  )
}