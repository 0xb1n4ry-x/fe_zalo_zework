import { useState, useEffect } from 'react'

interface ToastProps {
  title: string
  description?: string
  duration?: number
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, duration = 3000, variant = 'default' }: ToastProps) => {
    const id = Date.now()
    setToasts(prevToasts => [...prevToasts, { id, title, description, duration, variant }])
  }

  useEffect(() => {
    const timer = setInterval(() => {

      setToasts(prevToasts => prevToasts.filter(toast => Date.now() - toast.id < toast.duration))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return { toast, toasts }
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`border rounded-lg shadow-lg p-4 mb-2 max-w-sm ${
            toast.variant === 'destructive'
              ? 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          }`}
        >
          <h3 className={`font-semibold ${
            toast.variant === 'destructive'
              ? 'text-red-800 dark:text-red-200'
              : 'text-gray-900 dark:text-gray-100'
          }`}>{toast.title}</h3>
          {toast.description && (
            <p className={`mt-1 text-sm ${
              toast.variant === 'destructive'
                ? 'text-red-600 dark:text-red-300'
                : 'text-gray-600 dark:text-gray-400'
            }`}>{toast.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

