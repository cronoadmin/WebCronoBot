// app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  BookOpen, 
  Briefcase,
  Search,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

// Tipos
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

interface Servicio {
  id: string
  nombre: string
  descripcion: string
  icono: string
  caracteristicas: string[]
  created_at?: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'cursos' | 'servicios'>('cursos')
  const [cursos, setCursos] = useState<Curso[]>([])
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    await Promise.all([fetchCursos(), fetchServicios()])
    setLoading(false)
  }

  async function fetchCursos() {
    const { data } = await supabase
      .from('cursos')
      .select('*')
      .order('orden', { ascending: true })
    if (data) setCursos(data)
  }

  async function fetchServicios() {
    const { data } = await supabase
      .from('servicios_ti')
      .select('*')
      .order('created_at', { ascending: true })
    if (data) setServicios(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const openCreateModal = (type: 'curso' | 'servicio') => {
    setEditingItem(null)
    setError('')
    setSuccess('')
    if (type === 'curso') {
      setFormData({
        titulo: '',
        descripcion: '',
        modalidad: 'grabado',
        duracion: '',
        precio_usd: 0,
        precio_pen: 0,
        imagen_url: '',
        video_intro_url: '',
        tecnologias: [],
        fecha_inicio: '',
        orden: 0,
        activo: true,
        estado: 'disponible'
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        icono: 'web',
        caracteristicas: []
      })
    }
    setShowModal(true)
  }

  const openEditModal = (item: any, type: 'curso' | 'servicio') => {
    setEditingItem(item)
    setError('')
    setSuccess('')
    if (type === 'curso') {
      setFormData({
        titulo: item.titulo || '',
        descripcion: item.descripcion || '',
        modalidad: item.modalidad || 'grabado',
        duracion: item.duracion || '',
        precio_usd: item.precio_usd || 0,
        precio_pen: item.precio_pen || 0,
        imagen_url: item.imagen_url || '',
        video_intro_url: item.video_intro_url || '',
        tecnologias: item.tecnologias || [],
        fecha_inicio: item.fecha_inicio || '',
        orden: item.orden || 0,
        activo: item.activo !== undefined ? item.activo : true,
        estado: item.estado || 'disponible'
      })
    } else {
      setFormData({
        nombre: item.nombre || '',
        descripcion: item.descripcion || '',
        icono: item.icono || 'web',
        caracteristicas: item.caracteristicas || []
      })
    }
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      if (activeTab === 'cursos') {
        if (!formData.titulo?.trim()) {
          throw new Error('El título es requerido')
        }
        if (!formData.descripcion?.trim()) {
          throw new Error('La descripción es requerida')
        }
        if (!formData.duracion?.trim()) {
          throw new Error('La duración es requerida')
        }

        const cursoData = {
          titulo: formData.titulo.trim(),
          descripcion: formData.descripcion.trim(),
          modalidad: formData.modalidad || 'grabado',
          duracion: formData.duracion.trim(),
          precio_usd: parseFloat(formData.precio_usd) || 0,
          precio_pen: parseFloat(formData.precio_pen) || 0,
          imagen_url: formData.imagen_url?.trim() || '',
          video_intro_url: formData.video_intro_url?.trim() || '',
          tecnologias: formData.tecnologias || [],
          fecha_inicio: formData.fecha_inicio || null,
          orden: parseInt(formData.orden) || 0,
          activo: formData.activo !== undefined ? formData.activo : true,
          estado: formData.estado || 'disponible',
          updated_at: new Date().toISOString()
        }

        if (editingItem) {
          const { error } = await supabase
            .from('cursos')
            .update(cursoData)
            .eq('id', editingItem.id)
          if (error) throw error
          setSuccess('Curso actualizado correctamente')
        } else {
          const { error } = await supabase
            .from('cursos')
            .insert([cursoData])
          if (error) throw error
          setSuccess('Curso creado correctamente')
        }
        await fetchCursos()
      } else {
        if (!formData.nombre?.trim()) {
          throw new Error('El nombre es requerido')
        }
        if (!formData.descripcion?.trim()) {
          throw new Error('La descripción es requerida')
        }

        const servicioData = {
          nombre: formData.nombre.trim(),
          descripcion: formData.descripcion.trim(),
          icono: formData.icono || 'web',
          caracteristicas: formData.caracteristicas || []
        }

        if (editingItem) {
          const { error } = await supabase
            .from('servicios_ti')
            .update(servicioData)
            .eq('id', editingItem.id)
          if (error) throw error
          setSuccess('Servicio actualizado correctamente')
        } else {
          const { error } = await supabase
            .from('servicios_ti')
            .insert([servicioData])
          if (error) throw error
          setSuccess('Servicio creado correctamente')
        }
        await fetchServicios()
      }
      
      setTimeout(() => {
        setShowModal(false)
        setSuccess('')
      }, 1500)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, type: 'curso' | 'servicio') => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return
    
    try {
      if (type === 'curso') {
        const { error } = await supabase.from('cursos').delete().eq('id', id)
        if (error) throw error
        await fetchCursos()
      } else {
        const { error } = await supabase.from('servicios_ti').delete().eq('id', id)
        if (error) throw error
        await fetchServicios()
      }
      setSuccess(`${type === 'curso' ? 'Curso' : 'Servicio'} eliminado correctamente`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  const toggleActivo = async (curso: Curso) => {
    try {
      const { error } = await supabase
        .from('cursos')
        .update({ activo: !curso.activo })
        .eq('id', curso.id)
      if (error) throw error
      await fetchCursos()
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  const formatPrice = (precio: number) => {
    if (!precio || precio === 0) return '-'
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">✅ Disponible</span>
      case 'no_disponible':
        return <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">❌ No disponible</span>
      case 'finalizado':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">🏁 Finalizado</span>
      default:
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">{estado}</span>
    }
  }

  const handleTecnologiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const tecnologias = value ? value.split(',').map(t => t.trim()).filter(Boolean) : []
    setFormData({ ...formData, tecnologias })
  }

  const removeTecnologia = (index: number) => {
    const newTecnologias = formData.tecnologias.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, tecnologias: newTecnologias })
  }

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const caracteristicas = value ? value.split('\n').filter((c: string) => c.trim()) : []
    setFormData({ ...formData, caracteristicas })
  }

  const removeCaracteristica = (index: number) => {
    const newCaracteristicas = formData.caracteristicas.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, caracteristicas: newCaracteristicas })
  }

  const filteredCursos = cursos.filter(curso =>
    curso.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredServicios = servicios.filter(servicio =>
    servicio.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-white">Admin CRONO BOT</h1>
              <p className="text-gray-500 text-sm">Gestiona cursos y servicios</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 px-6 bg-gray-900/50">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('cursos')}
            className={`py-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'cursos'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen size={16} className="inline mr-2" />
            Cursos
            <span className="ml-2 text-xs bg-gray-800 px-2 py-0.5 rounded-full">
              {cursos.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('servicios')}
            className={`py-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'servicios'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase size={16} className="inline mr-2" />
            Servicios
            <span className="ml-2 text-xs bg-gray-800 px-2 py-0.5 rounded-full">
              {servicios.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
            <span className="text-green-500 text-sm">{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        {/* Barra de búsqueda y acción */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={16} className="text-gray-500 hover:text-white" />
              </button>
            )}
          </div>
          <Button
            variant="primary"
            onClick={() => openCreateModal(activeTab === 'cursos' ? 'curso' : 'servicio')}
          >
            <Plus size={16} className="mr-2" />
            Nuevo {activeTab === 'cursos' ? 'Curso' : 'Servicio'}
          </Button>
        </div>

        {/* Tabla de Cursos */}
        {activeTab === 'cursos' && (
          <div className="overflow-x-auto bg-gray-900/30 rounded-xl border border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Título</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Modalidad</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Precio USD</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Precio PEN</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Activo</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCursos.map((curso) => (
                  <tr key={curso.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">{curso.titulo}</p>
                        <p className="text-gray-500 text-xs truncate max-w-md">{curso.descripcion}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        curso.modalidad === 'en vivo'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {curso.modalidad === 'en vivo' ? '🔴 En Vivo' : '📹 Grabado'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getEstadoBadge(curso.estado || 'disponible')}
                    </td>
                    <td className="py-3 px-4 text-green-400 font-medium">
                      ${formatPrice(curso.precio_usd)}
                    </td>
                    <td className="py-3 px-4 text-green-400 font-medium">
                      S/. {formatPrice(curso.precio_pen)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActivo(curso)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                          curso.activo
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {curso.activo ? '✅ Activo' : '❌ Inactivo'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(curso, 'curso')}
                          className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(curso.id, 'curso')}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCursos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No se encontraron cursos
              </div>
            )}
          </div>
        )}

        {/* Tabla de Servicios */}
        {activeTab === 'servicios' && (
          <div className="overflow-x-auto bg-gray-900/30 rounded-xl border border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Nombre</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Icono</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredServicios.map((servicio) => (
                  <tr key={servicio.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">{servicio.nombre}</p>
                        <p className="text-gray-500 text-xs truncate max-w-md">{servicio.descripcion}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 text-sm capitalize">{servicio.icono}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(servicio, 'servicio')}
                          className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(servicio.id, 'servicio')}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredServicios.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No se encontraron servicios
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Edición/Creación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Editar' : 'Nuevo'} {activeTab === 'cursos' ? 'Curso' : 'Servicio'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                  <span className="text-red-500 text-sm">{error}</span>
                </div>
              )}

              {activeTab === 'cursos' ? (
                // Formulario de Cursos
                <>
                  <Input
                    label="Título *"
                    value={formData.titulo || ''}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                  />
                  <Textarea
                    label="Descripción *"
                    value={formData.descripcion || ''}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Modalidad *</label>
                      <select
                        value={formData.modalidad || 'grabado'}
                        onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                      >
                        <option value="grabado">📹 Grabado</option>
                        <option value="en vivo">🔴 En Vivo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Estado *</label>
                      <select
                        value={formData.estado || 'disponible'}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                      >
                        <option value="disponible">✅ Disponible</option>
                        <option value="no_disponible">❌ No disponible</option>
                        <option value="finalizado">🏁 Finalizado</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Precio USD *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.precio_usd === 0 ? '' : formData.precio_usd}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                          setFormData({ ...formData, precio_usd: value || 0 })
                        }}
                        placeholder="Ej: 49.99"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Precio PEN *</label>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold text-sm">S/.</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.precio_pen === 0 ? '' : formData.precio_pen}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                            setFormData({ ...formData, precio_pen: value || 0 })
                          }}
                          placeholder="Ej: 199.00"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Duración *"
                      value={formData.duracion || ''}
                      onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                      placeholder="Ej: 40 horas"
                      required
                    />
                    <Input
                      label="Orden"
                      type="number"
                      min="0"
                      value={formData.orden || 0}
                      onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                      placeholder="Ej: 1"
                    />
                  </div>
                  {formData.modalidad === 'en vivo' && (
                    <Input
                      label="Fecha de inicio"
                      type="datetime-local"
                      value={formData.fecha_inicio || ''}
                      onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                    />
                  )}
                  <Input
                    label="URL de imagen"
                    value={formData.imagen_url || ''}
                    onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <Input
                    label="URL de video intro (opcional)"
                    value={formData.video_intro_url || ''}
                    onChange={(e) => setFormData({ ...formData, video_intro_url: e.target.value })}
                    placeholder="https://youtube.com/embed/..."
                  />
                  
                  {/* Tecnologías */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Tecnologías (separadas por coma)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="React, Node.js, TypeScript"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
                        value={Array.isArray(formData.tecnologias) ? formData.tecnologias.join(', ') : ''}
                        onChange={handleTecnologiasChange}
                      />
                    </div>
                    {Array.isArray(formData.tecnologias) && formData.tecnologias.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tecnologias.map((tech: string, index: number) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTecnologia(index)}
                              className="hover:text-red-400 transition"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-400">Activo</label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, activo: !formData.activo })}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        formData.activo
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {formData.activo ? '✅ Sí' : '❌ No'}
                    </button>
                  </div>
                </>
              ) : (
                // Formulario de Servicios
                <>
                  <Input
                    label="Nombre *"
                    value={formData.nombre || ''}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                  <Textarea
                    label="Descripción *"
                    value={formData.descripcion || ''}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                    required
                  />
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Icono</label>
                    <select
                      value={formData.icono || 'web'}
                      onChange={(e) => setFormData({ ...formData, icono: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                    >
                      <option value="web">🌐 Web Development</option>
                      <option value="qa">🔍 QA Testing</option>
                      <option value="testing">🧪 Testing</option>
                      <option value="default">💼 Default</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Características (una por línea)</label>
                    <Textarea
                      value={Array.isArray(formData.caracteristicas) ? formData.caracteristicas.join('\n') : ''}
                      onChange={handleCaracteristicasChange}
                      rows={4}
                      placeholder="Diseño responsive&#10;Optimización SEO&#10;Soporte 24/7"
                    />
                    {Array.isArray(formData.caracteristicas) && formData.caracteristicas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.caracteristicas.map((carac: string, index: number) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full"
                          >
                            {carac}
                            <button
                              type="button"
                              onClick={() => removeCaracteristica(index)}
                              className="hover:text-red-400 transition"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-800 flex justify-end gap-3 sticky bottom-0 bg-gray-900">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}