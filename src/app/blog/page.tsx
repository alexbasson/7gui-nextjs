import PostList from "@/app/blog/PostList";
import HttpApiClient from "@/app/blog/HttpApiClient";

export default function Page() {
  return (
    <div>
      <h1 className='text-5xl mb-8'>Blog</h1>
      <PostList apiClient={new HttpApiClient()} />
    </div>
  )
}
