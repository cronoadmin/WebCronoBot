// components/public/Footer.tsx
import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-neon-green" />
            <span className="text-gray-500">© 2024 CRONO BOT. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/nosotros" className="text-gray-500 hover:text-neon-green transition text-xs">Nosotros</Link>
            <Link href="/servicios" className="text-gray-500 hover:text-neon-green transition text-xs">Servicios</Link>
            <Link href="/cursos" className="text-gray-500 hover:text-neon-green transition text-xs">Cursos</Link>
            <Link href="/contacto" className="text-gray-500 hover:text-neon-green transition text-xs">Contacto</Link>
            <Link href="/login" className="text-gray-500 hover:text-neon-green transition text-xs">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}