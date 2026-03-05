// app/page.tsx - Complete Home Page with All Navigation Links
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  // Navigation items for display
  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🌿' },
    { name: 'About', href: '/about', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
    { name: 'Directions', href: '/directions', icon: '🗺️' },
    { name: 'Cart', href: '/cart', icon: '🛒' }
  ]

  // Products data
  const products = [
    { id: '1', name: 'Black Seed Oil', price: 45.99, image: '/n1.jpeg', category: 'Immune Support' },
    { id: '2', name: 'Organic Honey', price: 64.52, image: '/n2.jpeg', category: 'Digestive Health' },
    { id: '3', name: 'Immune Booster', price: 89.99, image: '/n3.jpeg', category: 'Immune Support' },
    { id: '4', name: 'Stress Relief', price: 52.50, image: '/n4.jpeg', category: 'Stress Relief' },
    { id: '5', name: 'Digestive Tea', price: 45.25, image: '/n5.jpeg', category: 'Digestive Health' },
    { id: '6', name: 'Sleep Aid', price: 67.80, image: '/n6.jpeg', category: 'Sleep Aid' }
  ]

  return (
    <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 min-h-screen">
      
      {/* Bismillah */}
      <div className="text-center pt-20 pb-5">
        <h1 className="text-5xl text-white">﷽</h1>
        <p className="text-white/60 text-sm mt-2">In the name of Allah, the Most Gracious, the Most Merciful</p>
      </div>

      {/* Navigation Buttons - All Pages Visible */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 p-5">
        {navItems.map(item => (
          <Link 
            key={item.href}
            href={item.href}
            className="bg-white/10 hover:bg-pink-600 text-white p-3 rounded-xl text-center transition-all"
          >
            <span className="text-2xl block mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center text-white p-5">
        <h1 className="text-5xl font-bold mb-3">Herbal Healing</h1>
        <p className="text-xl mb-5">Natural remedies for your health</p>
        
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/products" className="bg-pink-600 text-white px-6 py-3 rounded-full">
            Shop All Products
          </Link>
          <Link href="/about" className="border border-white text-white px-6 py-3 rounded-full">
            Learn More
          </Link>
        </div>
      </div>

      {/* Quick Category Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-5">
        <Link href="/products?category=Immune Support" className="bg-purple-600/30 p-2 rounded-lg text-white text-center text-sm">
          🛡️ Immune Support
        </Link>
        <Link href="/products?category=Digestive Health" className="bg-green-600/30 p-2 rounded-lg text-white text-center text-sm">
          🌱 Digestive Health
        </Link>
        <Link href="/products?category=Stress Relief" className="bg-blue-600/30 p-2 rounded-lg text-white text-center text-sm">
          🧘 Stress Relief
        </Link>
        <Link href="/products?category=Sleep Aid" className="bg-indigo-600/30 p-2 rounded-lg text-white text-center text-sm">
          😴 Sleep Aid
        </Link>
      </div>

      {/* Images Gallery */}
      <h2 className="text-2xl text-white text-center mt-5">Our Products</h2>
      <div className="grid grid-cols-3 gap-2 p-5">
        {[1,2,3,4,5,6].map(num => (
          <div key={num} className="h-24 bg-purple-700 rounded-lg overflow-hidden">
            <Image src={`/n${num}.jpeg`} alt="herbal" width={100} height={100} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Health Message */}
      <div className="bg-white/10 m-5 p-5 rounded-2xl text-white">
        <h2 className="text-2xl text-center mb-3">Health is Wealth</h2>
        <p className="text-center mb-3">"There are two blessings which many people waste: health and free time." - Prophet Muhammad (ﷺ)</p>
        <p className="text-center text-sm">Take care of your body with natural herbal medicines.</p>
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl text-white text-center mt-5">Featured Products</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.id}`} className="bg-white/10 p-3 rounded-xl hover:scale-105 transition-all">
            <div className="h-32 bg-purple-600 rounded-lg mb-2 overflow-hidden">
              <Image src={p.image} alt={p.name} width={200} height={200} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white font-bold text-sm">{p.name}</h3>
            <p className="text-green-300 font-bold">${p.price}</p>
            <p className="text-white/50 text-xs">{p.category}</p>
          </Link>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2 className="text-2xl text-white text-center mt-5">Why Choose Us</h2>
      <div className="grid grid-cols-2 gap-3 p-5 text-white text-center">
        <div className="bg-white/10 p-3 rounded-xl">
          <span className="text-3xl">🌿</span>
          <p>100% Natural</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <span className="text-3xl">🔬</span>
          <p>Lab Tested</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <span className="text-3xl">📜</span>
          <p>Traditional</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <span className="text-3xl">🌍</span>
          <p>Sustainable</p>
        </div>
      </div>

      {/* Quick Links to Important Pages */}
      <div className="grid grid-cols-2 gap-3 p-5">
        <Link href="/about" className="bg-purple-600/30 p-4 rounded-xl text-center">
          <span className="text-3xl block mb-2">📖</span>
          <span className="text-white font-bold">About Us</span>
          <p className="text-white/60 text-sm">Learn our story</p>
        </Link>
        <Link href="/contact" className="bg-pink-600/30 p-4 rounded-xl text-center">
          <span className="text-3xl block mb-2">📞</span>
          <span className="text-white font-bold">Contact</span>
          <p className="text-white/60 text-sm">Get in touch</p>
        </Link>
        <Link href="/directions" className="bg-blue-600/30 p-4 rounded-xl text-center">
          <span className="text-3xl block mb-2">🗺️</span>
          <span className="text-white font-bold">Directions</span>
          <p className="text-white/60 text-sm">How to use</p>
        </Link>
        <Link href="/cart" className="bg-green-600/30 p-4 rounded-xl text-center">
          <span className="text-3xl block mb-2">🛒</span>
          <span className="text-white font-bold">Cart</span>
          <p className="text-white/60 text-sm">Your items</p>
        </Link>
      </div>

      {/* Newsletter */}
      <div className="bg-white/10 m-5 p-5 rounded-2xl text-center">
        <h3 className="text-white text-xl mb-3">Stay Updated</h3>
        <p className="text-white/60 text-sm mb-3">Subscribe for health tips and offers</p>
        <input 
          type="email" 
          placeholder="Your email" 
          className="w-full p-3 rounded-lg mb-3 bg-white/20 text-white placeholder-white/50"
        />
        <button className="bg-pink-600 text-white px-6 py-3 rounded-full w-full">Subscribe</button>
      </div>

      {/* Admin Info */}
      <div className="text-center text-white/50 p-5 border-t border-white/20 mt-5">
        <p className="font-bold">Hafiz Sajid Syed</p>
        <p className="text-sm">sajidsyedhafizsajidsyed@gmail.com</p>
        <p className="text-xs mt-2 text-white/30">Administrator</p>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 p-5 text-white/50 text-sm flex-wrap">
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/products" className="hover:text-white">Products</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/contact" className="hover:text-white">Contact</Link>
        <Link href="/directions" className="hover:text-white">Directions</Link>
        <Link href="/cart" className="hover:text-white">Cart</Link>
      </div>

      {/* Footer Bismillah */}
      <div className="text-center pb-5">
        <p className="text-2xl text-white/30">﷽</p>
      </div>
      
    </div>
  )
}