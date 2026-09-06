// app/auth/reset-password/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Zap } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-4">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Restablecer Contraseña</h1>
          <p className="text-gray-400 text-sm mt-1">
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm text-center">
              ✅ ¡Correo enviado! Revisa tu bandeja de entrada para restablecer tu contraseña.
            </div>
            <Button
              variant="primary"
              fullWidth
              onClick={() => router.push('/login')}
            >
              Volver al inicio de sesión
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}