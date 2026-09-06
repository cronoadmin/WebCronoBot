// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppChat } from '@/components/public/WhatsAppChat'
import { VideoModalProvider } from '@/contexts/VideoModalContext'
import { GlobalVideoModal } from '@/components/GlobalVideoModal'

export const metadata: Metadata = {
  title: 'CRONO BOT - Innovación y Tecnología',
  description: 'Desarrollo web, QA profesional y cursos especializados en tecnología',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/ICONO_CLARO.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/ICONO_OSCURO.png"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body className="bg-black text-white">
        <VideoModalProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <WhatsAppChat />
          <GlobalVideoModal />
        </VideoModalProvider>
      </body>
    </html>
  )
}