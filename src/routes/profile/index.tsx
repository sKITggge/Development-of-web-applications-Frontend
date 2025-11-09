import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../../lib/utils'
import { useGetProfileQuery } from '../../lib/api'
import { CategoriesForm } from '../../components/CategoriesForm'
import { SourcesForm } from '../../components/SourcesForm'

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const isUserAuthenticated = isAuthenticated()

  if (!isUserAuthenticated) {
    navigate({ to: '/' })
    window.location.reload()
  }

  return <Index />
}

function Index() {
  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetProfileQuery()

  if (isUserError || isUserLoading || isUserFetching || !userData) {
    return (
      <div>
        isError {isUserError}
        isLoading {isUserLoading}
        isFetching {isUserFetching}
      </div>
    )
  }

  const trackedSourcesCount = userData.tracked_sources?.length || 0
  const trackedCategoriesCount = userData.tracked_categories?.length || 0

  const joinDate = new Date(userData.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <div className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)] mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-2xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="!mb-0">
                  {userData.name}
                </h1>
                <p className="text-[var(--muted)] !mb-0">{userData.email}</p>
              </div>
            </div>

            <p>Member since {joinDate}</p>
          </div>

          <div className="flex gap-4 lg:gap-6">
            <div className="text-center p-4 bg-[var(--card-bg)] rounded-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--accent)]">
                {trackedSourcesCount}
              </div>
              <div className="text-sm text-[var(--muted)]">Tracked Sources</div>
            </div>
            <div className="text-center p-4 bg-[var(--card-bg)] rounded-sm border border-[var(--border)]">
              <div className="text-2xl font-bold text-[var(--accent)]">
                {trackedCategoriesCount}
              </div>
              <div className="text-sm text-[var(--muted)]">
                Tracked Categories
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        <SourcesForm />
        <CategoriesForm />
      </div>
    </div>
  )
}
