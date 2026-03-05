// components/layout/navbar.tsx - Super Ultra Simplified Version

'use client'

import { useState } from 'react'
import Link from 'next/link'
import MobileNav from './mobile-nav'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Cart', href: '/cart' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-xl">
              Herbal<span className="text-pink-400">Healing</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Admin Info (Desktop) */}
            <div className="hidden md:block text-right">
              <p className="text-white text-sm">Hafiz Sajid</p>
              <p className="text-white/50 text-xs">Admin</p>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}