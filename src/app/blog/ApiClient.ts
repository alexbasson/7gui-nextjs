import {Post} from "@/app/blog/Post";
import {User} from "@/app/blog/User";

export default interface ApiClient {
  getAllPosts: () => Promise<Post[]>;
  getPost(id: number): Promise<Post>;
  getAllUsers: () => Promise<User[]>;
  getUser(id: number): Promise<User>;
}
