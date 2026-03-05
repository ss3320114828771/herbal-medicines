// hooks/use-products.ts - Super Ultra Simplified Version

'use client'

import { useState, useEffect } from 'react'

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

interface UseProductsProps {
  category?: string
  search?: string
  limit?: number
}

export function useProducts({ category, search, limit }: UseProductsProps = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Sample products data
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Black Seed Oil',
      description: 'Pure cold-pressed black seed oil for immune support',
      price: 45.99,
      stock: 25,
      category: 'Immune Support',
      imageUrl: '/n1.jpeg',
      herbal: true
    },
    {
      id: '2',
      name: 'Organic Raw Honey',
      description: 'Raw organic honey with traditional healing herbs',
      price: 64.52,
      stock: 15,
      category: 'Digestive Health',
      imageUrl: '/n2.jpeg',
      herbal: true
    },
    {
      id: '3',
      name: 'Immune Booster',
      description: 'Powerful blend of echinacea and elderberry',
      price: 89.99,
      stock: 8,
      category: 'Immune Support',
      imageUrl: '/n3.jpeg',
      herbal: true
    },
    {
      id: '4',
      name: 'Stress Relief Formula',
      description: 'Ashwagandha and holy basil for stress relief',
      price: 52.50,
      stock: 20,
      category: 'Stress Relief',
      imageUrl: '/n4.jpeg',
      herbal: true
    },
    {
      id: '5',
      name: 'Digestive Tea',
      description: 'Soothing blend of peppermint, ginger, and fennel',
      price: 45.25,
      stock: 30,
      category: 'Digestive Health',
      imageUrl: '/n5.jpeg',
      herbal: true
    },
    {
      id: '6',
      name: 'Sleep Aid',
      description: 'Natural sleep aid with valerian root and chamomile',
      price: 67.80,
      stock: 12,
      category: 'Sleep Aid',
      imageUrl: '/n6.jpeg',
      herbal: true
    }
  ]

  useEffect(() => {
    fetchProducts()
  }, [category, search])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      let filtered = [...allProducts]

      // Filter by category
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category)
      }

      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        )
      }

      // Apply limit
      if (limit) {
        filtered = filtered.slice(0, limit)
      }

      setProducts(filtered)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, refetch: fetchProducts }
}

// Hook for single product
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      // Sample products data
      const allProducts: Product[] = [
        {
          id: '1',
          name: 'Black Seed Oil',
          description: 'Pure cold-pressed black seed oil for immune support',
          price: 45.99,
          stock: 25,
          category: 'Immune Support',
          imageUrl: '/n1.jpeg',
          herbal: true
        },
        {
          id: '2',
          name: 'Organic Raw Honey',
          description: 'Raw organic honey with traditional healing herbs',
          price: 64.52,
          stock: 15,
          category: 'Digestive Health',
          imageUrl: '/n2.jpeg',
          herbal: true
        },
        {
          id: '3',
          name: 'Immune Booster',
          description: 'Powerful blend of echinacea and elderberry',
          price: 89.99,
          stock: 8,
          category: 'Immune Support',
          imageUrl: '/n3.jpeg',
          herbal: true
        },
        {
          id: '4',
          name: 'Stress Relief Formula',
          description: 'Ashwagandha and holy basil for stress relief',
          price: 52.50,
          stock: 20,
          category: 'Stress Relief',
          imageUrl: '/n4.jpeg',
          herbal: true
        }
      ]

      const found = allProducts.find(p => p.id === id)
      
      if (found) {
        setProduct(found)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  return { product, loading, error, refetch: fetchProduct }
}

// Hook for featured products
export function useFeaturedProducts(limit: number = 4) {
  return useProducts({ limit })
}

// Hook for related products
export function useRelatedProducts(category: string, currentId: string, limit: number = 4) {
  const { products, loading, error } = useProducts({ category, limit: limit + 1 })
  
  // Filter out current product
  const related = products.filter(p => p.id !== currentId).slice(0, limit)
  
  return { products: related, loading, error }
}