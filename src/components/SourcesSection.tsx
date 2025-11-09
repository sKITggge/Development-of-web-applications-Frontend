import { useState } from 'react'
import type { Source } from '../lib/types'

interface SourcesSectionProps {
  selected: string[]
  sources: Source[]
  handleClear: () => void
  handleSourceChange: (id: string) => void
}

export default function SourcesSection({
  selected,
  sources,
  handleClear,
  handleSourceChange,
}: SourcesSectionProps) {
  const [colapsed, setColapsed] = useState(false)
  const toggleColapse = () => setColapsed((prev) => !prev)

  return (
    <div className="lg:w-xs bg-[var(--surface)] p-4 rounded-sm border border-[var(--border)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="!mb-0">Sources</h2>
        <button
          className="p-1 hover:bg-[var(--card-bg)] rounded transition-colors text-[var(--text)]"
          onClick={toggleColapse}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
            className={`
              transition-transform duration-300
              ${colapsed ? 'rotate-180' : 'rotate-0'}
            `}
          >
            <path 
              d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-between">
        <div className="mb-3 text-sm text-[var(--accent)]">
          {selected.length} Source
          {selected.length === 1 ? '' : 's'} selected
        </div>

        {selected.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {!colapsed && (
        <div className="space-y-1">
          {sources.map((source) => (
            <div
              key={source.id}
              className={`flex items-center block px-3 py-2 rounded transition-all duration-150
                      ${
                        selected.includes(source.title)
                          ? 'bg-[var(--accent)] text-white'
                          : 'hover:bg-[var(--accent)] hover:text-white'
                      }
                    `}
            >
              <input
                type="checkbox"
                id={`category-${source.id}`}
                checked={selected.includes(source.id)}
                onChange={() => handleSourceChange(source.id)}
              />
              <label
                htmlFor={`category-${source.id}`}
                className="ml-3 w-full cursor-pointer"
              >
                <div>
                  <span className="text-sm">{source.title}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
