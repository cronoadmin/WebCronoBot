// app/(public)/cursos/page.tsx
'use client'

import { CursosGrid } from '@/components/CursosGrid'
import { BookOpen } from 'lucide-react'

export default function CursosPage() {
  return (
    <div className="pt-16">
      {/* Hero Section - Compacta y con colores coherentes */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-3">
            <BookOpen className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Nuestros <span className="text-green-500">Cursos</span>
          </h1>
          <div className="w-16 h-0.5 bg-green-500 mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Capacitación de alto nivel en las tecnologías más demandadas
          </p>
        </div>
      </section>

      {/* Grid con filtros y buscador */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <CursosGrid showFilters={true} />
        </div>
      </section>
    </div>
  )
}