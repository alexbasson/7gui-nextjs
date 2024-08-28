import ApiClient from "@/app/blog/ApiClient";
import {Post} from "@/app/blog/Post";

type PostRow = {
  id: number;
  title: string;
  author: string;
}

export default async function PostList({apiClient}: { apiClient: ApiClient }) {
  const posts = await apiClient.getAllPosts()
  const users = await apiClient.getAllUsers()

  const authorForPost = (post: Post) => users.find((user) => user.id === post.userId)?.name ?? ''

  const rowForPost = (post: Post) => ({
    id: post.id,
    title: post.title,
    author: authorForPost(post),
  })

  const postRows = posts.map(rowForPost)

  return (
    <ul>
      {
        postRows.map((row: PostRow) => <Row key={row.id} row={row} />)
      }
    </ul>
  )
}

function Row({row}: { row: PostRow }) {
  return (
    <li
      key={row.id}
      data-testid="post"
      className='mb-4'
    >
      <h1 className='font-bold'>{row.title}</h1>
      <p>{row.author}</p>
    </li>
  )
}
