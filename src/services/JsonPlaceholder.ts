import Post from "../models/Post";
import axios from "axios";
import FetchedPost from "../models/FetchedPost";
import PostComment from "../models/PostComment";

export default abstract class JsonPlaceholder {
    static async getPosts(): Promise<Post[]> {
        const response = await axios.get<FetchedPost[]>("https://jsonplaceholder.typicode.com/posts");
        return response.data.map(x => Post.fromFetchedPost(x));
    }

    static async getPost(id: number): Promise<Post> {
        const response = await axios.get<FetchedPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return Post.fromFetchedPost(response.data);
    }

    static async getPostComments(id: number): Promise<PostComment[]> {
        const response = await axios.get<PostComment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response.data;
    }
}
