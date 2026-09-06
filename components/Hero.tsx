// components/Hero.tsx
'use client'

import { Button } from './ui/Button'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-6 animate-scale">
            <Zap className="w-8 h-8 text-green-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight animate-fade-up">
            Soluciones <span className="text-green-500">digitales</span>
            <br />
            para el futuro
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto animate-fade-up delay-100">
            Desarrollo web, aseguramiento de calidad y capacitación tecnológica 
            para impulsar tu negocio al siguiente nivel.
          </p>
          <div className="flex gap-4 justify-center animate-fade-up delay-200">
            <Link href="/servicios">
              <Button variant="primary">
                Explorar soluciones
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/cursos">
              <Button variant="outline">
                Ver cursos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}