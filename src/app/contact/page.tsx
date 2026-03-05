'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setLoading(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-arabic glowing-text">﷽</h1>
        <p className="text-white/60 mt-4">Get in Touch with Us</p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-[url('/contact-bg.jpg')] bg-cover bg-center opacity-10 rounded-3xl" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="glowing-text bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 floating">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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

      {/* Contact Info Cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            title: 'Visit Us',
            info: '123 Herbal Street, Natural City, NC 12345',
            color: 'from-green-500 to-emerald-500'
          },
          {
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            ),
            title: 'Call Us',
            info: '+1 (234) 567-8900',
            subInfo: 'Mon-Fri 9am-6pm',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            title: 'Email Us',
            info: 'sajid.syed@gmail.com',
            subInfo: 'info@herbalhealing.com',
            color: 'from-purple-500 to-pink-500'
          }
        ].map((item, index) => (
          <div
            key={item.title}
            className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500 group"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} p-4 text-white group-hover:rotate-6 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80">{item.info}</p>
            {item.subInfo && <p className="text-white/60 text-sm mt-1">{item.subInfo}</p>}
          </div>
        ))}
      </section>

      {/* Contact Form & Map */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Send us a Message</h2>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/60 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full glowing-button disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              <p className="text-white/40 text-sm text-center mt-4">
                * Required fields
              </p>
            </form>
          )}
        </div>

        {/* Map & Additional Info */}
        <div className="space-y-6">
          {/* Map */}
          <div className="glass-effect rounded-3xl p-6 h-80">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5">
              {/* Simple map placeholder - in real app, use Google Maps or similar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-white/40">123 Herbal Street, Natural City, NC 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
            <div className="space-y-2">
              {[
                { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                { day: 'Sunday', hours: 'Closed' }
              ].map((schedule) => (
                <div key={schedule.day} className="flex justify-between text-white/80">
                  <span>{schedule.day}</span>
                  <span className={schedule.hours === 'Closed' ? 'text-red-400' : 'text-green-400'}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', icon: 'f', color: 'from-blue-600 to-blue-700' },
                { name: 'Twitter', icon: 't', color: 'from-sky-400 to-sky-500' },
                { name: 'Instagram', icon: 'ig', color: 'from-pink-500 to-purple-500' },
                { name: 'WhatsApp', icon: 'wa', color: 'from-green-500 to-green-600' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white font-bold hover:scale-110 transition-transform`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: 'How long does shipping take?',
              a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
            },
            {
              q: 'Do you ship internationally?',
              a: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.'
            },
            {
              q: 'Are your products really 100% herbal?',
              a: 'Yes, all our products are 100% natural and herbal. We never use artificial additives or preservatives.'
            },
            {
              q: 'What is your return policy?',
              a: 'We offer 30-day money-back guarantee on all our products. If you are not satisfied, return it for a full refund.'
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center mt-20 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 left-40 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" />
      <div className="fixed bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}