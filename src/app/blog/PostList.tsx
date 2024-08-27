'use client'

import ApiClient from "@/app/blog/ApiClient";
import {useEffect, useState} from "react";
import {Post} from "@/app/blog/Post";

type PostListProps = {
  apiClient: ApiClient,
}

type PostRow = {
  id: number;
  title: string;
  author: string;
}

export default function PostList({apiClient}: PostListProps) {
  const [postRows, setPostRows] = useState<PostRow[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const posts = await apiClient.getAllPosts()
      const users = await apiClient.getAllUsers()

      const authorForPost = (post: Post) => users.find((user) => user.id === post.userId)?.name ?? ''

      const rowForPost = (post: Post) => ({
        id: post.id,
        title: post.title,
        author: authorForPost(post),
      })

      setPostRows(posts.map(rowForPost))
    }
    fetchData()
  }, [])

  return (
    <ul>
      {
        postRows.map((row: PostRow) => <Row key={row.id} row={row} />)
      }
    </ul>
  )
}

type RowProps = {
  row: PostRow,
}

function Row({row}: RowProps) {
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
