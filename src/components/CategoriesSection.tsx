import { useState } from 'react'
import type { Category } from '../lib/types'

interface CategoriesSectionProps {
  selected: string[]
  categories: Category[]
  handleClearSelection: () => void
  handleCategoryChange: (id: string) => void
}

export default function CategoriesSection({
  selected,
  categories,
  handleClearSelection,
  handleCategoryChange,
}: CategoriesSectionProps) {
  const [colapsed, setColapsed] = useState(false)
  const toggleColapse = () => setColapsed((prev) => !prev)

  return (
    <div className="lg:w-xs bg-[var(--surface)] p-4 rounded-sm border border-[var(--border)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="!mb-0">Categories</h2>
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
          {selected.length} categor
          {selected.length !== 1 ? 'ies' : 'y'} selected
        </div>

        {selected.length > 0 && (
          <button
            onClick={handleClearSelection}
            className="text-xs text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {!colapsed && (
        <div className="space-y-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center block px-3 py-2 rounded transition-all duration-150
                      ${
                        selected.includes(category.name)
                          ? 'bg-[var(--accent)] text-white'
                          : 'hover:bg-[var(--accent)] hover:text-white'
                      }
                    `}
            >
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selected.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-3 w-full cursor-pointer"
              >
                <div>
                  <span className="text-sm">{category.name}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
