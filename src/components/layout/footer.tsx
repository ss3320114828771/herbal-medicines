// components/layout/footer.tsx - Super Ultra Simplified Version

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/30 text-white mt-10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* About Section */}
          <div>
            <h3 className="text-pink-400 font-bold mb-3">Herbal Healing</h3>
            <p className="text-white/60 text-sm">Natural remedies for better health since 2020</p>
            <div className="mt-3">
              <p className="text-white/40 text-xs">Hafiz Sajid Syed</p>
              <p className="text-white/40 text-xs">sajid.syed@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-pink-400 font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/60 hover:text-white">Home</Link></li>
              <li><Link href="/products" className="text-white/60 hover:text-white">Products</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-pink-400 font-bold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Immune Support" className="text-white/60 hover:text-white">Immune Support</Link></li>
              <li><Link href="/products?category=Digestive Health" className="text-white/60 hover:text-white">Digestive Health</Link></li>
              <li><Link href="/products?category=Stress Relief" className="text-white/60 hover:text-white">Stress Relief</Link></li>
              <li><Link href="/products?category=Sleep Aid" className="text-white/60 hover:text-white">Sleep Aid</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-pink-400 font-bold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/60">📍 123 Herbal Street</li>
              <li className="text-white/60">📞 +1 234 567 890</li>
              <li className="text-white/60">✉️ info@herbalhealing.com</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/20">
          <a href="#" className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20">f</a>
          <a href="#" className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20">t</a>
          <a href="#" className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20">ig</a>
          <a href="#" className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20">in</a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-white/40 text-sm">
          <p>© {currentYear} Herbal Healing. All rights reserved.</p>
          <p className="text-xs mt-2">Made with ❤️ for natural healing</p>
        </div>

        {/* Bismillah */}
        <div className="text-center mt-4">
          <p className="text-2xl text-white/20">﷽</p>
        </div>
      </div>
    </footer>
  )
}