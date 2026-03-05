// components/ui/modal.tsx - Super Ultra Simplified Version

'use client'

import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className={`
            ${sizeClasses[size]} w-full 
            bg-gradient-to-b from-purple-900 to-pink-900 
            rounded-2xl shadow-2xl
            border border-white/20
            animate-slideUp
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <h3 className="text-white font-bold text-lg">
              {title || 'Modal Title'}
            </h3>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {children}
          </div>

          {/* Footer with default close button */}
          <div className="p-4 border-t border-white/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

// Simple confirmation modal
export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm', 
  message = 'Are you sure?' 
}: { 
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-white/80 mb-4">{message}</p>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}