export default function Page({params}: {params: {authorId: string}}) {
  return (
    <h1>author id: {params.authorId}</h1>
  )
}
