import React, { useState, useContext, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = React.createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const [nextId, setNextId] = useState(1)

  const showToast = useCallback((type, message, duration) => {
    const id = nextId
    setNextId(prevId => prevId + 1)
    setToasts(prevToasts => [...prevToasts, { id, type, message, duration }])
  }, [nextId])

  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message, duration) => showToast('success', message, duration), [showToast])
  const showError = useCallback((message, duration) => showToast('error', message, duration), [showToast])
  const showWarning = useCallback((message, duration) => showToast('warning', message, duration), [showToast])
  const showInfo = useCallback((message, duration) => showToast('info', message, duration), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <div className="fixed top-4 right-4 z-[1000] space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

