import MockApiClient from "@/app/blog/MockApiClient";
import {render, screen} from "@testing-library/react";
import AuthorProfile from "@/app/blog/authors/[authorId]/AuthorProfile";

describe('AuthorProfile', () => {
  beforeEach(async () => {
    render(await AuthorProfile({apiClient: new MockApiClient(), id: 1}));
  })

  it('displays author detail information', () => {
    expect(screen.getByText('Alice Awesome')).toBeInTheDocument()
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument()
  })
})
