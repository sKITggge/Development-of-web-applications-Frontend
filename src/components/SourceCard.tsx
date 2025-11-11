import type { ComponentType } from 'react'
import type { Source } from '../lib/types'
import { useState } from 'react'
import { formatDate } from '../lib/utils'

interface SourceCardProps {
  source: Source
  ActionForm?: ComponentType<{ source: Source; handleClose: () => void }>
}

export default function SourceCard({ source, ActionForm }: SourceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="flex-shrink-0 min-w-80 bg-[var(--card-bg)] rounded-sm border border-[var(--card-border)] hover:border-[var(--link-hover)] transition-all duration-200 hover:shadow-md">
        <div className="h-full p-4 flex flex-col justify-between gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img
                src={source.logo}
                alt={source.title}
                width={source.logo_width || 32}
                height={source.logo_height || 32}
                className="rounded-sm flex-shrink-0"
              />
              <div>
                <h3
                  className="font-semibold text-gray-900 max-w-40 truncate !mb-1"
                  title={source.title}
                >
                  {source.title}
                </h3>
                <a
                  href={source.url}
                  target="_blank"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {!!ActionForm && (
              <button
                onClick={handleOpenModal}
                className="hover:text-[var(--link-hover)] cursor-pointer underline text-sm"
              >
                Edit
              </button>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-400">
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

      {isModalOpen && ActionForm && (
        <ActionForm source={source} handleClose={handleCloseModal} />
      )}
    </>
  )
}
