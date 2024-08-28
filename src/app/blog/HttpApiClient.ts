import ApiClient from "@/app/blog/ApiClient";
import { Post } from "./Post";
import { User } from "./User";

export default class HttpApiClient implements ApiClient {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getAllPosts = (): Promise<Post[]> =>  {
    return fetch(this.postUrl())
      .then(response => response.json())
  };

  getPost(id: number): Promise<Post> {
    return fetch(this.postUrl(id))
      .then(response => response.json())
  }

  getAllUsers = (): Promise<User[]> => {
    return fetch(this.userUrl())
      .then(response => response.json())
  };

  getUser(id: number): Promise<User> {
    return fetch(this.userUrl(id))
      .then(response => response.json())
  }

  private postUrl = (id?: number): string => {
    return this.baseUrl + '/posts' + (id ? '/' + id : '')
  }

  private userUrl = (id?: number): string => {
    return this.baseUrl + '/users' + (id ? '/' + id : '')
  }
}
