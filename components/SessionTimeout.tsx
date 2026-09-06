// components/SessionTimeout.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SessionTimeoutProps {
  timeoutMinutes?: number
  warningSeconds?: number
  children: React.ReactNode
}

export function SessionTimeout({ 
  timeoutMinutes = 5, 
  warningSeconds = 60, 
  children 
}: SessionTimeoutProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    clearTimers()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const clearTimers = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = null
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
  }

  const resetTimer = () => {
    clearTimers()
    setShowWarning(false)
    setTimeLeft(null)

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        inactivityTimerRef.current = setTimeout(() => {
          setShowWarning(true)
          setTimeLeft(warningSeconds)
          
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
        }, timeoutMinutes * 60 * 1000)
      }
    }
    checkSession()
  }

  const stayLoggedIn = () => {
    clearTimers()
    setShowWarning(false)
    setTimeLeft(null)
    resetTimer()
  }

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click', 'wheel']
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
      clearTimers()
    }
  }, [])

  return (
    <>
      {children}
      {showWarning && (
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
                Has estado inactivo por {timeoutMinutes} minutos. Tu sesión se cerrará automáticamente en:
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
                  onClick={stayLoggedIn}
                  className="flex-1 py-2 px-4 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition"
                >
                  Continuar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}