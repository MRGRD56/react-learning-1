import React, {useState} from 'react';
import Post from "../../models/Post";
import PostsList from "../PostsList/PostsList";
import PostInput from "../PostInput/PostInput";
import PostInputMode from "../../models/PostInputMode";
import PostData from "../../models/PostData";

function PostsContainer() {
    const postsKey = "posts";

    const [posts, _setPosts] = useState<Post[]>(loadPosts());

    function loadPosts() {
        const fallbackValue = [
            new Post("JavaScript", "It's JavaScript language"),
            new Post("TypeScript",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet " +
                "aperiam blanditiis consequatur dolor dolores, doloribus enim in labore neque nisi " +
                "perferendis quidem quo ratione suscipit, voluptas, voluptatibus? Facilis, quod?")
        ];

        const postsJson = localStorage.getItem(postsKey);
        return postsJson != null
            ? JSON.parse(postsJson)
            : fallbackValue;
    }

    function setPosts(posts: Post[]) {
        _setPosts(posts);
        localStorage.setItem(postsKey, JSON.stringify(posts))
    }

    function addPost(postData: PostData) {
        const newPost = Post.fromPostData(postData);
        setPosts([...posts, newPost]);
    }

    function removePost(post: Post) {
        setPosts(posts.filter(p => p !== post));
    }

    return (
        <div className="my-2">
            <PostInput mode={PostInputMode.add} addPost={addPost}/>
            <PostsList posts={posts} removePost={removePost}/>
        </div>
    );
}

export default PostsContainer;