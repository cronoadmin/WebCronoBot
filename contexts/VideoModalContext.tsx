// contexts/VideoModalContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface VideoModalContextType {
  openVideoModal: (videoUrl: string, titulo: string) => void
  closeVideoModal: () => void
  isOpen: boolean
  videoUrl: string | null
  videoTitulo: string
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined)

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoTitulo, setVideoTitulo] = useState('')

  const openVideoModal = (url: string, titulo: string) => {
    setVideoUrl(url)
    setVideoTitulo(titulo)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeVideoModal = () => {
    setIsOpen(false)
    setVideoUrl(null)
    setVideoTitulo('')
    document.body.style.overflow = 'unset'
  }

  return (
    <VideoModalContext.Provider value={{ isOpen, videoUrl, videoTitulo, openVideoModal, closeVideoModal }}>
      {children}
    </VideoModalContext.Provider>
  )
}

export function useVideoModal() {
  const context = useContext(VideoModalContext)
  if (!context) {
    throw new Error('useVideoModal must be used within VideoModalProvider')
  }
  return context
}