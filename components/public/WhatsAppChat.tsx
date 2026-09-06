// components/public/WhatsAppChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Send, Minimize2, Maximize2, ChevronRight, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  isBot: boolean
  options?: { text: string; action: string; message?: string }[]
}

const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

// Icono de WhatsApp personalizado
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <path fill="rgb(255, 255, 255)" d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
  </svg>
)

// Mensajes predefinidos para cada opción
const getWhatsAppMessage = (option: string, customMessage?: string) => {
  const messages: Record<string, string> = {
    'qa': 'Hola, estoy interesado en los servicios de QA Testing. Me gustaría recibir una cotización personalizada.',
    'desarrollo': 'Hola, estoy interesado en los servicios de Desarrollo Web. Me gustaría recibir una cotización personalizada.',
    'curso_qa': 'Hola, estoy interesado en el curso "Fundamentos de QA". Me gustaría recibir información sobre precios e inscripción.',
    'curso_postman': 'Hola, estoy interesado en el curso "Postman para Profesionales". Me gustaría recibir información sobre fechas y precios.',
    'curso_karate': 'Hola, estoy interesado en el curso "Karate DSL Avanzado". Me gustaría recibir información sobre el programa.',
    'cotizacion': 'Hola, necesito una cotización personalizada para un proyecto. Por favor, contacten conmigo.',
    'asesor': 'Hola, me gustaría hablar con un asesor comercial para resolver mis dudas.'
  }
  
  if (customMessage) return customMessage
  return messages[option] || 'Hola, necesito información sobre sus servicios y cursos.'
}

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "¡Hola! 👋 Soy el asistente de CRONO BOT.\n\n¿En qué puedo ayudarte hoy?", 
      isBot: true, 
      options: [
        { text: "📋 Servicios de QA", action: "qa", message: getWhatsAppMessage('qa') },
        { text: "💻 Desarrollo Web", action: "desarrollo", message: getWhatsAppMessage('desarrollo') },
        { text: "🎓 Cursos", action: "cursos", message: "" },
        { text: "💰 Cotización", action: "cotizacion", message: getWhatsAppMessage('cotizacion') },
        { text: "📞 Hablar con asesor", action: "asesor", message: getWhatsAppMessage('asesor') }
      ]
    }
  ])
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMinimized])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addBotMessage = (text: string, options?: { text: string; action: string; message?: string }[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        options
      }])
      setIsTyping(false)
      scrollToBottom()
    }, 800)
  }

  const redirectToWhatsApp = (message: string) => {
    const url = `https://api.whatsapp.com/send/?phone=51918570834&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`
    window.open(url, '_blank')
  }

  const handleOptionClick = (option: { text: string; action: string; message?: string }) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: option.text,
      isBot: false
    }])

    if (option.message && option.message !== '') {
      setTimeout(() => {
        redirectToWhatsApp(option.message!)
        addBotMessage("✅ ¡Perfecto! Te estamos redirigiendo a WhatsApp para continuar con tu solicitud...")
      }, 500)
      return
    }

    if (option.action === 'cursos') {
      setTimeout(() => {
        addBotMessage("🎓 **Nuestros Cursos Disponibles**\n\nSelecciona el curso que te interesa:", [
          { text: "🔍 Fundamentos de QA", action: "curso_qa", message: getWhatsAppMessage('curso_qa') },
          { text: "📮 Postman para Profesionales", action: "curso_postman", message: getWhatsAppMessage('curso_postman') },
          { text: "⚡ Karate DSL Avanzado", action: "curso_karate", message: getWhatsAppMessage('curso_karate') },
          { text: "◀️ Volver al menú principal", action: "menu", message: "" }
        ])
      }, 500)
    }
    else if (option.action === 'menu') {
      setTimeout(() => {
        addBotMessage("¿En qué más puedo ayudarte?", [
          { text: "📋 Servicios de QA", action: "qa", message: getWhatsAppMessage('qa') },
          { text: "💻 Desarrollo Web", action: "desarrollo", message: getWhatsAppMessage('desarrollo') },
          { text: "🎓 Cursos", action: "cursos", message: "" },
          { text: "💰 Cotización", action: "cotizacion", message: getWhatsAppMessage('cotizacion') },
          { text: "📞 Hablar con asesor", action: "asesor", message: getWhatsAppMessage('asesor') }
        ])
      }, 500)
    }
  }

  const handleSendCustomMessage = () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessage,
      isBot: false
    }])

    setInputText('')
    setShowCustomInput(false)

    setTimeout(() => {
      redirectToWhatsApp(userMessage)
      addBotMessage("✅ ¡Mensaje enviado! Te estamos redirigiendo a WhatsApp para continuar la conversación.")
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendCustomMessage()
    }
  }

  // Botón flotante responsive
  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      >
        {/* Tooltip flotante - solo visible en desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:block"
        >
          <div className="bg-gray-900 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-gray-700">
            💬 ¿Necesitas ayuda?
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-t border-r border-gray-700"></div>
          </div>
        </motion.div>

        {/* Botón principal con nuevo icono de WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center"
          aria-label="Abrir chat"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full border-2 border-green-500"
          />
          
          <div className="absolute inset-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg" />
          
          <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500 rounded-full text-white text-[8px] sm:text-[10px] flex items-center justify-center font-bold shadow-lg"
          >
            !
          </motion.div>
        </motion.button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed z-40
          ${isMinimized 
            ? 'bottom-4 right-4 w-56 sm:w-64' 
            : 'bottom-0 sm:bottom-4 right-0 sm:right-4 w-full sm:w-96 h-[85vh] sm:h-[550px] md:h-[600px]'
          }
          bg-gray-900 shadow-2xl overflow-hidden border border-gray-700 flex flex-col
          rounded-t-2xl sm:rounded-2xl
        `}
        style={{
          maxHeight: isMinimized ? 'auto' : '85vh',
        }}
      >
        {/* Header */}
        <motion.div 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 sm:p-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            <span className="font-bold text-sm sm:text-base text-black">CRONO BOT Asistente</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-black hover:bg-black/20 rounded-lg p-1 transition"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-black/20 rounded-lg p-1 transition"
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>

        {!isMinimized && (
          <>
            {/* Messages - Scrollable */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gradient-to-b from-gray-900 to-gray-800"
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-800 text-gray-200 rounded-tl-none'
                          : 'bg-green-500 text-black rounded-tr-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-xs sm:text-sm">
                        {message.text}
                      </div>
                      {message.options && message.isBot && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2"
                        >
                          {message.options.map((option, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-left px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center justify-between group"
                            >
                              <span className="break-words flex-1">{option.text}</span>
                              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition flex-shrink-0 ml-2" />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 p-2.5 sm:p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input personalizado */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-3 sm:p-4 border-t border-gray-800 bg-gray-900"
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendCustomMessage}
                      disabled={!inputText.trim()}
                      className="px-3 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {isMinimized && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 text-center text-xs text-white"
          >
            Haz clic para expandir el chat
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}