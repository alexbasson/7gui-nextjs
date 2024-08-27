'use client'

import PostList from "@/app/blog/PostList";
import HttpApiClient from "@/app/blog/HttpApiClient";

export default function Page() {
  return (
    <PostList apiClient={new HttpApiClient()} />
  )
}
