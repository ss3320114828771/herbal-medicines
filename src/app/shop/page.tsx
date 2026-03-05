'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

export default function ShopPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading featured products
    setTimeout(() => {
      setFeaturedProducts([
        {
          id: '1',
          name: 'Black Seed Oil',
          description: 'Pure cold-pressed black seed oil for immune support',
          price: 45.99,
          category: 'Immune Support',
          imageUrl: '/n1.jpeg'
        },
        {
          id: '2',
          name: 'Organic Raw Honey',
          description: 'Raw organic honey with traditional healing herbs',
          price: 64.52,
          category: 'Digestive Health',
          imageUrl: '/n2.jpeg'
        },
        {
          id: '3',
          name: 'Immune Booster',
          description: 'Powerful blend of echinacea and elderberry',
          price: 89.99,
          category: 'Immune Support',
          imageUrl: '/n3.jpeg'
        },
        {
          id: '4',
          name: 'Stress Relief Formula',
          description: 'Ashwagandha and holy basil for stress relief',
          price: 52.50,
          category: 'Stress Relief',
          imageUrl: '/n4.jpeg'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { name: 'Immune Support', icon: '🛡️', color: 'from-green-500 to-emerald-500', count: 12 },
    { name: 'Digestive Health', icon: '🌱', color: 'from-blue-500 to-cyan-500', count: 8 },
    { name: 'Stress Relief', icon: '🧘', color: 'from-purple-500 to-pink-500', count: 6 },
    { name: 'Sleep Aid', icon: '😴', color: 'from-indigo-500 to-purple-500', count: 5 },
    { name: 'Heart Health', icon: '❤️', color: 'from-red-500 to-pink-500', count: 4 },
    { name: 'Joint Support', icon: '🦴', color: 'from-yellow-500 to-orange-500', count: 7 }
  ]

  const benefits = [
    {
      title: '100% Natural',
      desc: 'All products are derived from natural sources',
      icon: '🌿'
    },
    {
      title: 'Lab Tested',
      desc: 'Third-party tested for purity and potency',
      icon: '🔬'
    },
    {
      title: 'Traditional Recipes',
      desc: 'Based on centuries-old healing wisdom',
      icon: '📜'
    },
    {
      title: 'Sustainable Sourcing',
      desc: 'Ethically sourced from organic farms',
      icon: '🌍'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-pink-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-arabic glowing-text">﷽</h1>
        <p className="text-white/60 mt-2">Welcome to our herbal shop</p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-[url('/herbal-bg.jpg')] bg-cover bg-center opacity-10 rounded-3xl" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="glowing-text bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Nature's Pharmacy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 floating">
            Discover the healing power of traditional herbal medicine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="glowing-button">
              Shop All Products
            </Link>
            <Link href="/categories" className="px-8 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all">
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Floating Herbs */}
        <div className="absolute top-10 left-10 hidden lg:block floating">
          <div className="w-20 h-20 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center text-4xl">
            🌿
          </div>
        </div>
        <div className="absolute bottom-10 right-10 hidden lg:block floating" style={{ animationDelay: '1s' }}>
          <div className="w-20 h-20 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center text-4xl">
            🌸
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:rotate-6 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-white font-bold mb-1">{category.name}</h3>
                <p className="text-white/40 text-sm">{category.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-effect rounded-2xl p-4 hover:scale-105 transition-all duration-500">
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-500/80 text-white text-xs">
                    Featured
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                <p className="text-white/60 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-white/40 text-sm">{product.category}</span>
                </div>
                <button className="w-full mt-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="text-5xl mb-4 block floating">{benefit.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="mb-20">
        <div className="glass-effect rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20" />
          
          <div className="relative z-10 text-center">
            <span className="text-yellow-300 font-bold text-sm uppercase tracking-wider">Limited Time Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Sign up for our newsletter and receive a 20% discount coupon on your first purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 glowing-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Ahmed Khan',
              review: 'Excellent quality products. The black seed oil has improved my health significantly.',
              rating: 5,
              image: '/customer1.jpg'
            },
            {
              name: 'Fatima Zahra',
              review: 'Fast shipping and great customer service. Highly recommended!',
              rating: 5,
              image: '/customer2.jpg'
            },
            {
              name: 'Mohammad Ali',
              review: 'Pure and authentic herbs. Will definitely order again.',
              rating: 5,
              image: '/customer3.jpg'
            }
          ].map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-effect rounded-2xl p-6"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/70 italic">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Herbal Healing</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 left-40 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" />
      <div className="fixed bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}