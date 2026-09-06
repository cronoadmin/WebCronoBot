// components/ServiciosList.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Code, Shield, Sparkles, Cpu, ArrowRight, CheckCircle, 
  GraduationCap, Zap, Award, Clock, Users, Star, 
  TrendingUp, Briefcase, Rocket, Palette, Server, Smartphone,
  BarChart, GitBranch, Database, Cloud, Lock
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Mapa de iconos más variados
const getIcon = (icono: string, index: number) => {
  const icons: { [key: string]: any } = {
    'web': <Code className="w-7 h-7" />,
    'qa': <Shield className="w-7 h-7" />,
    'testing': <Cpu className="w-7 h-7" />,
    'curso': <GraduationCap className="w-7 h-7" />,
    'development': <Code className="w-7 h-7" />,
    'automation': <Zap className="w-7 h-7" />,
    'performance': <TrendingUp className="w-7 h-7" />,
    'security': <Lock className="w-7 h-7" />,
    'cloud': <Cloud className="w-7 h-7" />,
    'database': <Database className="w-7 h-7" />,
  }
  
  const defaultIcons = [
    <Rocket className="w-7 h-7" />,
    <Briefcase className="w-7 h-7" />,
    <Award className="w-7 h-7" />,
    <Star className="w-7 h-7" />,
    <Palette className="w-7 h-7" />,
    <Server className="w-7 h-7" />,
    <Smartphone className="w-7 h-7" />,
    <BarChart className="w-7 h-7" />,
    <GitBranch className="w-7 h-7" />,
  ]
  
  return icons[icono?.toLowerCase()] || defaultIcons[index % defaultIcons.length]
}

const getIconGradient = (icono: string) => {
  const gradients: { [key: string]: string } = {
    'web': 'from-green-500 to-emerald-500',
    'qa': 'from-blue-500 to-cyan-500',
    'testing': 'from-purple-500 to-pink-500',
    'curso': 'from-yellow-500 to-orange-500',
    'development': 'from-green-500 to-emerald-500',
    'automation': 'from-yellow-500 to-amber-500',
    'security': 'from-red-500 to-rose-500',
    'cloud': 'from-sky-500 to-blue-500',
  }
  return gradients[icono?.toLowerCase()] || 'from-green-500 to-emerald-500'
}

const getCardBorder = (icono: string) => {
  const borders: { [key: string]: string } = {
    'web': 'hover:border-green-500/50 group-hover:shadow-green-500/20',
    'qa': 'hover:border-blue-500/50 group-hover:shadow-blue-500/20',
    'testing': 'hover:border-purple-500/50 group-hover:shadow-purple-500/20',
    'curso': 'hover:border-yellow-500/50 group-hover:shadow-yellow-500/20',
  }
  return borders[icono?.toLowerCase()] || 'hover:border-green-500/50 group-hover:shadow-green-500/20'
}

// Formatear precios
const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatPEN = (amount: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Badge de tipo de servicio
const TipoBadge = ({ tipo }: { tipo: string }) => {
  const config: { [key: string]: { label: string; color: string; icon: any } } = {
    'desarrollo': { label: 'Desarrollo Web', color: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30', icon: <Code className="w-3 h-3" /> },
    'qa': { label: 'QA Testing', color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30', icon: <Shield className="w-3 h-3" /> },
    'curso': { label: 'Capacitación', color: 'from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30', icon: <GraduationCap className="w-3 h-3" /> },
  }
  
  const current = config[tipo] || config['desarrollo']
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${current.color} border backdrop-blur-sm`}>
      {current.icon}
      {current.label}
    </span>
  )
}

export function ServiciosList() {
  const [servicios, setServicios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchServicios()
  }, [])

  async function fetchServicios() {
    const { data, error } = await supabase
      .from('servicios_ti')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (!error && data) {
      setServicios(data)
    }
    setLoading(false)
  }

  const handleButtonClick = (servicio: any) => {
    if (servicio.tipo === 'curso') {
      router.push('/cursos')
    } else {
      router.push(`/contacto?servicio=${servicio.id}&tipo=${servicio.tipo}&nombre=${encodeURIComponent(servicio.nombre)}`)
    }
  }

  const renderPrecio = (servicio: any) => {
    if (!servicio.mostrar_precio) return null

    // QA - precio por hora
    if (servicio.tipo === 'qa') {
      const precioUSD = servicio.precio_hora_usd
      const precioPEN = servicio.precio_hora_pen
      
      if (!precioUSD && !precioPEN) return null
      
      return (
        <div className="mt-4 mb-3 pt-4 border-t border-gray-700/50 px-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            {precioUSD && (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {formatUSD(precioUSD)}
                </span>
                <span className="text-gray-500 text-xs">USD</span>
              </div>
            )}
            {precioUSD && precioPEN && <span className="text-gray-600 text-sm">|</span>}
            {precioPEN && (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-gray-300">{formatPEN(precioPEN)}</span>
                <span className="text-gray-500 text-xs">PEN</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <p className="text-gray-500 text-xs">por hora de trabajo</p>
          </div>
        </div>
      )
    } 
    
    // Desarrollo web - precio desde
    if (servicio.tipo === 'desarrollo') {
      const precioUSD = servicio.precio_usd
      const precioPEN = servicio.precio_pen
      
      if (!precioUSD && !precioPEN) return null
      
      return (
        <div className="mt-4 mb-3 pt-4 border-t border-gray-700/50 px-6">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-gray-500 text-sm">Desde</span>
            {precioUSD && (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {formatUSD(precioUSD)}
                </span>
                <span className="text-gray-500 text-xs">USD</span>
              </div>
            )}
            {precioUSD && precioPEN && <span className="text-gray-600 text-sm">|</span>}
            {precioPEN && (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-gray-300">{formatPEN(precioPEN)}</span>
                <span className="text-gray-500 text-xs">PEN</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Rocket className="w-3.5 h-3.5 text-gray-500" />
            <p className="text-gray-500 text-xs">Proyecto estándar · Cotiza funcionalidades adicionales</p>
          </div>
        </div>
      )
    }
    
    // Cursos - precio fijo
    if (servicio.tipo === 'curso') {
      const precioUSD = servicio.precio_usd
      const precioPEN = servicio.precio_pen
      
      if (!precioUSD && !precioPEN) return null
      
      return (
        <div className="mt-4 mb-3 pt-4 border-t border-gray-700/50 px-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            {precioUSD && (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {formatUSD(precioUSD)}
                </span>
                <span className="text-gray-500 text-xs">USD</span>
              </div>
            )}
            {precioUSD && precioPEN && <span className="text-gray-600 text-sm">|</span>}
            {precioPEN && (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-gray-300">{formatPEN(precioPEN)}</span>
                <span className="text-gray-500 text-xs">PEN</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Users className="w-3.5 h-3.5 text-gray-500" />
            <p className="text-gray-500 text-xs">Incluye certificación y material descargable</p>
          </div>
        </div>
      )
    }
    
    return null
  }

  const getButtonConfig = (servicio: any, isHovered: boolean) => {
    const configs: { [key: string]: { text: string; gradient: string; hoverGradient: string } } = {
      'desarrollo': { 
        text: 'Cotizar proyecto', 
        gradient: 'border-green-500/30 text-green-400 hover:bg-green-500/10',
        hoverGradient: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
      },
      'qa': { 
        text: 'Solicitar cotización', 
        gradient: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10',
        hoverGradient: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
      },
      'curso': { 
        text: 'Ver cursos disponibles', 
        gradient: 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10',
        hoverGradient: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25'
      },
    }
    
    const config = configs[servicio.tipo] || configs['desarrollo']
    
    return {
      ...config,
      className: isHovered ? config.hoverGradient : config.gradient
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl blur-xl animate-pulse" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl h-[480px] animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (servicios.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Próximamente</h3>
        <p className="text-gray-400">Estamos preparando nuevos servicios para ti</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {servicios.map((servicio, index) => {
          const isHovered = hoveredId === servicio.id
          const iconGradient = getIconGradient(servicio.icono)
          const cardBorder = getCardBorder(servicio.icono)
          const buttonConfig = getButtonConfig(servicio, isHovered)
          
          return (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setHoveredId(servicio.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Efecto de glow al hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${iconGradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Tarjeta principal */}
              <div className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border ${cardBorder} transition-all duration-300 overflow-hidden h-full flex flex-col`}>
                
                {/* Header con decoración */}
                <div className="relative overflow-hidden">
                  {/* Fondo decorativo */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${iconGradient} opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                  
                  {/* Contenido del header */}
                  <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-4">
                      {/* Icono con gradiente */}
                      <div className={`relative w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="absolute inset-0 bg-black/20 rounded-xl" />
                        <div className="relative text-white">
                          {getIcon(servicio.icono, index)}
                        </div>
                      </div>
                      
                      {/* Badge de tipo */}
                      <TipoBadge tipo={servicio.tipo} />
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {servicio.nombre}
                    </h3>
                    
                    {/* Descripción */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {servicio.descripcion}
                    </p>
                  </div>
                </div>
                
                {/* Características */}
                {servicio.caracteristicas && servicio.caracteristicas.length > 0 && (
                  <div className="px-6 py-3 flex-1">
                    <div className="space-y-2.5">
                      {servicio.caracteristicas.slice(0, 3).map((feature: string, idx: number) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-2.5 group/feature"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-400" />
                          <span className="text-gray-400 text-sm group-hover/feature:text-gray-300 transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Precio - AHORA CON PADDING CORRECTO */}
                <div className="mt-auto">
                  {renderPrecio(servicio)}
                </div>
                
                {/* Botón CTA */}
                <div className="p-6 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleButtonClick(servicio)}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 border backdrop-blur-sm ${buttonConfig.className}`}
                  >
                    <span>{buttonConfig.text}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </motion.button>
                </div>
                
                {/* Borde inferior animado */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${iconGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}