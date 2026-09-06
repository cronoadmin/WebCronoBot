// components/admin/CursoModal.tsx (versión actualizada)
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Curso, CursoFormData } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '../../components/ui/Button'

interface CursoModalProps {
  isOpen: boolean
  onClose: () => void
  curso?: Curso | null
}

export function CursoModal({ isOpen, onClose, curso }: CursoModalProps) {
  const [formData, setFormData] = useState<Partial<CursoFormData>>({
    titulo: '',
    descripcion: '',
    tipo: 'grabado',
    duracion: '',
    precio: 0,
    imagen_url: '',
    tecnologias: [],
    fecha_inicio: ''
  })
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (curso) {
      setFormData({
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        tipo: curso.tipo,
        duracion: curso.duracion,
        precio: curso.precio,
        imagen_url: curso.imagen_url,
        tecnologias: curso.tecnologias,
        fecha_inicio: curso.fecha_inicio
      })
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'grabado',
        duracion: '',
        precio: 0,
        imagen_url: '',
        tecnologias: [],
        fecha_inicio: ''
      })
    }
  }, [curso])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (curso) {
      await supabase.from('cursos').update(formData).eq('id', curso.id)
    } else {
      await supabase.from('cursos').insert([formData])
    }

    setLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={curso ? 'Editar Curso' : 'Nuevo Curso'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          required
        />
        
        <Textarea
          label="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          rows={3}
          required
        />
        
        <Select
          label="Tipo"
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'en vivo' | 'grabado' })}
          options={[
            { value: 'grabado', label: 'Grabado' },
            { value: 'en vivo', label: 'En Vivo' }
          ]}
        />
        
        {formData.tipo === 'en vivo' && (
          <Input
            label="Fecha de inicio"
            type="datetime-local"
            value={formData.fecha_inicio}
            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
          />
        )}
        
        <Input
          label="Duración"
          value={formData.duracion}
          onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
          placeholder="Ej: 40 horas"
          required
        />
        
        <Input
          label="Precio"
          type="number"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
          required
        />
        
        <Input
          label="URL de imagen"
          type="url"
          value={formData.imagen_url}
          onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        
        <Input
          label="Tecnologías (separadas por coma)"
          value={formData.tecnologias?.join(', ')}
          onChange={(e) => setFormData({ ...formData, tecnologias: e.target.value.split(',').map(t => t.trim()) })}
          placeholder="React, Node.js, TypeScript"
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}