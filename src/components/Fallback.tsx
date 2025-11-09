interface FallbackProps {
  title?: string
  message: string
  color: 'error' | 'warning' | 'info'
  details?: string
  actionText?: string
  onAction?: () => void
}

export default function Fallback({
  title,
  message,
  color,
  details,
  actionText,
  onAction,
}: FallbackProps) {
  const varName =
    color === 'error'
      ? '--status-error'
      : color === 'warning'
      ? '--status-warning'
      : '--status-info'
  const bgColor = `var(${varName})`

  const getIcon = () => {
    switch (color) {
      case 'error':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case 'warning':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        )
      case 'info':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 border shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 rounded-full p-3"
            style={{
              backgroundColor: `${bgColor}20`,
              color: bgColor,
            }}
          >
            {getIcon()}
          </div>

          <div className="flex-1 min-w-0">
            {title && (
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--title)' }}
              >
                {title}
              </h3>
            )}

            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text)' }}
            >
              {message}
            </p>

            {details && (
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {details}
              </p>
            )}

            {actionText && onAction && (
              <button
                onClick={onAction}
                className="mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: bgColor,
                  color: 'var(--bg)',
                }}
              >
                {actionText}
              </button>
            )}
          </div>
        </div>

        {color === 'info' && (
          <div
            className="mt-6 w-full h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <div
              className="h-full rounded-full animate-pulse"
              style={{ backgroundColor: bgColor }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
