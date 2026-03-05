'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'register' })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/stars-bg.gif')] opacity-30" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Bismillah */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-arabic glowing-text">﷽</h1>
        </div>

        {/* Register Card */}
        <div className="glass-effect rounded-3xl p-8 neon-border">
          <h2 className="text-3xl font-bold text-center mb-8 glowing-text">
            Create Account
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glowing-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-white/60">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-300 hover:text-pink-200 transition-colors">
              Login here
            </Link>
          </div>

          {/* Admin Info */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">Hafiz Sajid Syed</p>
            <p className="text-white/60 text-xs">sajid.syed@gmail.com</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 floating">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-3xl opacity-30" />
        </div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 floating" style={{ animationDelay: '1.5s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-30" />
        </div>
      </div>
    </div>
  )
}