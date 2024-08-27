import {render, screen} from "@testing-library/react";
import PostList from "@/app/blog/PostList";
import mockPosts from './mockPosts.json'
import mockUsers from './mockUsers.json'
import ApiClient from "@/app/blog/ApiClient";
import {Post} from "@/app/blog/Post";
import {User} from "@/app/blog/User";
import {act} from "react";

class MockApiClient implements ApiClient {
  getAllPosts = (): Promise<Post[]> => {
    return Promise.resolve(mockPosts);
  }

  getAllUsers = (): Promise<User[]> => {
    return Promise.resolve(mockUsers);
  }
}

describe('PostList', () => {
  beforeEach(async () => {
    await act(async () => render(<PostList apiClient={new MockApiClient()}/>))
  })

  describe('displaying posts', () => {
    it('displays a list of the title & author of each post', () => {
      const postListRows: HTMLLIElement[] = screen.getAllByTestId('post')
      expect(postListRows.length).toBe(4)

      const postRow1 = postListRows[0];
      expect(postRow1.innerHTML).toContain('Post title 1')
      expect(postRow1.innerHTML).toContain('Alice Awesome')

      const postRow2 = postListRows[1];
      expect(postRow2.innerHTML).toContain('Post title 2')
      expect(postRow2.innerHTML).toContain('Bob Builder')

      const postRow3 = postListRows[2];
      expect(postRow3.innerHTML).toContain('Post title 3')
      expect(postRow3.innerHTML).toContain('Alice Awesome')

      const postRow4 = postListRows[3];
      expect(postRow4.innerHTML).toContain('Post title 4')
      expect(postRow4.innerHTML).toContain('Clara Creative')
    })
  })
})
