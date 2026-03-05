import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Herbal Medicines Shop',
  description: 'Browse our collection of premium herbal medicines',
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900">
      {/* Fixed Background Stars */}
      <div className="fixed inset-0 bg-[url('/stars-bg.gif')] opacity-30 pointer-events-none" />

      {/* Floating Bismillah */}
      <div className="fixed top-24 left-4 opacity-10 hidden lg:block">
        <p className="text-6xl font-arabic text-white rotate-12">﷽</p>
      </div>
      <div className="fixed bottom-24 right-4 opacity-10 hidden lg:block">
        <p className="text-6xl font-arabic text-white -rotate-12">﷽</p>
      </div>

      {/* Shop Header */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Shop Banner */}
          <div className="glass-effect rounded-3xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Herbal Healing Shop</h2>
                  <p className="text-white/60">Natural remedies for modern wellness</p>
                </div>
              </div>
              
              {/* Shop Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-300">50+</p>
                  <p className="text-white/40 text-sm">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-300">100%</p>
                  <p className="text-white/40 text-sm">Natural</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-300">24/7</p>
                  <p className="text-white/40 text-sm">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Navigation */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['All', 'Immune Support', 'Digestive Health', 'Stress Relief', 'Sleep Aid'].map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Shop Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: '🔄', title: '30 Day Returns', desc: 'Money back guarantee' },
            { icon: '🌿', title: '100% Natural', desc: 'Pure ingredients' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'SSL encrypted' }
          ].map((feature) => (
            <div key={feature.title} className="glass-effect rounded-xl p-4 text-center">
              <span className="text-3xl mb-2 block">{feature.icon}</span>
              <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
              <p className="text-white/40 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-10 pointer-events-none animate-pulse" />
      <div className="fixed bottom-1/2 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-10 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}