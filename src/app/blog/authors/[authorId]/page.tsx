import AuthorProfile from "@/app/blog/authors/[authorId]/AuthorProfile";
import HttpApiClient from "@/app/blog/HttpApiClient";

export default function Page({params}: {params: {authorId: string}}) {
  const id = parseInt(params.authorId)

  return (
    <div>
      <h1>About the author</h1>
      <AuthorProfile apiClient={new HttpApiClient()} id={id} />
    </div>
  )
}
