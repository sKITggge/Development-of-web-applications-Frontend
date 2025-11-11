import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../../lib/utils'
import {
  useGetPendingSourcesQuery,
  useGetProfileQuery,
  useGetSourcesQuery,
} from '../../lib/api'
import { CategoriesForm } from '../../components/CategoriesForm'
import { SourcesForm } from '../../components/SourcesForm'
import SourcesList from '../../components/SourcesList'
import EditSourceModal from '../../components/EditSourceModal'
import ProfileCard from '../../components/ProfileCard'

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const isUserAuthenticated = isAuthenticated()

  if (!isUserAuthenticated) {
    navigate({ to: '/' })
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

  const {
    data: sources,
    isError: isSourcesError,
    isLoading: isSourcesLoading,
  } = useGetSourcesQuery()

  const {
    data: pendingSources,
    isError: isPendingSourcesError,
    isLoading: isPendingSourcesLoading,
  } = useGetPendingSourcesQuery()

  if (isUserError || isUserLoading || isUserFetching || !userData) {
    return (
      <div>
        isError {isUserError}
        isLoading {isUserLoading}
        isFetching {isUserFetching}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ProfileCard user={userData}/>

      <div className="flex flex-col gap-4">
        {sources && (
          <SourcesList
            title={'All Sources'}
            sources={sources}
            isError={isSourcesError}
            isLoading={isSourcesLoading}
            canAddSource={true}
            ActionForm={
              userData.role == 'moderator' ? EditSourceModal : undefined
            }
          />
        )}
        {pendingSources && (
          <SourcesList
            title={'Unpublished Sources'}
            sources={pendingSources}
            isError={isPendingSourcesError}
            isLoading={isPendingSourcesLoading}
            canAddSource={false}
            ActionForm={EditSourceModal}
          />
        )}
        <SourcesForm />
        <CategoriesForm />
      </div>
    </div>
  )
}
