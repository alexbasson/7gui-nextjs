import ApiClient from "@/app/blog/ApiClient";
import { Post } from "./Post";
import { User } from "./User";

export default class HttpApiClient implements ApiClient {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getAllPosts = (): Promise<Post[]> =>  {
    return fetch(this.baseUrl + '/posts')
      .then(response => response.json())
  };

  getAllUsers = (): Promise<User[]> => {
    return fetch(this.baseUrl + '/users')
      .then(response => response.json())
  };
}
