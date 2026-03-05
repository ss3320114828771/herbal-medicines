'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  recentOrders: any[]
  lowStock: any[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStock: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      link: '/dashboard/products'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard/orders'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500',
      link: '/dashboard/customers'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-yellow-500 to-orange-500',
      link: '/dashboard/analytics'
    }
  ]

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold glowing-text">Dashboard</h1>
        <p className="text-white/60 mt-2">Welcome back, Hafiz Sajid Syed</p>
      </div>

      {/* Bismillah */}
      <div className="text-center">
        <p className="text-3xl font-arabic text-white/40">﷽</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={stat.title}
            href={stat.link}
            className="group relative overflow-hidden rounded-2xl glass-effect hover:scale-105 transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className="text-4xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="text-white/80 font-medium">{stat.title}</h3>
              <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white/40 text-sm">View all →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-white/60 hover:text-white transition-colors text-sm">
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentOrders.length === 0 ? (
              <p className="text-white/40 text-center py-8">No recent orders</p>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-white/40 text-sm">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${order.total}</p>
                    <p className={`text-xs ${order.status === 'DELIVERED' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Low Stock Alert</h2>
            <Link href="/dashboard/products" className="text-white/60 hover:text-white transition-colors text-sm">
              Manage stock →
            </Link>
          </div>

          <div className="space-y-4">
            {stats.lowStock.length === 0 ? (
              <p className="text-white/40 text-center py-8">All products are well stocked</p>
            ) : (
              stats.lowStock.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={product.image || `/n${Math.floor(Math.random() * 6) + 1}.jpeg`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-white/40 text-sm">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">{product.stock} left</p>
                    <p className="text-white/40 text-xs">Min: 10</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-effect rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/products/new"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center group transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white text-sm">Add Product</p>
          </Link>

          <Link
            href="/dashboard/orders"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center group transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-white text-sm">Process Orders</p>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center group transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-white text-sm">View Analytics</p>
          </Link>

          <Link
            href="/dashboard/settings"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center group transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <p className="text-white text-sm">Settings</p>
          </Link>
        </div>
      </div>

      {/* Admin Info */}
      <div className="text-center pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
        <p className="text-white/20 text-xs">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 right-40 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-10 pointer-events-none animate-pulse" />
      <div className="fixed bottom-40 left-40 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-10 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}