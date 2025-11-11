import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useGetPostsQuery } from '../lib/api'
import Fallback from '../components/Fallback'
import PostsContainer from '../components/PostsContainer'
import Pagination from '../components/Pagination'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}

function Index() {
  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)

  const { data, isError, isLoading, isFetching, refetch } = useGetPostsQuery({
    limit,
    offset,
  })

  useEffect(() => {
    refetch()
  }, [limit, offset, refetch])

  if (isLoading || isFetching) {
    return (
      <Fallback
        message="We are gathering the latest news for you..."
        title="Loading Content"
        color="info"
        details="This should only take a moment"
      />
    )
  }

  if (isError) {
    return (
      <Fallback
        message="We encountered an issue while fetching the latest news. This might be due to network connectivity or server issues."
        title="Connection Error"
        color="error"
        actionText="Try Again"
        onAction={refetch}
      />
    )
  }

  if (!data || data.posts.length === 0) {
    return (
      <Fallback
        message="There are currently no news articles available. Please check back later for updates."
        title="No Articles Found"
        color="warning"
        actionText="Refresh"
        onAction={refetch}
      />
    )
  }

  return (
    <>
      <h1>Latest News</h1>
      <div className="flex flex-col gap-6">
        <PostsContainer data={data.posts} />
        <Pagination
          postsCount={data.meta.total}
          limit={limit}
          offset={offset}
          changeLimit={setLimit}
          changeOffset={setOffset}
        />
      </div>
    </>
  )
}
