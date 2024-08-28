export default function Page({ params }: { params: {blogId: string}}) {
  return (
    <h1>blog post id: {params.blogId}</h1>
  )
}
