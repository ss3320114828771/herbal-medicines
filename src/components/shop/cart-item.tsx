// components/shop/cart-item.tsx - Super Ultra Simplified Version

'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  onUpdate: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({ id, name, price, quantity, image, onUpdate, onRemove }: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setItemQuantity(newQuantity)
    onUpdate(id, newQuantity)
  }

  return (
    <div className="bg-white/10 rounded-xl p-3 mb-3">
      <div className="flex gap-3">
        
        {/* Product Image */}
        <div className="w-20 h-20 bg-purple-600 rounded-lg overflow-hidden">
          <Image 
            src={image} 
            alt={name} 
            width={80} 
            height={80} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-white font-bold">{name}</h3>
            <button 
              onClick={() => onRemove(id)}
              className="text-red-400 text-sm"
            >
              ✕
            </button>
          </div>
          
          <p className="text-green-300 font-bold mt-1">${price.toFixed(2)}</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => handleQuantityChange(itemQuantity - 1)}
              className="bg-white/20 text-white w-6 h-6 rounded flex items-center justify-center"
            >
              -
            </button>
            <span className="text-white w-8 text-center">{itemQuantity}</span>
            <button 
              onClick={() => handleQuantityChange(itemQuantity + 1)}
              className="bg-white/20 text-white w-6 h-6 rounded flex items-center justify-center"
            >
              +
            </button>
            <span className="text-white/50 text-sm ml-2">
              Total: ${(price * itemQuantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}