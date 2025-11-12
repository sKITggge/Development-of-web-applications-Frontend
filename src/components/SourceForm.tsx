import { useState } from 'react'
import { useAddSourceMutation } from '../lib/api'

interface SourceFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function SourceForm({ onSuccess, onCancel }: SourceFormProps) {
  const [addSource, { isLoading, error }] = useAddSourceMutation()
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    logo: '',
    logo_width: 120,
    logo_height: 60,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addSource(formData)
      setFormData({
        url: '',
        title: '',
        logo: '',
        logo_width: 120,
        logo_height: 60,
      })
      onSuccess?.()
    } catch (err) {
      console.error('Failed to add source:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-sm border border-[var(--border)] p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Add New Source
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              RSS Feed URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="https://feeds.bbci.co.uk/news/rss.xml"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Source Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="BBC News"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Logo URL *
            </label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
              placeholder="https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="logo_width"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Logo Width (px)
            </label>
            <input
              type="number"
              name="logo_width"
              value={formData.logo_width}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="logo_height"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Logo Height (px)
            </label>
            <input
              type="number"
              name="logo_height"
              value={formData.logo_height}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">Failed to add source</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--border)]">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 border border-[var(--border)] rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={
              isLoading || !formData.url || !formData.title || !formData.logo
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Source
          </button>
        </div>
      </form>
    </div>
  )
}
