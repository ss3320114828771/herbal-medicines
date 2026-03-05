'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
  herbal: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Black Seed Oil - Premium Grade',
          description: 'Pure cold-pressed black seed oil for immune support',
          price: 45.99,
          stock: 25,
          category: 'Immune Support',
          imageUrl: '/n1.jpeg',
          herbal: true
        },
        {
          id: '2',
          name: 'Organic Raw Honey with Herbs',
          description: 'Raw organic honey infused with traditional healing herbs',
          price: 64.52,
          stock: 15,
          category: 'Digestive Health',
          imageUrl: '/n2.jpeg',
          herbal: true
        },
        {
          id: '3',
          name: 'Immune Boosting Herbal Complex',
          description: 'Powerful blend of echinacea, elderberry, and zinc',
          price: 89.99,
          stock: 8,
          category: 'Immune Support',
          imageUrl: '/n3.jpeg',
          herbal: true
        },
        {
          id: '4',
          name: 'Stress Relief Ashwagandha Formula',
          description: 'Ashwagandha and holy basil for stress relief',
          price: 52.50,
          stock: 20,
          category: 'Stress Relief',
          imageUrl: '/n4.jpeg',
          herbal: true
        },
        {
          id: '5',
          name: 'Digestive Health Herbal Tea',
          description: 'Soothing blend of peppermint, ginger, and fennel',
          price: 45.25,
          stock: 30,
          category: 'Digestive Health',
          imageUrl: '/n5.jpeg',
          herbal: true
        },
        {
          id: '6',
          name: 'Sleep Aid Valerian Root Complex',
          description: 'Natural sleep aid with valerian root and chamomile',
          price: 67.80,
          stock: 12,
          category: 'Sleep Aid',
          imageUrl: '/n6.jpeg',
          herbal: true
        },
        {
          id: '7',
          name: 'Joint Support Turmeric Complex',
          description: 'Turmeric and ginger for joint health',
          price: 54.99,
          stock: 18,
          category: 'Joint Support',
          imageUrl: '/n1.jpeg',
          herbal: true
        },
        {
          id: '8',
          name: 'Heart Health Hawthorn Berry',
          description: 'Hawthorn berry and garlic for cardiovascular health',
          price: 48.50,
          stock: 22,
          category: 'Heart Health',
          imageUrl: '/n2.jpeg',
          herbal: true
        }
      ]
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['All', 'Immune Support', 'Digestive Health', 'Stress Relief', 'Sleep Aid', 'Joint Support', 'Heart Health']

  // Filter products
  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

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
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-arabic glowing-text">﷽</h1>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glowing-text">
          Our Herbal Products
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Discover nature's finest remedies, carefully curated for your wellness journey
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'gradient-bg text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-white/60">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-white/60">
        Showing {filteredProducts.length} products
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-effect rounded-3xl p-12 text-center">
          <svg className="w-20 h-20 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
          <p className="text-white/60">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-effect rounded-2xl p-4 hover:scale-105 transition-all duration-500 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.herbal && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-500/80 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                      <span>🌿</span> Herbal
                    </div>
                  )}
                  {product.stock < 10 && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-500/80 text-white text-xs font-semibold backdrop-blur-sm">
                      Low Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-white/40 text-sm">{product.category}</span>
                  </div>
                </div>

                {/* Add to Cart Button (on hover) */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full py-2 rounded-lg gradient-bg text-white text-sm font-semibold">
                    Quick Add
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Featured Categories */}
      <section className="mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 glowing-text">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.filter(c => c !== 'All').map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center text-white text-xl">
                {category === 'Immune Support' && '🛡️'}
                {category === 'Digestive Health' && '🌱'}
                {category === 'Stress Relief' && '🧘'}
                {category === 'Sleep Aid' && '😴'}
                {category === 'Joint Support' && '🦴'}
                {category === 'Heart Health' && '❤️'}
              </div>
              <h3 className="text-white text-sm font-semibold">{category}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mt-20 glass-effect rounded-3xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive offers, health tips, and new product announcements
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
          <button className="px-6 py-3 glowing-button whitespace-nowrap">
            Subscribe
          </button>
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