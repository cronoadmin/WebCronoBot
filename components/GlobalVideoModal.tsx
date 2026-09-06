// components/GlobalVideoModal.tsx
'use client'

import { X } from 'lucide-react'
import { useVideoModal } from '@/contexts/VideoModalContext'

const getGoogleDriveEmbedUrl = (url: string) => {
  if (!url) return null
  const matchFileId = url.match(/\/file\/d\/([^\/]+)/)
  if (matchFileId && matchFileId[1]) {
    return `https://drive.google.com/file/d/${matchFileId[1]}/preview`
  }
  const matchOpenId = url.match(/[?&]id=([^&]+)/)
  if (matchOpenId && matchOpenId[1]) {
    return `https://drive.google.com/file/d/${matchOpenId[1]}/preview`
  }
  if (url.includes('/preview')) return url
  return url
}

const getYouTubeEmbedUrl = (url: string) => {
  const youTubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(youTubeRegex)
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?hd=1&vq=hd1080&modestbranding=1&rel=0&showinfo=0`
  }
  return url
}

const getVideoEmbedUrl = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined
  if (url.includes('drive.google.com')) {
    return getGoogleDriveEmbedUrl(url) || undefined
  }
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return getYouTubeEmbedUrl(url)
  }
  return url
}

export function GlobalVideoModal() {
  const { isOpen, videoUrl, videoTitulo, closeVideoModal } = useVideoModal()

  if (!isOpen || !videoUrl) return null

  return (
    <div 
      className="fixed inset-0 bg-black z-50"
      onClick={closeVideoModal}
    >
      <button
        onClick={closeVideoModal}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 text-white bg-black/50 rounded-full p-1.5 sm:p-2 hover:bg-black/70 transition-colors"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-5xl aspect-video">
          <iframe
            src={getVideoEmbedUrl(videoUrl)}
            title={`Video: ${videoTitulo}`}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}