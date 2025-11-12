import type { UserProfile } from "../lib/types"

export default function ProfileCard({ user }: { user: UserProfile }) {
  const trackedSourcesCount = user.tracked_sources?.length || 0
  const trackedCategoriesCount = user.tracked_categories?.length || 0

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="!mb-0">{user.name}</h1>
              <p className="text-[var(--muted)] !mb-0">{user.email}</p>
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
  )
}
