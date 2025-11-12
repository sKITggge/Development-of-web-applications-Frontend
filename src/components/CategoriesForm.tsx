import { useState, useEffect } from 'react'
import {
  useGetCategoriesQuery,
  useGetProfileQuery,
  useUpdateTrackedCategoriesMutation,
} from '../lib/api'

export function CategoriesForm() {
  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useGetProfileQuery()

  const {
    data: categoriesData,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery()

  const [trackedCategories, setTrackedCategories] = useState<string[]>([])
  const [addTrackedCategories, { isLoading: isSaving }] = useUpdateTrackedCategoriesMutation()

  useEffect(() => {
    if (userData) {
      setTrackedCategories(userData.tracked_categories || [])
    }
  }, [userData])

  const handleCategoryChange = (categoryId: string) => {
    setTrackedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await addTrackedCategories({
        category_ids: trackedCategories
      })
    } catch (error) {
      console.error('Failed to update categories:', error)
    }
  }

  if (isUserLoading || isCategoriesLoading) {
    return (
      <div className="p-6 bg-[var(--surface)] rounded-sm border border-[var(--border)]">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-8 bg-[var(--card-bg)] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isUserError || isCategoriesError) {
    return (
      <div className="p-6 bg-[var(--surface)] rounded-sm border border-[var(--border)]">
        <div className="text-[var(--status-error)] text-center">
          Error loading categories. Try again later.
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)]"
    >
      <h3>News Categories</h3>  

      <div className="mb-6">
        <p className="text-[var(--muted)]">
          Select the news categories you want to follow. You can always update your
          preferences later.
        </p>

        {categoriesData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoriesData.map((category) => (
              <div
                key={category.id}
                className={`
                  flex items-start p-3 rounded-sm border-2 cursor-pointer transition-all duration-200
                  ${
                    trackedCategories.includes(category.id)
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-[var(--card-bg)] border-[var(--border)] hover:border-[var(--accent)]'
                  }
                `}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={trackedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`}>{category.name}</label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="text-sm text-[var(--muted)]">
          {trackedCategories.length} categor
          {trackedCategories.length !== 1 ? 'ies' : 'y'} selected
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