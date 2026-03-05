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
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    // Simulate fetching product data
    setTimeout(() => {
      const mockProduct: Product = {
        id: params.productId as string,
        name: getProductName(params.productId as string),
        description: getProductDescription(params.productId as string),
        price: getProductPrice(params.productId as string),
        stock: getProductStock(params.productId as string),
        category: getProductCategory(params.productId as string),
        imageUrl: `/n${Math.floor(Math.random() * 6) + 1}.jpeg`,
        herbal: true
      }
      setProduct(mockProduct)
      setLoading(false)
    }, 1000)
  }, [params.productId])

  const getProductName = (id: string): string => {
    const names: { [key: string]: string } = {
      '1': 'Black Seed Oil - Premium Grade',
      '2': 'Organic Raw Honey with Herbs',
      '3': 'Immune Boosting Herbal Complex',
      '4': 'Stress Relief Ashwagandha Formula',
      '5': 'Digestive Health Herbal Tea',
      '6': 'Sleep Aid Valerian Root Complex'
    }
    return names[id] || 'Herbal Product'
  }

  const getProductDescription = (id: string): string => {
    const descriptions: { [key: string]: string } = {
      '1': 'Pure cold-pressed black seed oil (Nigella sativa), known as the "seed of blessing" in Islamic tradition. This premium oil is rich in thymoquinone and has been used for centuries to support immune health, respiratory function, and overall wellness. Cold-pressed to preserve all beneficial compounds.',
      '2': 'Raw, unfiltered organic honey infused with a traditional blend of healing herbs including ginger, turmeric, and black seed. This powerful combination provides natural energy, soothes sore throats, and supports digestive health. Harvested from ethical beekeepers.',
      '3': 'A powerful synergistic blend of echinacea, elderberry, and zinc to naturally strengthen your immune system. This formula also includes vitamin C from amla fruit and propolis for maximum immune support. Perfect for seasonal changes.',
      '4': 'Science-backed ashwagandha root extract combined with holy basil (tulsi) to reduce stress, anxiety, and promote mental clarity. This adaptogenic formula helps balance cortisol levels and supports adrenal health.',
      '5': 'Soothing blend of organic peppermint, ginger, fennel seeds, and chamomile for optimal digestive health. This traditional formula helps reduce bloating, indigestion, and supports overall gut health. Caffeine-free and gentle.',
      '6': 'Natural sleep aid combining valerian root, passion flower, chamomile, and melatonin. This non-habit forming formula helps you fall asleep naturally and wake up refreshed without morning grogginess.'
    }
    return descriptions[id] || 'High-quality herbal product made with traditional methods and modern quality standards.'
  }

  const getProductPrice = (id: string): number => {
    const prices: { [key: string]: number } = {
      '1': 45.99,
      '2': 64.52,
      '3': 89.99,
      '4': 52.50,
      '5': 45.25,
      '6': 67.80
    }
    return prices[id] || 49.99
  }

  const getProductStock = (id: string): number => {
    const stocks: { [key: string]: number } = {
      '1': 25,
      '2': 15,
      '3': 8,
      '4': 20,
      '5': 30,
      '6': 12
    }
    return stocks[id] || 10
  }

  const getProductCategory = (id: string): string => {
    const categories: { [key: string]: string } = {
      '1': 'Immune Support',
      '2': 'Digestive Health',
      '3': 'Immune Support',
      '4': 'Stress Relief',
      '5': 'Digestive Health',
      '6': 'Sleep Aid'
    }
    return categories[id] || 'Herbal Supplements'
  }

  const addToCart = () => {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Add new item
    cart.push({
      id: Date.now().toString(),
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      quantity: quantity,
      image: product?.imageUrl,
      herbal: product?.herbal
    })
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Show success message
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
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
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = [
    { id: '2', name: 'Organic Raw Honey', price: 64.52, image: '/n2.jpeg' },
    { id: '3', name: 'Immune Booster', price: 89.99, image: '/n3.jpeg' },
    { id: '4', name: 'Stress Relief', price: 52.50, image: '/n4.jpeg' },
    { id: '5', name: 'Digestive Tea', price: 45.25, image: '/n5.jpeg' }
  ]

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-arabic glowing-text">﷽</h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/60 mb-8 text-sm flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>→</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>→</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
        <span>→</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Product Main Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative group">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden neon-border">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Badges */}
          {product.herbal && (
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500/90 text-white text-sm font-semibold backdrop-blur-sm flex items-center gap-1">
              <span>🌿</span> 100% Herbal
            </div>
          )}
          {product.stock < 10 && (
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-red-500/90 text-white text-sm font-semibold backdrop-blur-sm">
              Only {product.stock} left in stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 glowing-text">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                ${product.price.toFixed(2)}
              </p>
              {product.stock > 0 ? (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm border border-red-500/30">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Category & Ratings */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link 
              href={`/products?category=${product.category}`}
              className="px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors text-sm"
            >
              {product.category}
            </Link>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white/60 text-sm ml-2">(24 reviews)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 leading-relaxed">
            {product.description}
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              '100% Natural',
              'No Additives',
              'Lab Tested',
              'Traditional Recipe'
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-white/80">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-16 text-center text-white font-bold text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors disabled:opacity-50"
                disabled={quantity >= product.stock}
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
              disabled={product.stock === 0}
              className="flex-1 glowing-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="p-3 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Add to Cart Success Message */}
          {addedToCart && (
            <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-center animate-pulse">
              ✓ Added to cart successfully!
            </div>
          )}

          {/* Delivery Info */}
          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="text-center">
              <svg className="w-6 h-6 mx-auto text-white/40 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p className="text-white/60 text-xs">Free Shipping</p>
            </div>
            <div className="text-center">
              <svg className="w-6 h-6 mx-auto text-white/40 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white/60 text-xs">30 Day Return</p>
            </div>
            <div className="text-center">
              <svg className="w-6 h-6 mx-auto text-white/40 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-white/60 text-xs">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="glass-effect rounded-3xl p-6 mb-12">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6">
          {['description', 'ingredients', 'benefits', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'gradient-bg text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-white/80 leading-relaxed min-h-[200px]">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Product Description</h3>
              <p>{product.description}</p>
              <p className="mt-4">
                This premium herbal formulation is carefully crafted using traditional methods 
                combined with modern quality standards. Each batch is tested for purity and potency 
                to ensure you receive the highest quality product. Our herbs are sourced from 
                trusted organic farms and processed in GMP-certified facilities.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Key Ingredients</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Organic Black Seed (Nigella Sativa) - 500mg</li>
                <li>Raw Honey - 100mg</li>
                <li>Ginger Root Extract - 100mg</li>
                <li>Turmeric Powder - 50mg</li>
                <li>Vitamin C (from Amla) - 50mg</li>
                <li>Zinc Gluconate - 10mg</li>
              </ul>
              <p className="mt-4 text-white/60 text-sm">
                * Other ingredients: Vegetable cellulose (capsule), organic rice flour.
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Key Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Supports immune system function',
                  'Promotes respiratory health',
                  'Natural anti-inflammatory properties',
                  'Rich in antioxidants',
                  'Supports digestive health',
                  'Provides natural energy',
                  'Helps reduce stress',
                  'Promotes restful sleep'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Customer Reviews</h3>
              
              {/* Review Form */}
              <div className="glass-effect rounded-xl p-4">
                <textarea
                  placeholder="Write your review..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} className="text-white/40 hover:text-yellow-400 transition-colors">
                        ★
                      </button>
                    ))}
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {[
                  { name: 'Ahmed R.', rating: 5, comment: 'Excellent quality! Noticed results within a week.', date: '2 days ago' },
                  { name: 'Fatima K.', rating: 5, comment: 'Very authentic product. Highly recommended!', date: '1 week ago' },
                  { name: 'Yusuf M.', rating: 4, comment: 'Good product, fast shipping.', date: '2 weeks ago' }
                ].map((review, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-white">{review.name}</span>
                      <span className="text-white/40 text-sm">{review.date}</span>
                    </div>
                    <div className="flex gap-1 text-yellow-400 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      {[...Array(5-review.rating)].map((_, i) => (
                        <span key={i} className="text-white/20">★</span>
                      ))}
                    </div>
                    <p className="text-white/70">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 glowing-text">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>
              <p className="text-green-300 font-bold">${item.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Herbal Healing</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}