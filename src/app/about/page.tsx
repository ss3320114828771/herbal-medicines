import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Bismillah */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-arabic glowing-text">﷽</h1>
        <p className="text-white/60 mt-4">In the name of Allah, the Most Gracious, the Most Merciful</p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-[url('/herbal-bg.jpg')] bg-cover bg-center opacity-10 rounded-3xl" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="glowing-text bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Our Story
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 floating">
            Bringing the healing power of nature to your doorstep since 2020
          </p>
        </div>

        {/* Decorative Images */}
        <div className="absolute -top-20 -left-20 w-64 h-64 floating opacity-20">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-3xl" />
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 floating opacity-20" style={{ animationDelay: '2s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl" />
        </div>
      </section>

      {/* Founder Section */}
      <section className="glass-effect rounded-3xl p-8 md:p-12 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden neon-border">
              <Image
                src="/founder.jpg"
                alt="Hafiz Sajid Syed"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-2xl opacity-50" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold glowing-text">
              Hafiz Sajid Syed
            </h2>
            <p className="text-xl text-green-300">Founder & Chief Herbalist</p>
            
            <div className="space-y-4 text-white/80">
              <p>
                With over 20 years of experience in traditional medicine and herbal healing, 
                Hafiz Sajid Syed has dedicated his life to understanding and preserving the 
                ancient wisdom of herbal remedies.
              </p>
              <p>
                A hafiz (memorizer) of the Holy Quran, he believes in the holistic approach 
                to healing that combines spiritual well-being with physical health, as taught 
                in Islamic medicine (Tibb al-Nabawi).
              </p>
              <p>
                His mission is to make authentic, high-quality herbal medicines accessible to 
                everyone while maintaining the traditional preparation methods that have been 
                passed down through generations.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="mailto:sajid.syed@gmail.com"
                className="px-6 py-3 rounded-lg gradient-bg text-white font-semibold hover:scale-105 transition-transform"
              >
                Email Me
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Our Mission & Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Authenticity',
              description: 'We source our herbs from trusted suppliers and verify each ingredient for authenticity and purity.',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Quality',
              description: 'Every product undergoes rigorous testing to ensure it meets our high standards of quality and potency.',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Tradition',
              description: 'We honor traditional preparation methods while incorporating modern safety standards.',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              color: 'from-purple-500 to-pink-500'
            }
          ].map((item, index) => (
            <div
              key={item.title}
              className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-500 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} p-4 text-white mb-6 group-hover:rotate-6 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Importance of Health */}
      <section className="glass-effect rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/herbal-pattern.png')] opacity-5" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 glowing-text">
            The Importance of Health in Islam
          </h2>
          
          <div className="space-y-6 text-white/90 text-lg">
            <p>
              The Prophet Muhammad (ﷺ) said: <span className="text-green-300 font-semibold">"There are two blessings which many people waste: health and free time."</span> (Bukhari)
            </p>
            
            <p>
              In Islam, maintaining good health is considered an act of worship. Our bodies are an amanah (trust) from Allah, 
              and we are commanded to take care of them. The Quran mentions:
            </p>
            
            <p className="text-xl font-arabic text-center text-green-200">
              "And eat and drink, but be not excessive. Indeed, He likes not those who commit excess." (Quran 7:31)
            </p>
            
            <p>
              Herbal medicine, or Tibb al-Nabawi (Prophetic Medicine), has been an integral part of Islamic tradition for centuries. 
              The Prophet (ﷺ) recommended various natural remedies including black seed, honey, and olive oil for their healing properties.
            </p>
            
            <p className="text-green-300 font-semibold">
              "There is no disease that Allah has created, except that He also has created its treatment." (Bukhari)
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">
          Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Amina Khan',
              role: 'Senior Herbalist',
              expertise: 'Ayurvedic Medicine',
              image: '/team1.jpg'
            },
            {
              name: 'Dr. Yusuf Ahmed',
              role: 'Research Director',
              expertise: 'Pharmacology',
              image: '/team2.jpg'
            },
            {
              name: 'Fatima Zahra',
              role: 'Quality Control',
              expertise: 'Traditional Medicine',
              image: '/team3.jpg'
            }
          ].map((member, index) => (
            <div key={member.name} className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-500">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden neon-border">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-green-300 mb-2">{member.role}</p>
              <p className="text-white/60 text-sm">{member.expertise}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="text-center">
        <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
          <p className="text-white/70 mb-6">
            Have questions about our products or herbal medicine? We&apos;re here to help.
          </p>
          
          <div className="space-y-2 text-white/80">
            <p>📞 +1 (234) 567-8900</p>
            <p>✉️ sajid.syed@gmail.com</p>
            <p>📍 123 Herbal Street, Natural City, NC 12345</p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.583-12.001c0-.212-.005-.424-.015-.636A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Admin Info Footer */}
      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">Hafiz Sajid Syed - Founder & Administrator</p>
        <p className="text-white/20 text-xs mt-1">sajid.syed@gmail.com</p>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 right-40 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" />
      <div className="fixed bottom-40 left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}