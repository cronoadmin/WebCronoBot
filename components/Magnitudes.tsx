// components/Magnitudes.tsx
'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, Globe, Microscope } from 'lucide-react'

const magnitudes = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: '3',
    label: 'Proyectos entregados',
    suffix: '',
    color: 'text-neon-green'
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: '3',
    label: 'Clientes satisfechos',
    suffix: '',
    color: 'text-neon-blue'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: '2',
    label: 'Cursos disponibles',
    suffix: '',
    color: 'text-neon-green'
  },
  {
    icon: <Microscope className="w-6 h-6" />,
    value: '1',
    label: 'Años de experiencia',
    suffix: '',
    color: 'text-neon-blue'
  }
]

export function Magnitudes() {
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            magnitudes.forEach((_, index) => {
              const targetValue = parseInt(magnitudes[index].value)
              let start = 0
              const duration = 2000
              const increment = targetValue / (duration / 16)
              
              const timer = setInterval(() => {
                start += increment
                if (start >= targetValue) {
                  setCounts(prev => {
                    const newCounts = [...prev]
                    newCounts[index] = targetValue
                    return newCounts
                  })
                  clearInterval(timer)
                } else {
                  setCounts(prev => {
                    const newCounts = [...prev]
                    newCounts[index] = Math.floor(start)
                    return newCounts
                  })
                }
              }, 16)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    const section = document.getElementById('magnitudes')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="magnitudes" className="py-20 border-y border-gray-800 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Nuestras magnitudes
          </h2>
          <div className="w-12 h-0.5 bg-neon-green mx-auto"></div>
          <p className="text-gray-400 mt-3 text-sm">
            Cifras que respaldan nuestro compromiso con la excelencia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {magnitudes.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="text-neon-green mb-3 flex justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${item.color} mb-1`}>
                {counts[index]}{item.suffix}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}