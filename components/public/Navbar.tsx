// components/public/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-green-500/20' : 'bg-black'
      }`}>
        <div className="px-4 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo con espacio para imagen */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Espacio para logo personalizado */}
              <div className="relative w-auto transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo/CRONOBOT_LOGO.png"
                  alt="CRONO BOT Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Más espaciado */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors rounded-lg ${
                    pathname === item.href
                      ? 'text-green-500 bg-green-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Más grande */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-green-500/30 hover:bg-green-500/10 transition-all duration-300"
            >
              <div className="relative">
                <div className={`absolute inset-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu size={20} className="text-green-500" />
                </div>
                <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                  <X size={20} className="text-green-500" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay con transición */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop con fade */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-95' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Panel del menú con slide */}
        <div 
          className={`absolute top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-gray-900 to-black transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 pt-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-5 border-b border-gray-800 text-lg font-medium transition-all duration-300 transform ${
                  pathname === item.href ? 'text-green-500' : 'text-gray-300'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
              >
                <span className="flex items-center justify-between">
                  {item.name}
                  <ChevronRight size={18} className={`transition-transform duration-300 ${pathname === item.href ? 'translate-x-1' : ''}`} />
                </span>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}