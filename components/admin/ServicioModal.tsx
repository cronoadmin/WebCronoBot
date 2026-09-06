// components/admin/ServicioModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ServicioTI } from '@/types'
import { Button } from '../../components/ui/Button'

interface ServicioModalProps {
  isOpen: boolean
  onClose: () => void
  servicio?: ServicioTI | null
}

export function ServicioModal({ isOpen, onClose, servicio }: ServicioModalProps) {
  const [formData, setFormData] = useState<Partial<ServicioTI>>({
    nombre: '',
    descripcion: '',
    icono: 'default',
    caracteristicas: [],
    precio_base: 0
  })
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (servicio) {
      setFormData({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        icono: servicio.icono,
        caracteristicas: servicio.caracteristicas,
        precio_base: servicio.precio_base
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        icono: 'default',
        caracteristicas: [],
        precio_base: 0
      })
    }
  }, [servicio])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (servicio) {
      await supabase.from('servicios_ti').update(formData).eq('id', servicio.id)
    } else {
      await supabase.from('servicios_ti').insert([formData])
    }

    setLoading(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          {servicio ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Icono</label>
            <select
              value={formData.icono}
              onChange={(e) => setFormData({ ...formData, icono: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="web">Web Development 🌐</option>
              <option value="qa">QA Testing 🔍</option>
              <option value="testing">Testing 🧪</option>
              <option value="default">Default 💼</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Características (una por línea)</label>
            <textarea
              value={formData.caracteristicas?.join('\n')}
              onChange={(e) => setFormData({ ...formData, caracteristicas: e.target.value.split('\n').filter(c => c.trim()) })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
              rows={4}
              placeholder="Desarrollo responsive&#10;Optimización SEO&#10;Soporte 24/7"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Precio base</label>
            <input
              type="number"
              value={formData.precio_base}
              onChange={(e) => setFormData({ ...formData, precio_base: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}