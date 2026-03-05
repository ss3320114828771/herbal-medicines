// hooks/use-cart.ts - Super Ultra Simplified Version

'use client'

import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveCart = (newItems: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
    setItems(newItems)
  }

  const addItem = (product: {
    id: string
    name: string
    price: number
    image: string
  }, quantity: number = 1) => {
    
    setItems(prev => {
      // Check if item already exists
      const existingItem = prev.find(item => item.productId === product.id)
      
      if (existingItem) {
        // Update quantity
        const updated = prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        saveCart(updated)
        return updated
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image
        }
        const updated = [...prev, newItem]
        saveCart(updated)
        return updated
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.productId !== productId)
      saveCart(updated)
      return updated
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems(prev => {
      const updated = prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
      saveCart(updated)
      return updated
    })
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isEmpty: items.length === 0
  }
}

// Helper hook for cart count badge
export function useCartCount() {
  const { getItemCount, items } = useCart()
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(getItemCount())
  }, [items, getItemCount])

  return count
}