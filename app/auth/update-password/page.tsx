// app/auth/update-password/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Zap, CheckCircle } from 'lucide-react'

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  // Verificar que el token de restablecimiento es válido
  useEffect(() => {
    const checkToken = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      // El usuario debe tener una sesión activa (del enlace de restablecimiento)
      if (!session) {
        setIsValidToken(false)
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }
    
    checkToken()
  }, [supabase, router])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validar que las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Validar longitud mínima
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-800 text-center">
          <div className="text-red-500 text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Enlace inválido o expirado</h2>
          <p className="text-gray-400 text-sm mb-4">
            El enlace de restablecimiento no es válido o ya ha sido usado.
          </p>
          <p className="text-gray-500 text-xs">Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-4">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Nueva Contraseña</h1>
          <p className="text-gray-400 text-sm mt-1">
            Ingresa tu nueva contraseña
          </p>
        </div>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
                ✅ ¡Contraseña actualizada correctamente!
              </div>
              <p className="text-gray-400 text-sm">
                Redirigiendo al inicio de sesión...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <Input
              label="Nueva contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}