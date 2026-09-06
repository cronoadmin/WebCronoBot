// app/login/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const supabase = createClient()
  const router = useRouter()

  // Verificar si ya hay sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/admin')
      }
    }
    checkSession()
  }, [router, supabase])

  // Configurar el detector de inactividad
  useEffect(() => {
    const resetInactivityTimer = () => {
      // Limpiar timers existentes
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = null
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
        countdownTimerRef.current = null
      }
      
      // Cerrar modal de timeout
      setIsTimeoutModalOpen(false)
      setTimeLeft(null)

      // Solo configurar el timer si el usuario está autenticado
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          // Iniciar timer de inactividad (5 minutos = 300000 ms)
          inactivityTimerRef.current = setTimeout(() => {
            // Mostrar modal de advertencia
            setIsTimeoutModalOpen(true)
            setTimeLeft(60) // 60 segundos para reaccionar
            
            // Iniciar countdown
            countdownTimerRef.current = setInterval(() => {
              setTimeLeft((prev) => {
                if (prev === null || prev <= 1) {
                  // Cerrar sesión automáticamente
                  clearInterval(countdownTimerRef.current!)
                  countdownTimerRef.current = null
                  handleLogout()
                  return 0
                }
                return prev - 1
              })
            }, 1000)
          }, 300000) // 5 minutos
        }
      }
      
      checkSession()
    }

    // Eventos que reinician el timer de inactividad
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click', 'wheel']
    const resetTimer = () => {
      resetInactivityTimer()
    }

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    // Iniciar timer inicial
    resetInactivityTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = null
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
        countdownTimerRef.current = null
      }
    }
  }, [])

  const handleLogout = async () => {
    // Limpiar timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = null
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
    
    setIsTimeoutModalOpen(false)
    setTimeLeft(null)
    
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleStayLoggedIn = () => {
    // Reiniciar el timer de inactividad
    setIsTimeoutModalOpen(false)
    setTimeLeft(null)
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
    
    // Reiniciar el timer de inactividad
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = null
    }
    
    // Iniciar nuevo timer
    inactivityTimerRef.current = setTimeout(() => {
      setIsTimeoutModalOpen(true)
      setTimeLeft(60)
      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownTimerRef.current!)
            countdownTimerRef.current = null
            handleLogout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 300000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data.session) {
      // Redirigir al admin después del login
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl mb-4">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">CRONO BOT</h1>
          <p className="text-gray-400 text-sm mt-1">Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@cronobot.com"
          />
          
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* Enlace para restablecer contraseña */}
          <div className="text-center mt-4">
            <Link
              href="/auth/reset-password"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>

        {/* Opcional: Mensaje para usuarios nuevos */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            ¿Necesitas ayuda? Contacta con el administrador
          </p>
        </div>
      </div>

      {/* Modal de cierre por inactividad */}
      {isTimeoutModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-md p-6 border border-gray-800 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sesión por expirar</h3>
              <p className="text-gray-400 text-sm mb-4">
                Has estado inactivo por 5 minutos. Tu sesión se cerrará automáticamente en:
              </p>
              <div className="text-4xl font-bold text-yellow-500 mb-6">
                {timeLeft}s
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 px-4 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg font-medium hover:bg-red-500/20 transition"
                >
                  Cerrar sesión
                </button>
                <button
                  onClick={handleStayLoggedIn}
                  className="flex-1 py-2 px-4 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition"
                >
                  Continuar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}