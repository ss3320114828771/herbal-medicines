// components/shop/product-card.tsx - Super Ultra Simplified Version

'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
}

export default function ProductCard({ id, name, price, image, category, description }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="bg-white/10 rounded-xl p-3 hover:scale-105 transition-all">
        
        {/* Product Image */}
        <div className="relative h-36 bg-purple-600 rounded-lg mb-2 overflow-hidden">
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover"
          />
          
          {/* Category Badge */}
          <span className="absolute top-1 left-1 bg-pink-600 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Product Info */}
        <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
        
        {description && (
          <p className="text-white/50 text-xs mb-2 line-clamp-2">{description}</p>
        )}
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="text-green-300 font-bold">${price.toFixed(2)}</span>
          
          {/* Quick Add Button */}
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Add to cart functionality here
              alert('Added to cart!')
            }}
            className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}