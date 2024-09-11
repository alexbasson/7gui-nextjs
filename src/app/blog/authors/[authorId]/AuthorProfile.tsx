import ApiClient from "@/app/blog/ApiClient";

export default async function AuthorProfile({apiClient, id}: {apiClient: ApiClient, id: number}) {
  const author = await apiClient.getUser(id)

  return (
    <div>
      <p>{author.name}</p>
      <p>{author.email}</p>
      <p>{author.phone}</p>
      <p>{author.website}</p>
    </div>
  )
}
