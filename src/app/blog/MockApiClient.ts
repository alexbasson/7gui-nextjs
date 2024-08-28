import ApiClient from "@/app/blog/ApiClient";
import {Post} from "@/app/blog/Post";
import mockPosts from "@/app/blog/mockPosts.json";
import {User} from "@/app/blog/User";
import mockUsers from "@/app/blog/mockUsers.json";

export default class MockApiClient implements ApiClient {
  getAllPosts = (): Promise<Post[]> => {
    return Promise.resolve(mockPosts);
  }

  getPost = (id: number): Promise<Post> => {
    return Promise.resolve(mockPosts[id - 1]);
  }

  getAllUsers = (): Promise<User[]> => {
    return Promise.resolve(mockUsers);
  }

  getUser(id: number): Promise<User> {
    return Promise.resolve(mockUsers[id - 1]);
  }
}
