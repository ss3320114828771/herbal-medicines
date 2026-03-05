'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  createdAt: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    fetchProduct()
  }, [params.productId])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`)
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product?.id,
          quantity
        })
      })

      if (res.ok) {
        router.push('/cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Product not found</h2>
          <Link href="/products" className="glowing-button inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-arabic glowing-text">﷽</h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/60 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>→</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>→</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Product Main Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative group">
          <div className="relative h-96 rounded-3xl overflow-hidden neon-border">
            <Image
              src={product.imageUrl || `/n${Math.floor(Math.random() * 6) + 1}.jpeg`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Badges */}
          {product.herbal && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-500/80 text-white text-sm font-semibold backdrop-blur-sm">
              🌿 100% Herbal
            </div>
          )}
          {product.stock < 10 && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/80 text-white text-sm font-semibold backdrop-blur-sm">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 glowing-text">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-white/60">Category:</span>
            <Link 
              href={`/products?category=${product.category}`}
              className="px-3 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
            >
              {product.category}
            </Link>
          </div>

          {/* Short Description */}
          <p className="text-white/80 leading-relaxed">
            {product.description.substring(0, 200)}...
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-white/80">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                -
              </button>
              <span className="w-16 text-center text-white font-bold text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-white/60 text-sm">({product.stock} available)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 glowing-button"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Stock Status */}
          <div className={`p-4 rounded-lg ${product.stock > 0 ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <p className={`text-center font-semibold ${product.stock > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-effect rounded-3xl p-6">
        <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
          {['description', 'benefits', 'usage', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'gradient-bg text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-white/80 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Product Description</h3>
              <p>{product.description}</p>
              <p className="mt-4">
                This premium herbal formulation is carefully crafted using traditional methods 
                combined with modern quality standards. Each batch is tested for purity and potency 
                to ensure you receive the highest quality product.
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Supports natural healing processes</li>
                <li>100% natural ingredients</li>
                <li>No artificial additives</li>
                <li>Traditional formulation</li>
                <li>Modern quality control</li>
                <li>Suitable for long-term use</li>
              </ul>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">How to Use</h3>
              <p>Take 1-2 capsules twice daily with water, preferably after meals. For best results, use consistently for at least 3 months.</p>
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 font-semibold">⚠️ Important:</p>
                <p className="text-white/80 mt-2">Consult with a healthcare professional before use if you are pregnant, nursing, or have any medical conditions.</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Customer Reviews</h3>
              
              {/* Review Form */}
              <div className="glass-effect rounded-xl p-4">
                <textarea
                  placeholder="Write a review..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white">Ahmed R.</span>
                    <span className="text-white/40 text-sm">2 weeks ago</span>
                  </div>
                  <p className="text-white/80">Excellent product! Noticed improvement within days.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white">Fatima S.</span>
                    <span className="text-white/40 text-sm">1 month ago</span>
                  </div>
                  <p className="text-white/80">High quality and fast shipping. Will order again.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 glowing-text">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link
              key={i}
              href={`/products/related-${i}`}
              className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={`/n${i}.jpeg`}
                  alt={`Related product ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-white font-semibold">Herbal Product {i}</h3>
              <p className="text-green-300">$29.99</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Herbal Healing Administrator</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}