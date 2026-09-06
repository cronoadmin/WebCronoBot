// components/CursosGrid.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Clock, 
  DollarSign, 
  Zap, 
  Calendar, 
  Award,
  PlayCircle,
  Video,
  Search,
  X,
  Radio,
  Monitor,
  Sun,
  Flame,
  Users,
  ChevronRight,
  Lock
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useVideoModal } from '@/contexts/VideoModalContext'

interface Curso {
  id: string
  titulo: string
  descripcion: string
  modalidad: 'en vivo' | 'grabado'
  duracion: string
  precio_usd: number
  precio_pen: number
  imagen_url: string
  video_intro_url?: string
  tecnologias: string[]
  fecha_inicio: string
  orden: number
  activo: boolean
  estado: 'disponible' | 'no_disponible' | 'finalizado'
  created_at: string
}

interface CursosGridProps {
  limit?: number
  showFilters?: boolean
}

export function CursosGrid({ limit, showFilters = true }: CursosGridProps) {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState<'todos' | 'en vivo' | 'grabado'>('todos')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { openVideoModal } = useVideoModal()

  useEffect(() => {
    fetchCursos()
  }, [])

  useEffect(() => {
    filtrarCursos()
  }, [cursos, searchTerm, modalidadFilter])

  async function fetchCursos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (!error && data) {
      setCursos(data)
      setCursosFiltrados(data)
    }
    setLoading(false)
  }

  function filtrarCursos() {
    let filtrados = [...cursos]

    if (modalidadFilter !== 'todos') {
      filtrados = filtrados.filter(curso => curso.modalidad === modalidadFilter)
    }

    if (searchTerm.trim() !== '') {
      filtrados = filtrados.filter(curso =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.tecnologias?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (limit && limit > 0) {
      filtrados = filtrados.slice(0, limit)
    }

    setCursosFiltrados(filtrados)
  }

  const formatPrice = useCallback((precio: number) => {
    if (!precio || precio === 0) return null
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }, [])

  const handleInscribirse = useCallback((curso: Curso) => {
    router.push(`/contacto?curso=${curso.id}&titulo=${encodeURIComponent(curso.titulo)}`)
  }, [router])

  const handleVerVideo = useCallback((videoUrl: string, titulo: string) => {
    openVideoModal(videoUrl, titulo)
  }, [openVideoModal])

  const formatFechaInicio = (fecha: string) => {
    if (!fecha) return null
    const fechaObj = new Date(fecha)
    return fechaObj.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }).toUpperCase()
  }

  const isCursoBloqueado = (estado: string) => {
    return estado === 'no_disponible' || estado === 'finalizado'
  }

  const getEstadoMensaje = (estado: string) => {
    switch (estado) {
      case 'no_disponible':
        return 'Curso no disponible'
      case 'finalizado':
        return 'Curso finalizado'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800/50 rounded-2xl h-[520px] animate-pulse" />
        ))}
      </div>
    )
  }

  const TarjetaCurso = ({ curso, index }: { curso: Curso; index: number }) => {
    const isHovered = hoveredId === curso.id
    const isEnVivo = curso.modalidad === 'en vivo'
    const esDestacado = index === 0 && !limit && curso.estado !== 'finalizado' && curso.estado !== 'no_disponible'
    const esNuevo = curso.created_at && new Date(curso.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && curso.estado !== 'finalizado' && curso.estado !== 'no_disponible'
    const tienePrecioUSD = curso.precio_usd && curso.precio_usd > 0
    const tienePrecioPEN = curso.precio_pen && curso.precio_pen > 0
    const fechaInicioTexto = formatFechaInicio(curso.fecha_inicio)
    const tieneVideoIntro = curso.video_intro_url && curso.video_intro_url.trim() !== ''
    const bloqueado = isCursoBloqueado(curso.estado || 'disponible')
    const estadoMensaje = getEstadoMensaje(curso.estado || 'disponible')

    return (
      <div
        className="group relative"
        onMouseEnter={() => setHoveredId(curso.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${isEnVivo ? 'from-red-500/20 to-orange-500/20' : 'from-blue-500/20 to-cyan-500/20'} rounded-2xl blur-xl transition-opacity duration-500 ${
          isHovered && !bloqueado ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className={`relative bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 ${
          bloqueado ? 'border-yellow-500/30' :
          isEnVivo 
            ? `hover:border-red-500/50 ${isHovered ? 'shadow-2xl shadow-red-500/20' : ''}`
            : `hover:border-blue-500/50 ${isHovered ? 'shadow-2xl shadow-blue-500/20' : ''}`
        } ${isHovered && !bloqueado ? 'transform -translate-y-2' : ''}`}>
          
          {/* Imagen */}
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            <img
              src={curso.imagen_url || '/curso-placeholder.jpg'}
              alt={curso.titulo}
              className={`w-full h-full object-cover transition-transform duration-700 ${!bloqueado ? 'group-hover:scale-110' : ''}`}
              onError={(e) => { e.currentTarget.src = '/curso-placeholder.jpg' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
            
            {/* Badges superiores */}
            <div className="absolute top-3 right-3 flex gap-2">
              <div className={`${isEnVivo ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg`}>
                {isEnVivo ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    EN VIVO
                  </>
                ) : (
                  <>
                    <Video className="w-3 h-3" />
                    GRABADO
                  </>
                )}
              </div>
            </div>

            <div className="absolute top-3 left-3 flex gap-2">
              {esDestacado && !bloqueado && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3 h-3" />
                  DESTACADO
                </div>
              )}
              {esNuevo && !esDestacado && !bloqueado && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Zap className="w-3 h-3" />
                  NUEVO
                </div>
              )}
              {bloqueado && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Lock className="w-3 h-3" />
                  {curso.estado === 'finalizado' ? 'FINALIZADO' : 'NO DISPONIBLE'}
                </div>
              )}
            </div>

            {/* Bloqueo overlay - Ahora más sutil */}
            {bloqueado && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-xl border border-yellow-500/40 text-center max-w-[85%]">
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-8 h-8 text-yellow-400" />
                    <div className="text-left">
                      <p className="text-yellow-400 text-sm font-bold">{estadoMensaje}</p>
                      <p className="text-gray-400 text-[10px]">No disponible para inscripción</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fecha de inicio */}
            {isEnVivo && fechaInicioTexto && (
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-white/10">
                <Calendar className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] font-medium text-white">
                  Inicia: {fechaInicioTexto}
                </span>
              </div>
            )}
          </div>

          {/* Contenido - Siempre visible incluso si está bloqueado */}
          <div className="p-5 flex flex-col" style={{ minHeight: '280px' }}>
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[56px]">
              {curso.titulo}
            </h3>
            
            <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed min-h-[40px]">
              {curso.descripcion}
            </p>

            {/* Tecnologías - Siempre visibles */}
            {curso.tecnologias && curso.tecnologias.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3 min-h-[32px]">
                {curso.tecnologias.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-800/80 text-gray-300 px-2 py-1 rounded-full border border-gray-700">
                    {tech}
                  </span>
                ))}
                {curso.tecnologias.length > 3 && (
                  <span className="text-[10px] bg-gray-800/80 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
                    +{curso.tecnologias.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Detalles - Siempre visibles */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs">{curso.duracion}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pt-1">
                <Award className="w-3 h-3 text-yellow-500" />
                <span>Certificado</span>
                <span className="mx-1">•</span>
                <Users className="w-3 h-3 text-blue-500" />
                <span>Soporte</span>
              </div>
            </div>

            {/* Precios - Siempre visibles */}
            {(tienePrecioUSD || tienePrecioPEN) && (
              <div className={`mb-4 p-3 rounded-xl border ${bloqueado ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20'}`}>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {tienePrecioUSD && (
                    <div className="flex items-baseline gap-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-2xl font-bold text-green-400">
                        {formatPrice(curso.precio_usd)}
                      </span>
                      <span className="text-xs text-gray-400">USD</span>
                    </div>
                  )}
                  {tienePrecioUSD && tienePrecioPEN && (
                    <span className="text-gray-600 text-sm">|</span>
                  )}
                  {tienePrecioPEN && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-green-400 font-bold text-base flex items-center justify-center w-4 h-4">
                        S/.
                      </span>
                      <span className="text-2xl font-bold text-green-400">
                        {formatPrice(curso.precio_pen)}
                      </span>
                      <span className="text-xs text-gray-400">PEN</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="mt-auto space-y-2">
              {bloqueado ? (
                <div className="w-full py-3 rounded-xl bg-gray-800 text-gray-500 text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed border border-yellow-500/20">
                  <Lock className="w-4 h-4 text-yellow-500" />
                  <span>{estadoMensaje}</span>
                </div>
              ) : isEnVivo ? (
                <button 
                  onClick={() => handleInscribirse(curso)}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm ${
                    isHovered
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gray-800 text-green-500 border border-green-500/30 hover:bg-green-500/10'
                  }`}
                >
                  <span>Inscribirme ahora</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </button>
              ) : (
                <div className="flex gap-2">
                  {tieneVideoIntro && (
                    <button 
                      onClick={() => handleVerVideo(curso.video_intro_url!, curso.titulo)}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm ${
                        isHovered
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-gray-800 text-purple-400 border border-purple-500/30 hover:bg-purple-500/10'
                      }`}
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Ver intro</span>
                    </button>
                  )}
                  <button 
                    onClick={() => handleInscribirse(curso)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm ${
                      isHovered
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-800 text-green-500 border border-green-500/30 hover:bg-green-500/10'
                    }`}
                  >
                    <span>Inscribirme</span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {!bloqueado && (
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${isEnVivo ? 'from-red-500 to-orange-500' : 'from-blue-500 to-cyan-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Cursos Disponibles</h2>
            <p className="text-gray-400 text-sm">Capacitación especializada para potenciar tu carrera</p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1.5 rounded-full">
            {cursosFiltrados.filter(c => c.estado === 'disponible').length} disponibles
          </div>
        </div>
      )}

      {/* Filtros y buscador */}
      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por título, descripción o tecnología..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
                </button>
              )}
            </div>
            
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setModalidadFilter('todos')}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  modalidadFilter === 'todos' 
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/25' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setModalidadFilter('en vivo')}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  modalidadFilter === 'en vivo' 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                <Radio className="w-4 h-4" />
                En Vivo
              </button>
              <button
                onClick={() => setModalidadFilter('grabado')}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  modalidadFilter === 'grabado' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Grabados
              </button>
            </div>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 rounded-xl text-sm text-white border border-gray-700"
            >
              Filtros
            </button>
          </div>

          {showFiltersMobile && (
            <div className="md:hidden mt-3 p-3 bg-gray-900/50 rounded-xl space-y-2 border border-gray-700">
              <button
                onClick={() => { setModalidadFilter('todos'); setShowFiltersMobile(false) }}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${modalidadFilter === 'todos' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400'}`}
              >
                Todos los cursos
              </button>
              <button
                onClick={() => { setModalidadFilter('en vivo'); setShowFiltersMobile(false) }}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left flex items-center gap-2 transition-all ${modalidadFilter === 'en vivo' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                <Radio className="w-3.5 h-3.5" />
                Solo en vivo
              </button>
              <button
                onClick={() => { setModalidadFilter('grabado'); setShowFiltersMobile(false) }}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left flex items-center gap-2 transition-all ${modalidadFilter === 'grabado' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Solo grabados
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? 's' : ''} encontrado{cursosFiltrados.length !== 1 ? 's' : ''}
            </div>
            <div className="text-xs text-gray-500 flex gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {cursosFiltrados.filter(c => c.estado === 'disponible').length} disponibles
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                {cursosFiltrados.filter(c => c.estado === 'finalizado' || c.estado === 'no_disponible').length} finalizados
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid de cursos */}
      {cursosFiltrados.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No se encontraron cursos</h3>
          <p className="text-gray-400 text-sm mb-4">Prueba con otros filtros o términos de búsqueda</p>
          <button
            onClick={() => { setSearchTerm(''); setModalidadFilter('todos') }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg text-sm font-medium hover:bg-green-400 transition-all"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosFiltrados.map((curso, index) => (
            <TarjetaCurso key={curso.id} curso={curso} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}