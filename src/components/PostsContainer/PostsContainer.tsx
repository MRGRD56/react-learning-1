import React, {useState} from 'react';
import Post from "../../models/Post";
import PostsList from "../PostsList/PostsList";
import PostInput from "../PostInput/PostInput";
import PostInputMode from "../../models/PostInputMode";
import PostData from "../../models/PostData";
import Modal from "../Modal/Modal";

function PostsContainer() {
    const postsKey = "posts";

    const [posts, _setPosts] = useState<Post[]>(loadPosts());
    const [newPostModalIsActive, setNewPostModalIsActive] = useState(false);

    function loadPosts(): Post[] {
        const fallbackValue = [
            new Post("JavaScript", "It's JavaScript language"),
            new Post("TypeScript",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet " +
                "aperiam blanditiis consequatur dolor dolores, doloribus enim in labore neque nisi " +
                "perferendis quidem quo ratione suscipit, voluptas, voluptatibus? Facilis, quod?")
        ];

        const postsJson = localStorage.getItem(postsKey);
        return postsJson != null
            ? Post.fromJson(postsJson) as Post[]
            : fallbackValue;
    }

    function setPosts(posts: Post[]) {
        _setPosts(posts);
        localStorage.setItem(postsKey, JSON.stringify(posts))
    }

    function addPost(postData: PostData) {
        const newPost = Post.fromPostData(postData);
        setPosts([...posts, newPost]);
        setNewPostModalIsActive(false);
    }

    function removePost(post: Post) {
        setPosts(posts.filter(p => p !== post));
    }

    return (
        <div className="my-2">
            <Modal isActive={newPostModalIsActive} setIsActive={setNewPostModalIsActive}>
                <PostInput mode={PostInputMode.add} addPost={addPost}/>
            </Modal>
            <div>
                <button className="btn btn-outline-primary mb-2" onClick={() => setNewPostModalIsActive(true)}>
                    NEW POST
                </button>
            </div>
            <PostsList posts={posts} removePost={removePost}/>
        </div>
    );
}

export default PostsContainer;