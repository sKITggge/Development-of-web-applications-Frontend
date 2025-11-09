import { useState, useEffect } from 'react'
import {
  useUpdateTrackedSourcesMutation,
  useGetSourcesQuery,
  useGetProfileQuery,
} from '../lib/api'

export function SourcesForm() {
  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useGetProfileQuery()

  const {
    data: sourcesData,
    isError: isSourcesError,
    isLoading: isSourcesLoading,
  } = useGetSourcesQuery()

  const [trackedSources, setTrackedSources] = useState<string[]>([])
  const [addTrackedSources, { isLoading: isSaving }] =
    useUpdateTrackedSourcesMutation()

  useEffect(() => {
    if (userData) {
      setTrackedSources(userData.tracked_sources || [])
    }
  }, [userData])

  const handleSourceChange = (sourceId: string) => {
    setTrackedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await addTrackedSources({
        source_ids: trackedSources,
      })
    } catch (error) {
      console.error('Failed to update sources:', error)
    }
  }

  if (isUserLoading || isSourcesLoading) {
    return (
      <div className="p-6 bg-[var(--surface)] rounded-sm border border-[var(--border)]">
        <div className="animate-pulse">
          <div className="h-6 bg-[var(--card-bg)] rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-[var(--card-bg)] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isUserError || isSourcesError) {
    return (
      <div className="p-6 bg-[var(--surface)] rounded-sm border border-[var(--border)]">
        <div className="text-[var(--status-error)] text-center">
          Error loading data. Please try again.
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)]"
    >
      <h3>News Sources</h3>

      <div className="mb-6">
        <p className="text-[var(--muted)]">
          Select the news sources you want to follow. You can always update your
          preferences later.
        </p>

        {sourcesData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sourcesData.map((source) => (
              <div
                key={source.id}
                className={`
                  flex items-start p-3 rounded-sm border-2 cursor-pointer transition-all duration-200
                  ${
                    trackedSources.includes(source.id)
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-[var(--card-bg)] border-[var(--border)] hover:border-[var(--accent)]'
                  }
                `}
                onClick={() => handleSourceChange(source.id)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`source-${source.id}`}
                    checked={trackedSources.includes(source.id)}
                    onChange={() => handleSourceChange(source.id)}
                  />
                  <label htmlFor={`source-${source.id}`}>{source.title}</label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="text-sm text-[var(--muted)]">
          {trackedSources.length} source
          {trackedSources.length !== 1 ? 's ' : ' '}
          selected
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`
            bg-[var(--accent)] text-white px-6 py-2 font-semibold 
            transition-all duration-200 hover:opacity-90 hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed rounded-sm
          `}
        >
            Save Preferences
        </button>
      </div>
    </form>
  )
}
