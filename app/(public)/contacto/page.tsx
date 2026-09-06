// app/(public)/contacto/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { enviarEmailCliente, enviarEmailAdmin } from '@/app/actions/email-actions'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle, 
  MessageCircle,
  ArrowRight,
  ChevronDown,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

// Importar los íconos de Font Awesome que vamos a usar
// Nota: Asegúrate de que la ruta de importación sea correcta para tu configuración
import '@fortawesome/fontawesome-free/css/all.min.css'

// Definir tipos (sin cambios)
interface ServicioTI {
  id: string
  nombre: string
  descripcion: string
  icono?: string
  precio_base?: number
  caracteristicas?: string[]
}

interface Curso {
  id: string
  titulo: string
  descripcion: string
  precio: number
  duracion: string
  tipo: string
  tecnologias: string[]
  imagen_url?: string
}

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio_id: '',
    curso_id: '',
    mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [servicios, setServicios] = useState<ServicioTI[]>([])
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cargandoServicios, setCargandoServicios] = useState(true)
  const [cargandoCursos, setCargandoCursos] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchServicios()
  }, [])

  useEffect(() => {
    const servicioSeleccionado = servicios.find(s => s.id === formData.servicio_id)
    if (servicioSeleccionado && servicioSeleccionado.nombre.toLowerCase().includes('curso')) {
      fetchCursos()
    } else {
      setCursos([])
      setFormData(prev => ({ ...prev, curso_id: '' }))
    }
  }, [formData.servicio_id, servicios])

  async function fetchServicios() {
    setCargandoServicios(true)
    const { data, error } = await supabase
      .from('servicios_ti')
      .select('*')
      .order('nombre')

    if (!error && data) {
      setServicios(data)
    }
    setCargandoServicios(false)
  }

  async function fetchCursos() {
    setCargandoCursos(true)
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .order('titulo')

    if (!error && data) {
      setCursos(data)
    }
    setCargandoCursos(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    
    try {
      const servicioSeleccionado = servicios.find(s => s.id === formData.servicio_id)
      const cursoSeleccionado = cursos.find(c => c.id === formData.curso_id)
      
      let mensajeCompleto = formData.mensaje
      
      if (servicioSeleccionado) {
        mensajeCompleto = `Servicio: ${servicioSeleccionado.nombre}\n${'-'.repeat(30)}\n\n${mensajeCompleto}`
      }
      
      const nombreCurso = cursoSeleccionado?.titulo || ''
      if (cursoSeleccionado && servicioSeleccionado?.nombre.toLowerCase().includes('curso')) {
        mensajeCompleto = `${mensajeCompleto}\n\nCurso: ${cursoSeleccionado.titulo}`
        if (cursoSeleccionado.precio) {
          mensajeCompleto = `${mensajeCompleto}\nPrecio: $${cursoSeleccionado.precio}`
        }
        if (cursoSeleccionado.duracion) {
          mensajeCompleto = `${mensajeCompleto}\nDuración: ${cursoSeleccionado.duracion}`
        }
      }

      const emailCliente = await enviarEmailCliente({
        nombre: formData.nombre,
        email: formData.email,
        servicio: servicioSeleccionado?.nombre || 'No especificado',
        curso: nombreCurso,
        mensaje: mensajeCompleto
      })

      if (!emailCliente.success) {
        console.error('Error enviando email al cliente:', emailCliente.error)
      }

      const emailAdmin = await enviarEmailAdmin({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || 'No especificado',
        servicio: servicioSeleccionado?.nombre || 'No especificado',
        curso: nombreCurso,
        mensaje: mensajeCompleto
      })

      if (!emailAdmin.success) {
        console.error('Error enviando email al admin:', emailAdmin.error)
        setError('Hubo un problema al enviar la solicitud. Por favor, contáctanos directamente por WhatsApp.')
        setCargando(false)
        return
      }

      setEnviado(true)
      setCargando(false)
      setFormData({ 
        nombre: '', 
        email: '', 
        telefono: '', 
        servicio_id: '', 
        curso_id: '',
        mensaje: '' 
      })
      
      setTimeout(() => setEnviado(false), 5000)
      
    } catch (error) {
      console.error('Error en el envío:', error)
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo o contáctanos por WhatsApp.')
      setCargando(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const servicioSeleccionado = servicios.find(s => s.id === formData.servicio_id)
  const esServicioCurso = servicioSeleccionado?.nombre.toLowerCase().includes('curso') || false

  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contácta<span className="text-green-500">nos</span>
          </h1>
          <div className="w-16 h-0.5 bg-green-500 mx-auto mb-3"></div>
          <p className="text-gray-400 max-w-md mx-auto">
            Cuéntanos tu proyecto y te responderemos en menos de 24 horas
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-black">
        <div className="grid md:grid-cols-2">
          {/* Formulario */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-white mb-5">Envíanos un mensaje</h2>
              
              {enviado && (
                <div className="mb-5 p-3 bg-green-500/10 border border-green-500 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-green-500 text-sm">¡Mensaje enviado con éxito! Revisa tu correo.</span>
                </div>
              )}

              {error && (
                <div className="mb-5 p-3 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-red-500 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="nombre"
                  label="Nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
                
                <Input
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
                
                <Input
                  name="telefono"
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="999 999 999"
                />

                {/* Select de Servicios */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Servicio de interés
                  </label>
                  <select
                    name="servicio_id"
                    value={formData.servicio_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-green-500 transition-colors"
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    {cargandoServicios ? (
                      <option value="" disabled>Cargando servicios...</option>
                    ) : (
                      servicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.id}>
                          {servicio.nombre}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Select de Cursos (condicional) */}
                {esServicioCurso && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                      Curso de interés
                    </label>
                    <select
                      name="curso_id"
                      value={formData.curso_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-green-500 transition-colors"
                      required={esServicioCurso}
                    >
                      <option value="">Selecciona un curso</option>
                      {cargandoCursos ? (
                        <option value="" disabled>Cargando cursos...</option>
                      ) : (
                        cursos.map((curso) => (
                          <option key={curso.id} value={curso.id}>
                            {curso.titulo} {curso.precio ? `- $${curso.precio}` : ''}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                )}

                <Textarea
                  name="mensaje"
                  label="Mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                  required
                />

                <Button type="submit" variant="primary" fullWidth disabled={cargando}>
                  {cargando ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Enviar mensaje
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Información */}
          <div className="p-6 md:p-8">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-white mb-5">Información de contacto</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Oficina principal</p>
                    <p className="text-white font-medium">Ica, Perú</p>
                    <p className="text-gray-500 text-sm">Pisco, Ica</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Teléfono</p>
                    <p className="text-white font-medium">+51 918 570 834</p>
                    <p className="text-gray-500 text-sm">Lun - Vie: 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">cronoadmin@crono-bot.com</p>
                    <p className="text-gray-500 text-sm">Respuesta en 24h</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociales con Font Awesome */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-white font-medium mb-4">Síguenos</h3>
                <div className="flex gap-4">
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/company/cronobot/posts/?feedView=all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#0077B5] transition-colors group"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in text-gray-400 group-hover:text-white text-lg"></i>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/crono_bot/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] transition-colors group"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-gray-400 group-hover:text-white text-lg"></i>
                  </a>
                  
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/people/CRONO-BOT/61583167447557/?locale=es_LA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#1877F2] transition-colors group"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f text-gray-400 group-hover:text-white text-lg"></i>
                  </a>
                  
                  {/* TikTok */}
                  <a 
                    href="https://www.tiktok.com/@cronobot2025" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-black transition-colors group relative"
                    aria-label="TikTok"
                  >
                    <i className="fab fa-tiktok text-gray-400 group-hover:text-white text-lg"></i>
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a href="https://wa.me/51918570834" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 bg-green-500/10 border border-green-500/30 text-green-500 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-500 hover:text-black transition">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="h-48 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-white">Lima, Perú - San Isidro</p>
          <a 
            href="https://maps.google.com/?q=Lima,Peru" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-500 text-sm hover:underline"
          >
            Ver en Google Maps →
          </a>
        </div>
      </div>
    </div>
  )
}