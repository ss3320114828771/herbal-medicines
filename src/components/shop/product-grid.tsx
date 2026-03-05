// components/shop/product-grid.tsx - Super Ultra Simplified Version

'use client'

import { useState, useEffect } from 'react'
import ProductCard from './product-card'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
}

interface ProductGridProps {
  category?: string
  limit?: number
  featured?: boolean
}

export default function ProductGrid({ category = 'All', limit = 8, featured = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sample products data
    const allProducts: Product[] = [
      {
        id: '1',
        name: 'Black Seed Oil',
        price: 45.99,
        image: '/n1.jpeg',
        category: 'Immune Support',
        description: 'Pure cold-pressed black seed oil'
      },
      {
        id: '2',
        name: 'Organic Raw Honey',
        price: 64.52,
        image: '/n2.jpeg',
        category: 'Digestive Health',
        description: 'Raw honey with healing herbs'
      },
      {
        id: '3',
        name: 'Immune Booster',
        price: 89.99,
        image: '/n3.jpeg',
        category: 'Immune Support',
        description: 'Echinacea and elderberry blend'
      },
      {
        id: '4',
        name: 'Stress Relief',
        price: 52.50,
        image: '/n4.jpeg',
        category: 'Stress Relief',
        description: 'Ashwagandha formula'
      },
      {
        id: '5',
        name: 'Digestive Tea',
        price: 45.25,
        image: '/n5.jpeg',
        category: 'Digestive Health',
        description: 'Peppermint and ginger tea'
      },
      {
        id: '6',
        name: 'Sleep Aid',
        price: 67.80,
        image: '/n6.jpeg',
        category: 'Sleep Aid',
        description: 'Valerian root complex'
      },
      {
        id: '7',
        name: 'Joint Support',
        price: 54.99,
        image: '/n1.jpeg',
        category: 'Joint Support',
        description: 'Turmeric and ginger'
      },
      {
        id: '8',
        name: 'Heart Health',
        price: 48.50,
        image: '/n2.jpeg',
        category: 'Heart Health',
        description: 'Hawthorn berry formula'
      }
    ]

    // Filter products
    let filtered = allProducts
    
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category)
    }
    
    if (featured) {
      filtered = filtered.slice(0, 4) // First 4 as featured
    }

    // Apply limit
    filtered = filtered.slice(0, limit)

    setProducts(filtered)
    setLoading(false)
  }, [category, limit, featured])

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-white/50">
        No products found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          description={product.description}
        />
      ))}
    </div>
  )
}