// components/CertificateSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Award, QrCode, Scan, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CertificateSection() {
  return (
    <section className="py-20" style={{ background: '#000000' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
            <Award className="w-7 h-7" style={{ color: '#00c950' }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Certificados <span style={{ color: '#00c950' }}>con validez oficial</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-2 rounded-full" style={{ background: 'linear-gradient(90deg, #00c950, var(--neon-blue))' }}></div>
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: 'var(--foreground)' }}>
            Todos nuestros cursos incluyen un certificado digital único, registrado en nuestra plataforma educativa
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Award,
              title: 'Certificado Digital',
              description: 'Certificado único con código de verificación y firma digital, registrado en nuestra plataforma educativa.',
              delay: 0.1
            },
            {
              icon: QrCode,
              title: 'Verificación por QR',
              description: 'Cada certificado incluye un código QR único que permite verificar su autenticidad al instante.',
              delay: 0.2
            },
            {
              icon: Shield,
              title: 'Validez Oficial',
              description: 'Certificados reconocidos por empresas del sector tecnológico, con respaldo de nuestra institución.',
              delay: 0.3
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #00c950, var(--neon-blue))' }} />
              <div className="relative rounded-2xl p-6 border transition-all duration-300 h-full" style={{ background: '#111111', borderColor: '#1a1a1a' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #00c950, var(--neon-blue))' }}>
                  <item.icon className="w-6 h-6" style={{ color: '#000000' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--foreground)' }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de verificación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl p-6 md:p-8 border" style={{ background: 'rgba(0, 201, 80, 0.05)', borderColor: 'rgba(0, 201, 80, 0.2)' }}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00c950, var(--neon-blue))' }}>
                  <Scan className="w-10 h-10" style={{ color: '#000000' }} />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  Verificador de autenticidad
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                  Valida la autenticidad de cualquier certificado emitido por CRONO BOT ingresando el ID único del certificado o escaneando el código QR.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border" style={{ background: '#111111', borderColor: '#1a1a1a' }}>
                    <CheckCircle className="w-3 h-3" style={{ color: '#00c950' }} />
                    ID: CRONO-XXXX-XXXX
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border" style={{ background: '#111111', borderColor: '#1a1a1a' }}>
                    <CheckCircle className="w-3 h-3" style={{ color: '#00c950' }} />
                    Escaneo QR
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border" style={{ background: '#111111', borderColor: '#1a1a1a' }}>
                    <CheckCircle className="w-3 h-3" style={{ color: '#00c950' }} />
                    Verificación instantánea
                  </span>
                </div>
              </div>
              
              <Link href="https://crono-bot.com/verificador" target='blank_'>
                <Button variant="primary" className="whitespace-nowrap" style={{ background: '#00c950', color: '#000000' }}>
                  Verificar certificado
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-center">
          <div>
            <div className="text-2xl font-bold" style={{ color: '#00c950' }}>500+</div>
            <p className="text-xs" style={{ color: 'var(--foreground)' }}>Certificados emitidos</p>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#00c950' }}>100%</div>
            <p className="text-xs" style={{ color: 'var(--foreground)' }}>Verificables</p>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#00c950' }}>24/7</div>
            <p className="text-xs" style={{ color: 'var(--foreground)' }}>Disponibilidad</p>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#00c950' }}>+10</div>
            <p className="text-xs" style={{ color: 'var(--foreground)' }}>Cursos especializados</p>
          </div>
        </div>
      </div>
    </section>
  )
}