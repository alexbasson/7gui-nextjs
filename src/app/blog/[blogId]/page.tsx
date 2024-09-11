import HttpApiClient from "@/app/blog/HttpApiClient";

export default async function Page({ params }: { params: {blogId: string}}) {
  const apiClient = new HttpApiClient()

  const id = parseInt(params.blogId)
  const post = await apiClient.getPost(id)

  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}
