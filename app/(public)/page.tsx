// app/(public)/page.tsx
'use client'

import { Hero } from '@/components/Hero'
import { Magnitudes } from '@/components/Magnitudes'
import { ServiciosList } from '@/components/ServiciosList'
import { CursosGrid } from '@/components/CursosGrid'
import { CertificateSection } from '@/components/CertificateSection'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Briefcase, BookOpen, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Magnitudes />

      {/* Servicios */}
      <section className="py-16 animate-fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-3 animate-scale">
              <Briefcase className="w-6 h-6" style={{ color: '#00c950' }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Nuestros <span style={{ color: '#00c950' }}>servicios</span>
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-2" style={{ background: '#00c950' }}></div>
            <p className="text-gray-400 mt-3 text-sm">
              Soluciones integrales para tu negocio
            </p>
          </div>
          <ServiciosList />
          <div className="text-center mt-8">
            <Link href="/servicios">
              <Button variant="outline" size="sm">
                Ver todos los servicios
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className="py-16 bg-gray-900/30 animate-fade-up delay-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-3 animate-scale delay-100">
              <BookOpen className="w-6 h-6" style={{ color: '#00c950' }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Cursos <span style={{ color: '#00c950' }}>destacados</span>
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-2" style={{ background: '#00c950' }}></div>
            <p className="text-gray-400 mt-3 text-sm">
              Los más populares de nuestro catálogo
            </p>
          </div>
          
          <CursosGrid limit={3} showFilters={false} />

          <div className="text-center mt-8">
            <Link href="/cursos">
              <Button variant="primary" size="md">
                Ver todos los cursos
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Certificados */}
      <CertificateSection />

      {/* CTA - ¿Listo para comenzar? con fondo #05070c */}
      <section className="py-16 text-center animate-fade-up delay-300" style={{ background: '#05070c' }}>
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 animate-scale delay-200" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
            <Zap className="w-6 h-6" style={{ color: '#00c950' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¿Listo para comenzar?</h2>
          <p className="text-gray-400 text-sm mb-6">Contáctanos y descubre cómo podemos ayudarte</p>
          <Link href="/contacto">
            <Button variant="primary" style={{ background: '#00c950', color: '#000000' }}>
              Contactar ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}