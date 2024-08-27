import {Post} from "@/app/blog/Post";
import {User} from "@/app/blog/User";

export default interface ApiClient {
  getAllPosts: () => Promise<Post[]>;
  getAllUsers: () => Promise<User[]>;
}
