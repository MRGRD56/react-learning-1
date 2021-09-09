import React, {useEffect, useState} from 'react';
import Post from "../../models/Post";
import PostsList from "../PostsList/PostsList";
import PostInput from "../PostInput/PostInput";
import PostInputMode from "../../models/PostInputMode";
import PostData from "../../models/PostData";
import Modal from "../Modal/Modal";
import axios from "axios";
import FetchedPost from "../../models/FetchedPost";

function PostsContainer() {
    const postsKey = "posts";

    const [posts, _setPosts] = useState<Post[]>(loadPosts());
    const [newPostModalIsActive, setNewPostModalIsActive] = useState(false);

    function loadPosts(): Post[] {
        const postsJson = localStorage.getItem(postsKey);
        return postsJson != null
            ? Post.fromJson(postsJson) as Post[]
            : [];
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

    function onNewPostModalCancel(postData: PostData) {
        setNewPostModalIsActive(false);
    }

    async function fetchPosts(): Promise<Post[]> {
        const response = await axios.get<FetchedPost[]>("https://jsonplaceholder.typicode.com/posts");
        return response.data.map(x => Post.fromFetchedPost(x));
    }

    useEffect(() => {
        if (!posts.length) {
            fetchPosts().then(posts => {
                setPosts(posts);
            });
        }
    }, []);

    return (
        <div className="my-2">
            <Modal isActive={newPostModalIsActive} setIsActive={setNewPostModalIsActive}>
                <PostInput mode={PostInputMode.add} addPost={addPost} onCancel={onNewPostModalCancel}/>
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