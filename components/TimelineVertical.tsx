// components/TimelineVertical.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Zap, TrendingUp, Rocket, Code, QrCode, Calendar, Sparkles, Trophy, Target, Shield, Globe, Heart, Coffee } from 'lucide-react'

const timelineData = [
  {
    year: 'Agosto 2025',
    title: 'El Nacimiento de CRONO BOT',
    description: 'Nace la visión de revolucionar el desarrollo de software y la educación tecnológica, democratizando el acceso a conocimientos de vanguardia.',
    icon: <Zap size={22} />,
    status: 'completed',
    highlight: false
  },
  {
    year: 'Noviembre 2025',
    title: 'Apertura Oficial',
    description: 'Debutamos oficialmente en el ecosistema tecnológico con un webinar masivo, consolidando nuestra comunidad de entusiastas de la tecnología.',
    icon: <Rocket size={22} />,
    status: 'completed',
    highlight: false
  },
  {
    year: 'Febrero 2026',
    title: 'Primer Curso: Fundamentos de QA',
    description: 'Aperturamos nuestro catálogo educativo con el curso "Fundamentos de QA", formando profesionales en aseguramiento de calidad con metodología práctica y certificada.',
    icon: <Code size={22} />,
    status: 'completed',
    highlight: false
  },
  {
    year: 'Febrero 2026',
    title: 'Verificador de Certificados Digitales',
    description: 'Implementamos sistema de autenticación con ID único y código QR, garantizando la validez y transparencia de todos nuestros certificados emitidos.',
    icon: <QrCode size={22} />,
    status: 'completed',
    highlight: false
  },
]

export function TimelineVertical() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = document.querySelectorAll('.timeline-item')
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const getStatusColor = (status: string, isHighlight: boolean = false) => {
    if (isHighlight) return '#00d4ff'
    switch (status) {
      case 'completed': return '#00c950'
      case 'current': return '#00d4ff'
      case 'upcoming': return '#4a4a4a'
      default: return '#00c950'
    }
  }

  const getStatusBg = (status: string, isHighlight: boolean = false, isHovered: boolean = false) => {
    if (isHighlight && !isHovered) return 'rgba(0, 212, 255, 0.08)'
    if (isHovered) {
      switch (status) {
        case 'completed': return 'rgba(0, 201, 80, 0.12)'
        case 'current': return 'rgba(0, 212, 255, 0.12)'
        case 'upcoming': return 'rgba(74, 74, 74, 0.12)'
        default: return 'rgba(0, 201, 80, 0.12)'
      }
    }
    switch (status) {
      case 'completed': return 'rgba(0, 201, 80, 0.05)'
      case 'current': return 'rgba(0, 212, 255, 0.05)'
      case 'upcoming': return 'rgba(74, 74, 74, 0.05)'
      default: return 'rgba(0, 201, 80, 0.05)'
    }
  }

  const getStatusBorder = (status: string, isHighlight: boolean = false) => {
    if (isHighlight) return '#00d4ff'
    switch (status) {
      case 'completed': return '#00c950'
      case 'current': return '#00d4ff'
      case 'upcoming': return '#4a4a4a'
      default: return '#00c950'
    }
  }

  return (
    <div ref={timelineRef} className="relative max-w-6xl mx-auto py-8 px-4">
      {/* Leyenda de estados - Más visible */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#00c950' }} />
          <span className="text-sm font-medium" style={{ color: '#00c950' }}>Completado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#00d4ff' }} />
          <span className="text-sm font-medium" style={{ color: '#00d4ff' }}>En curso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#4a4a4a' }} />
          <span className="text-sm font-medium" style={{ color: '#4a4a4a' }}>Próximamente</span>
        </div>
      </div>

      {/* Línea central */}
      <div className="absolute left-8 md:left-1/2 top-28 bottom-8 w-0.5 bg-gradient-to-b from-[#00c950] via-[#00d4ff] to-[#00c950] opacity-30 hidden md:block" />
      
      {timelineData.map((item, index) => (
        <div
          key={index}
          data-index={index}
          className={`timeline-item relative mb-16 transition-all duration-700 ${
            visibleItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className={`flex flex-col md:flex-row items-start gap-6 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}>
            
            {/* Tarjeta */}
            <div className="w-full md:w-1/2">
              <div 
                className="relative rounded-xl p-6 transition-all duration-500 overflow-hidden group"
                style={{ 
                  background: getStatusBg(item.status, item.highlight, hoveredIndex === index),
                  border: `1px solid ${getStatusBorder(item.status, item.highlight)}30`,
                  boxShadow: hoveredIndex === index ? `0 0 20px ${getStatusBorder(item.status, item.highlight)}20` : 'none',
                  transform: hoveredIndex === index ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {/* Efecto de brillo para destacados */}
                {item.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00c950] via-[#00d4ff] to-[#00c950] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                )}
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: getStatusBg(item.status, item.highlight, false) }}
                    >
                      <div style={{ color: getStatusBorder(item.status, item.highlight) }} className="transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-sm font-bold" style={{ color: getStatusBorder(item.status, item.highlight) }}>
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Badge de estado */}
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: getStatusBg(item.status, item.highlight, false), color: getStatusBorder(item.status, item.highlight) }}
                    >
                      {item.status === 'completed' ? 'Completado' : item.status === 'current' ? 'En curso' : 'Próximamente'}
                    </span>
                    {item.status === 'current' && (
                      <Sparkles size={12} style={{ color: '#00d4ff' }} />
                    )}
                  </div>
                </div>
                
                {/* Título - Más grande */}
                <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                
                {/* Descripción - Más legible */}
                <p className="text-sm md:text-base leading-relaxed text-justify" style={{ color: 'var(--foreground)' }}>
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Círculo central - Más grande */}
            <div className="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 items-center justify-center z-10">
              <div 
                className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                style={{ 
                  background: `linear-gradient(135deg, ${getStatusBorder(item.status, item.highlight)}, ${getStatusBorder(item.status, item.highlight)}80)`,
                  boxShadow: hoveredIndex === index ? `0 0 20px ${getStatusBorder(item.status, item.highlight)}` : 'none',
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {item.status === 'current' && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: getStatusBorder(item.status, item.highlight) }} />
                )}
                
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--background)' }}>
                  {item.status === 'completed' ? (
                    <CheckCircle size={14} style={{ color: getStatusBorder(item.status, item.highlight) }} />
                  ) : item.status === 'current' ? (
                    <Sparkles size={12} style={{ color: getStatusBorder(item.status, item.highlight) }} />
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ background: getStatusBorder(item.status, item.highlight) }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Elemento final - Más visible */}
      <div className="relative mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ background: 'rgba(0, 201, 80, 0.08)', border: '1px solid rgba(0, 201, 80, 0.2)' }}>
          <Coffee size={14} style={{ color: '#00c950' }} />
          <span className="text-xs md:text-sm font-medium" style={{ color: '#00c950' }}>Siempre innovando</span>
          <Heart size={14} style={{ color: '#00c950' }} />
        </div>
      </div>
    </div>
  )
}