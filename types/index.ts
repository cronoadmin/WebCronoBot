// types/index.ts
export interface Curso {
  id: string
  titulo: string
  descripcion: string
  tipo: 'en vivo' | 'grabado'
  duracion: string
  precio: number
  imagen_url: string
  tecnologias: string[]
  fecha_inicio?: string
  created_at: string
  updated_at: string
}

export interface ServicioTI {
  id: string
  nombre: string
  descripcion: string
  icono: string
  caracteristicas: string[]
  precio_base: number
  created_at: string
  updated_at: string
}

export interface CursoFormData {
  titulo: string
  descripcion: string
  tipo: 'en vivo' | 'grabado'
  duracion: string
  precio: number
  imagen_url: string
  tecnologias: string[]
  fecha_inicio?: string
}