// app/(public)/nosotros/page.tsx
'use client'

import { Target, Eye, Heart, Users, Briefcase, BookOpen, GraduationCap, Mail, Sparkles, Clock, Globe, Zap, Shield, Rocket, Star, Award, TrendingUp, CheckCircle, Lightbulb, Handshake, Code, Database, Layout, Cpu } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TimelineVertical } from '@/components/TimelineVertical'

const stats = [
  { value: '3', label: 'Proyectos', icon: <Briefcase size={20} /> },
  { value: '3', label: 'Clientes', icon: <Users size={20} /> },
  { value: '10+', label: 'Estudiantes', icon: <GraduationCap size={20} /> },
  { value: '10+', label: 'Cursos', icon: <BookOpen size={20} /> }
]

const valores = [
  { icon: <Zap size={22} />, title: 'Excelencia Técnica', desc: 'Utilizamos las mejores prácticas y tecnologías actuales para garantizar resultados de alta calidad.' },
  { icon: <Clock size={22} />, title: 'Compromiso con el Cliente', desc: 'Trabajamos codo a codo con nuestros clientes para entender y superar sus expectativas.' },
  { icon: <Globe size={22} />, title: 'Innovación Continua', desc: 'Nos mantenemos a la vanguardia de las tendencias tecnológicas para ofrecer soluciones modernas.' },
  { icon: <Users size={22} />, title: 'Formación de Calidad', desc: 'Capacitamos profesionales con metodologías prácticas y certificaciones reconocidas.' },
  { icon: <Shield size={22} />, title: 'Aseguramiento de Calidad', desc: 'Garantizamos software robusto y libre de errores mediante rigurosos procesos de QA.' },
  { icon: <Rocket size={22} />, title: 'Resultados Medibles', desc: 'Nos enfocamos en entregar valor tangible y resultados que impactan positivamente tu negocio.' }
]

export default function NosotrosPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
            <Users className="w-6 h-6" style={{ color: '#00c950' }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Sobre <span style={{ color: '#00c950' }}>CRONO BOT</span>
          </h1>
          <div className="w-16 h-0.5 mx-auto mb-3 rounded-full" style={{ background: '#00c950' }}></div>
          <p className="max-w-2xl mx-auto">
            Transformamos el aprendizaje tecnológico con metodologías innovadoras y resultados reales
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-4 text-center transition-all hover:scale-105"
                style={{ background: '#111111', border: '1px solid #1a1a1a' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
                  <div style={{ color: '#00c950' }}>{stat.icon}</div>
                </div>
                <div className="text-xl font-bold" style={{ color: '#00c950' }}>{stat.value}</div>
                <div className="text-small">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-3">
                Nuestra <span style={{ color: '#00c950' }}>Historia</span>
              </h2>
              <div className="w-12 h-0.5 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #00c950, #00d4ff)' }} />
              <p className="leading-relaxed text-justify">
                <span style={{ color: '#00c950' }}>CRONO BOT</span> nace con el propósito de impulsar el aprendizaje tecnológico accesible, dinámico, práctico y de calidad. Fundado por profesionales apasionados por la innovación, el centro surge como respuesta a la necesidad de formar nuevos talentos digitales capaces de afrontar los retos de la transformación tecnológica.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Vertical */}
      <section className="py-12" style={{ background: '#05070c' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">
            Nuestra <span style={{ color: '#00c950' }}>Evolución</span>
          </h2>
          <div className="w-12 h-0.5 mx-auto rounded-full mb-8" style={{ background: 'linear-gradient(90deg, #00c950, #00d4ff)' }} />
          
          <TimelineVertical />
        </div>
      </section>

      {/* Misión y Visión - Con animaciones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header de sección */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
                <Target className="w-7 h-7" style={{ color: '#00c950' }} />
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Propósito y <span style={{ color: '#00c950' }}>Dirección</span>
              </h2>
              <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #00c950, #00d4ff)' }} />
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
                Nuestro compromiso con la excelencia tecnológica y la formación profesional
              </p>
            </motion.div>

            {/* Grid de Misión y Visión */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Tarjeta de Misión */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl p-8 transition-all duration-300 cursor-pointer group"
                style={{ background: '#111111', border: '1px solid #1a1a1a' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: 'rgba(0, 201, 80, 0.1)' }}
                  >
                    <Target className="w-6 h-6" style={{ color: '#00c950' }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Nuestra <span style={{ color: '#00c950' }}>Misión</span>
                  </h3>
                </div>
                <motion.div 
                  className="w-12 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-24"
                  style={{ background: '#00c950' }}
                />
                <p className="leading-relaxed text-justify mb-5" style={{ color: 'var(--foreground)' }}>
                  Brindar servicios de desarrollo de software y aseguramiento de calidad de excelencia, junto con capacitaciones profesionales de alto nivel, formando talentos competentes que impulsen la transformación digital en las organizaciones.
                </p>
                
                {/* Pilares de la misión */}
                <div className="space-y-2 pt-3 border-t border-gray-800">
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle size={14} style={{ color: '#00c950', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Servicios tecnológicos de alta calidad</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <CheckCircle size={14} style={{ color: '#00c950', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Capacitación profesional certificada</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <CheckCircle size={14} style={{ color: '#00c950', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Transformación digital de empresas</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tarjeta de Visión */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl p-8 transition-all duration-300 cursor-pointer group"
                style={{ background: '#111111', border: '1px solid #1a1a1a' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                  >
                    <Eye className="w-6 h-6" style={{ color: '#00d4ff' }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Nuestra <span style={{ color: '#00d4ff' }}>Visión</span>
                  </h3>
                </div>
                <motion.div 
                  className="w-12 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-24"
                  style={{ background: '#00d4ff' }}
                />
                <p className="leading-relaxed text-justify mb-5" style={{ color: 'var(--foreground)' }}>
                  Ser el aliado estratégico líder en soluciones tecnológicas y formación profesional, reconocido por impulsar el crecimiento de empresas y profesionales a través de la innovación, calidad y compromiso con la excelencia.
                </p>
                
                {/* Pilares de la visión */}
                <div className="space-y-2 pt-3 border-t border-gray-800">
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrendingUp size={14} style={{ color: '#00d4ff', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Líderes en soluciones tecnológicas</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <Award size={14} style={{ color: '#00d4ff', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Referentes en formación profesional</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Handshake size={14} style={{ color: '#00d4ff', marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>Aliados estratégicos de empresas</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores - Lo que nos define con animaciones */}
      <section className="py-16" style={{ background: '#05070c' }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
              <Star className="w-7 h-7" style={{ color: '#00c950' }} />
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Lo que nos <span style={{ color: '#00c950' }}>define</span>
            </h2>
            <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #00c950, #00d4ff)' }} />
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
              Nuestros principios fundamentales que guían cada proyecto y cada curso
            </p>
          </motion.div>

          {/* Grid de valores */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-xl p-6 transition-all duration-300 cursor-pointer group"
                style={{ background: '#111111', border: '1px solid #1a1a1a' }}
              >
                {/* Icono con animación */}
                <motion.div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg"
                  style={{ background: 'rgba(0, 201, 80, 0.1)' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ color: '#00c950' }} className="transition-transform duration-300">
                    {valor.icon}
                  </div>
                </motion.div>
                
                {/* Título con animación */}
                <motion.h3 
                  className="text-lg font-bold mb-2 transition-all duration-300 group-hover:text-[#00c950]"
                  style={{ color: 'var(--foreground)' }}
                >
                  {valor.title}
                </motion.h3>
                
                {/* Línea decorativa */}
                <motion.div 
                  className="w-8 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-12"
                  style={{ background: '#00c950' }}
                />
                
                {/* Descripción justificada */}
                <p className="leading-relaxed text-justify" style={{ color: 'var(--foreground)' }}>
                  {valor.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: '#05070c', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'rgba(0, 201, 80, 0.1)' }}>
              <Heart className="w-8 h-8" style={{ color: '#00c950' }} />
            </div>
            <h2 className="text-2xl font-bold mb-3">
              ¿Listo para ser parte de <span style={{ color: '#00c950' }}>CRONO BOT</span>?
            </h2>
            <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--foreground)' }}>
              Ya sea que necesites servicios tecnológicos o quieras potenciar tu carrera con nuestros cursos
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
              style={{ background: '#00c950', color: '#000000' }}
            >
              <Link href="/contacto">
                Contáctanos
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}