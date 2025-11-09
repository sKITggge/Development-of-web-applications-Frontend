import { useState } from 'react'
import { postsApi } from '../lib/api'

interface SourceFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function SourceForm({ onSuccess, onCancel }: SourceFormProps) {
  const [addSource, { isLoading, error }] = postsApi.useAddSourceMutation()
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
      await addSource(formData).unwrap()
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
    <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border)] p-6 mb-6">
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
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="BBC News"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
              placeholder="https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              id="logo_width"
              name="logo_width"
              value={formData.logo_width}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              id="logo_height"
              name="logo_height"
              value={formData.logo_height}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {formData.logo && (
          <div className="border-t border-[var(--border)] pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={formData.logo}
                alt="Logo preview"
                width={formData.logo_width}
                height={formData.logo_height}
                className="rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div>
                <p className="font-medium text-gray-900">
                  {formData.title || 'Source Title'}
                </p>
                <p className="text-sm text-gray-500">
                  {formData.url || 'Source URL'}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              Error:{' '}
              {'data' in error
                ? JSON.stringify(error.data)
                : 'Failed to add source'}
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--border)]">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 border border-[var(--border)] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={
              isLoading || !formData.url || !formData.title || !formData.logo
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Adding...' : 'Add Source'}
          </button>
        </div>
      </form>
    </div>
  )
}
