import { useState } from 'react'
import { useDeleteSourceMutation, useUpdateSourceMutation } from '../lib/api'
import type { Source } from '../lib/types'

interface EditSourceModalProps {
  source: Source
  handleClose: () => void
}

export default function EditSourceModal({
  source,
  handleClose,
}: EditSourceModalProps) {
  const [sourceData, setSourceData] = useState<Source>({
    id: source.id,
    title: source.title,
    url: source.url,
    logo: source.logo,
    logo_width: source.logo_width,
    logo_height: source.logo_height,
    created_at: source.created_at,
  })

  const [updateSource, { isLoading }] = useUpdateSourceMutation()
  const [deleteSource, { isLoading: isDeleting }] = useDeleteSourceMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateSource({ ...sourceData })
      handleClose()
    } catch (error) {
      console.error('Failed to update source:', error)
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
    try {
      await deleteSource(source.id)
      handleClose()
    } catch (error) {
      console.error('Failed to update source:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSourceData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-sm p-6 border bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div>
              <svg
                className="w-6 h-6 h-full text-[var(--status-info)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold !mb-0">Edit Source</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading || isDeleting}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-50 disabled:opacity-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={sourceData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-[var(--bg)] border-[var(--border)] transition-colors focus:border-[var(--status-info)] focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">URL</label>
            <input
              type="url"
              name="url"
              value={sourceData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-[var(--bg)] border-[var(--border)] transition-colors focus:border-[var(--status-info)] focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading || isDeleting}
              className="
                w-full border border-[var(--border)] px-4 py-3 rounded-xl font-medium
                transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50
                hover:border-[var(--status-error)] hover:text-[var(--status-error)] cursor-pointer
              "
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={isLoading || isDeleting}
              className="
                w-full border border-[var(--border)] px-4 py-3 rounded-xl font-medium
                transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50
                hover:border-[var(--status-info)] hover:text-[var(--status-info)] cursor-pointer
              "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
