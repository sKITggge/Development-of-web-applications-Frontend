import { useState } from 'react'
import { postsApi } from '../lib/api'
import SourceCard from './SourceCard'
import SourceForm from './SourceForm'

export default function SourcesList() {
  const { data: sources, error, isLoading } = postsApi.useGetSourcesQuery()
  const [showForm, setShowForm] = useState(false)

  if (isLoading) {
    return (
      <section className="bg-[var(--card-bg)] rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg p-4 h-32">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                </div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[var(--card-bg)] rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sources</h2>
        <span className="text-red-500 text-center py-8">
          Error loading sources
        </span>
      </section>
    )
  }

  return (
    <>
      {showForm && (
        <SourceForm
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}

      <section className="bg-[var(--card-bg)] rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Sources</h2>
          <div className="flex gap-4">
            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-center">
              {sources?.length || 0}{' '}
              {sources?.length === 1 ? 'source' : 'sources'}
            </span>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full px-3 py-1 border-[1px] border-[var(--border)] 
              hover:border-[var(--link-hover)] hover:text-[var(--link-hover)] cursor-pointer"
            >
              Add Source
            </button>
          </div>
        </div>

        {!sources || sources.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No sources found. Add your first source above.
          </div>
        ) : (
          <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
