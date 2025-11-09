import type { Post } from '../lib/types'
import { useMemo } from 'react'

export default function PostItem({ data }: { data: Post }) {
  const date = new Date(data.pubDate).toLocaleString()

  const stripHTML = useMemo(() => {
    if (!data.description) return ''

    const textOnly = data.description.replace(/<[^>]*>/g, '')

    return textOnly
  }, [data.description])

  return (
    <article className="w-full p-6 transition-shadow duration-200 hover:translate-y-[-2px] shadow-md hover:shadow-xl bg-[var(--card-bg)]">
      <a href={data.link} className="group block" target="_blank">
        <div
          className={`flex gap-4 flex-col ${data.image ? 'sm:grid sm:grid-cols-[1fr_3fr]' : 'sm:flex'}`}
        >
          {data.image && <img src={data.image} alt="thumbnail" />}
          <div>
            <h3 className="text-3xl font-semibold text-[var(--title)]">
              {data.title}
            </h3>

            {stripHTML ? (
              <p className="mt-3 text-base text-[var(--muted)] line-clamp-3">
                {stripHTML}
              </p>
            ) : (
              <p className="mt-3 text-base text-[var(--muted)]">
                No description available
              </p>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-wrap gap-2 mt-4">
          {data.categories &&
            data.categories.map((name) => (
              <span
                key={name}
                className="flex rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30"
              >
                {name}
              </span>
            ))}
        </div>
        
        <div className="flex justify-between mt-4 text-xs text-[var(--muted-2)]">
          <div className="hidden sm:flex items-center space-x-3">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span>Read more</span>
          </div>
          <div className="flex justify-between gap-3 sm:gap-6">
            <span className="truncate">{data.source}</span>
            <span className="truncate">{date}</span>
          </div>
        </div>
      </a>
    </article>
  )
}
