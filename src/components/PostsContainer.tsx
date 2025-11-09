import type { Post } from '../lib/types'
import PostItem from './PostItem'

interface PostsContainerProps {
  data: Post[]
}

export default function PostsContainer({ data }: PostsContainerProps) {
  return (
    <section className="flex flex-col gap-4 items-center">
      {data.map((post) => (
        <PostItem data={post} key={post.guid} />
      ))}
    </section>
  )
}
