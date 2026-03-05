'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DirectionsPage() {
  const [selectedTab, setSelectedTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General Guidelines' },
    { id: 'dosage', name: 'Dosage Instructions' },
    { id: 'storage', name: 'Storage Tips' },
    { id: 'precautions', name: 'Precautions' }
  ]

  const products = [
    {
      name: 'Black Seed Oil',
      usage: 'Take 1 teaspoon twice daily with warm water or honey',
      benefits: 'Immune support, respiratory health',
      timing: 'Best taken before meals',
      duration: 'Use for 3 months, then 1 month break'
    },
    {
      name: 'Herbal Immunity Booster',
      usage: 'Take 2 capsules daily with water',
      benefits: 'Strengthens immune system',
      timing: 'Morning with breakfast',
      duration: 'Can be used year-round'
    },
    {
      name: 'Digestive Herbal Tea',
      usage: 'Steep 1 tea bag in hot water for 5-7 minutes',
      benefits: 'Improves digestion, reduces bloating',
      timing: 'After meals',
      duration: 'As needed'
    },
    {
      name: 'Stress Relief Formula',
      usage: 'Take 1 capsule twice daily',
      benefits: 'Reduces stress and anxiety',
      timing: 'Morning and evening',
      duration: 'Use for 2-3 months'
    }
  ]

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-arabic glowing-text">﷽</h1>
        <p className="text-white/60 mt-4">Usage Directions & Guidelines</p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-[url('/herbal-pattern.jpg')] bg-cover bg-center opacity-10 rounded-3xl" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="glowing-text bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              How to Use
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 floating">
            Proper usage guidelines for maximum benefits
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 floating opacity-20">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-3xl" />
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 floating opacity-20" style={{ animationDelay: '2s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl" />
        </div>
      </section>

      {/* Quick Tips Banner */}
      <div className="glass-effect rounded-2xl p-6 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 text-yellow-300 mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold">Important:</span>
        </div>
        <p className="text-white/80">
          Always consult with a healthcare professional before starting any herbal regimen, 
          especially if you are pregnant, nursing, or have medical conditions.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedTab === tab.id
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-effect rounded-3xl p-8 mb-12">
        {selectedTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">General Usage Guidelines</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Start Slowly',
                  desc: 'Begin with small doses to see how your body responds',
                  icon: '🌱'
                },
                {
                  title: 'Be Consistent',
                  desc: 'Take herbs regularly for best results',
                  icon: '📅'
                },
                {
                  title: 'Stay Hydrated',
                  desc: 'Drink plenty of water when taking herbal supplements',
                  icon: '💧'
                },
                {
                  title: 'Listen to Your Body',
                  desc: 'Pay attention to how your body responds',
                  icon: '👂'
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/5">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300">
                <span className="font-bold">Note:</span> Herbal medicines work gradually. 
                It may take 2-4 weeks to notice significant improvements.
              </p>
            </div>
          </div>
        )}

        {selectedTab === 'dosage' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Dosage Instructions</h2>
            
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-bold text-green-300 mb-2">{product.name}</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-white/40 block">Usage:</span>
                      <span className="text-white">{product.usage}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Best Time:</span>
                      <span className="text-white">{product.timing}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Duration:</span>
                      <span className="text-white">{product.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                ⚠️ Do not exceed recommended dosage unless advised by your healthcare provider.
              </p>
            </div>
          </div>
        )}

        {selectedTab === 'storage' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Storage Tips</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Cool & Dry',
                  desc: 'Store in a cool, dry place away from direct sunlight',
                  icon: '🌡️'
                },
                {
                  title: 'Airtight Containers',
                  desc: 'Keep in airtight containers to maintain freshness',
                  icon: '🔒'
                },
                {
                  title: 'Avoid Moisture',
                  desc: 'Keep away from moisture and humidity',
                  icon: '💧'
                },
                {
                  title: 'Room Temperature',
                  desc: 'Most herbs store best at room temperature',
                  icon: '🏠'
                },
                {
                  title: 'Check Expiry',
                  desc: 'Always check expiry dates before use',
                  icon: '📅'
                },
                {
                  title: 'Child Safe',
                  desc: 'Keep out of reach of children',
                  icon: '👶'
                }
              ].map((item) => (
                <div key={item.title} className="glass-effect rounded-xl p-4 text-center">
                  <span className="text-4xl mb-2 block">{item.icon}</span>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'precautions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Precautions & Warnings</h2>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Pregnancy & Nursing',
                  desc: 'Consult your doctor before using any herbal products during pregnancy or while nursing',
                  icon: '🤰'
                },
                {
                  title: 'Medical Conditions',
                  desc: 'If you have chronic health conditions, consult your healthcare provider first',
                  icon: '🏥'
                },
                {
                  title: 'Medication Interactions',
                  desc: 'Herbs may interact with prescription medications. Always check for interactions',
                  icon: '💊'
                },
                {
                  title: 'Allergies',
                  desc: 'Check ingredients list if you have known allergies to specific herbs',
                  icon: '⚠️'
                },
                {
                  title: 'Children',
                  desc: 'Consult a pediatrician before giving herbs to children under 12',
                  icon: '🧒'
                },
                {
                  title: 'Surgery',
                  desc: 'Stop taking herbs at least 2 weeks before any scheduled surgery',
                  icon: '🔪'
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-red-300 font-bold mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Specific Directions */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 glowing-text">
          Product Specific Directions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="glass-effect rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-2xl">
                  🌿
                </div>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="text-white/40 w-24">How to use:</span>
                  <span className="text-white flex-1">{product.usage}</span>
                </div>
                <div className="flex">
                  <span className="text-white/40 w-24">Benefits:</span>
                  <span className="text-white flex-1">{product.benefits}</span>
                </div>
                <div className="flex">
                  <span className="text-white/40 w-24">Best time:</span>
                  <span className="text-white flex-1">{product.timing}</span>
                </div>
                <div className="flex">
                  <span className="text-white/40 w-24">Duration:</span>
                  <span className="text-white flex-1">{product.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section className="glass-effect rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Video Tutorial</h2>
        
        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 max-w-3xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <button className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="text-white/60">Watch: How to use herbal products correctly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Guide */}
      <section className="text-center">
        <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Download Usage Guide</h3>
          <p className="text-white/70 mb-6">
            Get our complete PDF guide with detailed instructions for all products
          </p>
          <button className="glowing-button inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Guide
          </button>
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Herbal Healing</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 left-40 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" />
      <div className="fixed bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}