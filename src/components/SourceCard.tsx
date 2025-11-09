import type { Source } from '../lib/types'

interface SourceCardProps {
  source: Source
}

export default function SourceCard({ source }: SourceCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div
      className="flex-shrink-0 w-80 bg-[var(--surface)] rounded-lg border border-[var(--card-border)] hover:border-[var(--link-hover)]
                 transition-all duration-200 hover:shadow-md"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={source.logo}
              alt={source.title}
              width={source.logo_width || 32}
              height={source.logo_height || 32}
              className="rounded-lg flex-shrink-0"
            />
            <div className="min-w-0">
              <h3
                className="font-semibold text-gray-900 max-w-40 truncate !mb-1"
                title={source.title}
              >
                {source.title}
              </h3>
              <p className="text-xs text-gray-500 truncate !m-0">
                {new URL(source.url).hostname}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a
            href={source.url}
            target="_blank"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <span>Visit Source</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Created {formatDate(source.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
