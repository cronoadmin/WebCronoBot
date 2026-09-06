// app/(public)/servicios/page.tsx
'use client'

import { ServiciosList } from '@/components/ServiciosList'
import { Zap, Rocket, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ServiciosPage() {
  return (
    <div className="pt-16">
      {/* Hero Section - Compacto */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-3">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Nuestros <span className="text-green-500">Servicios</span>
          </h1>
          <div className="w-16 h-0.5 bg-green-500 mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Soluciones integrales diseñadas para impulsar tu negocio en el mundo digital
          </p>
        </div>
      </section>

      {/* Lista de Servicios */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ServiciosList />
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-2">¿Por qué elegirnos?</h2>
            <div className="w-12 h-0.5 bg-green-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Rocket className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-white text-xs font-medium">Entrega rápida</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium">Soporte 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium">Calidad garantizada</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium">Innovación</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-white mb-2">¿Necesitas una solución personalizada?</h2>
          <p className="text-gray-400 text-sm mb-4">Contáctanos y te asesoraremos sin compromiso</p>
          <Link href="/contacto">
            <Button variant="primary" size="sm">
              Contactar ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}