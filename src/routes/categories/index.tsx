import { createFileRoute } from '@tanstack/react-router'
import Fallback from '../../components/Fallback'
import {
  useGetCategoriesQuery,
  useGetFilteredPostsQuery,
  useGetProfileQuery,
  useGetSourcesQuery,
} from '../../lib/api'
import PostsContainer from '../../components/PostsContainer'
import { useState, useEffect } from 'react'
import CategoriesSection from '../../components/CategoriesSection'
import SourcesSection from '../../components/SourcesSection'
import Pagination from '../../components/Pagination'

export const Route = createFileRoute('/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}

function Index() {
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: isPostsError,
    refetch
  } = useGetFilteredPostsQuery({ categories: selectedCategories, sources: selectedSources, limit, offset })

  const { data: userData } = useGetProfileQuery()

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery()

  const { data: sourcesData, isLoading: isSourcesLoading } =
    useGetSourcesQuery()

  useEffect(() => {
    refetch()
  }, [selectedCategories, selectedSources, refetch])

  const handleSourcesChange = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const filterByPreferences = () => {
    if (!userData) return
    setSelectedCategories(userData.tracked_categories)
    setSelectedSources(userData.tracked_sources)
  }

  if (isCategoriesLoading) {
    return (
      <Fallback
        message="Retrieving available categories"
        title="Loading Navigation"
        color="info"
      />
    )
  }

  if (isSourcesLoading) {
    return (
      <Fallback
        message="Retrieving available sources"
        title="Loading Navigation"
        color="info"
      />
    )
  }

  if (!categoriesData && !sourcesData) {
    return (
      <Fallback
        message="Failed to load categories and sources"
        title="No filters"
        color="error"
        actionText="Retry"
        onAction={refetch}
      />
    )
  }

  if (!categoriesData || categoriesData.length === 0) {
    return (
      <Fallback
        message="No categories have been configured yet. Please contact administration if this persists."
        title="No Categories Configured"
        color="warning"
        actionText="Refresh Data"
        onAction={refetch}
      />
    )
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--title)] mb-2">
          All Categories
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Select categories and sources to filter articles. You can choose
          multiple items.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:sticky lg:top-6 lg:self-start max-h-[40vh] lg:max-h-[96vh] overflow-y-auto scroll shrink-0 space-y-4">
          {!!userData && (
            <button
              onClick={filterByPreferences}
              className="
                w-full bg-[var(--card-bg)] border border-[var(--border)] px-4 py-2 rounded-sm
                font-medium transition-all hover:opacity-90 text-[var(--text)] hover:bg-[var(--border)] cursor-pointer"
            >
              Filter by preferences
            </button>
          )}

          {!!sourcesData && (
            <SourcesSection
              selected={selectedSources}
              sources={sourcesData}
              handleClear={() => setSelectedSources([])}
              handleSourceChange={handleSourcesChange}
            />
          )}

          {!!categoriesData && (
            <CategoriesSection
              selected={selectedCategories}
              categories={categoriesData}
              handleClearSelection={() => setSelectedCategories([])}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </div>

        <div className="w-full">
          {isPostsLoading && (
            <Fallback
              message="Loading articles for selected categories..."
              title="Loading Posts"
              color="info"
            />
          )}

          {isPostsError && (
            <Fallback
              message="Unable to load articles for selected categories."
              title="Posts Unavailable"
              color="error"
              actionText="Try Again"
              onAction={refetch}
            />
          )}

          {postsData && postsData.posts.length > 0 ? (
            <div className="flex flex-col gap-6">
              <PostsContainer data={postsData.posts} />
              <Pagination
                postsCount={postsData.meta.total}
                limit={limit}
                offset={offset}
                changeLimit={setLimit}
                changeOffset={setOffset}
              />
            </div>
          ) : (
            <div className="text-center pt-12 text-[var(--muted)]">
              No articles found for selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
