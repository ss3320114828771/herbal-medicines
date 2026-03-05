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

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    imageUrl: '',
    herbal: true
  })

  const categories = [
    'Immune Support',
    'Digestive Health',
    'Stress Relief',
    'Energy Boost',
    'Sleep Aid',
    'Heart Health',
    'Liver Care',
    'Joint Support'
  ]

  useEffect(() => {
    fetchProduct()
  }, [params.productId])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`)
      const data = await res.json()
      setFormData(data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to update product')

      setSuccess('Product updated successfully!')
      setTimeout(() => {
        router.push('/dashboard/products')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete product')

      router.push('/dashboard/products')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold glowing-text">Edit Product</h1>
            <p className="text-white/60 mt-2">Update product information</p>
          </div>
          <Link
            href="/dashboard/products"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center mb-8">
        <p className="text-2xl font-arabic text-white/60">﷽</p>
      </div>

      {/* Edit Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200">
              {success}
            </div>
          )}

          {/* Basic Information */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Stock</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
              placeholder="Enter product description..."
            />
          </div>

          {/* Image & Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Product Image</h2>
              
              {/* Image Preview */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 neon-border">
                <Image
                  src={formData.imageUrl || `/n${Math.floor(Math.random() * 6) + 1}.jpeg`}
                  alt="Product preview"
                  fill
                  className="object-cover"
                />
              </div>

              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                placeholder="Image URL"
              />
              <p className="text-white/40 text-sm mt-2">Leave empty to use default image</p>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Product Settings</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.herbal}
                    onChange={(e) => setFormData({...formData, herbal: e.target.checked})}
                    className="w-5 h-5 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-white/80">This is a herbal product</span>
                </label>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <span className="font-bold">Product ID:</span> {formData.id}
                  </p>
                  <p className="text-blue-300 text-sm mt-1">
                    Set as herbal to display the herbal badge on the product page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 font-semibold hover:bg-red-500/30 transition-colors"
            >
              Delete Product
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 glowing-button disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Info */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
        <p className="text-white/20 text-xs">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  )
}