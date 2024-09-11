import ApiClient from "@/app/blog/ApiClient";
import {Post} from "@/app/blog/Post";
import {User} from "@/app/blog/User";
import Link from "next/link";

type PostRow = {
  id: number;
  title: string;
  author?: User;
}

export default async function PostList({apiClient}: { apiClient: ApiClient }) {
  const posts = await apiClient.getAllPosts()
  const users = await apiClient.getAllUsers()

  const authorForPost = (post: Post) => users.find((user) => user.id === post.userId)

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
      className='mb-4 w-2/3'
    >
      <h2 className='font-bold text-xl text-blue-500'><Link href={'/blog/' + row.id}>{row.title}</Link></h2>
      <p>by <Link className='text-blue-400' href={'/blog/authors/' + row.author?.id}>{row.author?.name}</Link></p>
    </li>
  )
}
