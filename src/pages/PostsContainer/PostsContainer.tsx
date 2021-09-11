import React, {useEffect, useRef, useState} from 'react';
import Post from "../../models/Post";
import PostsList from "../../components/PostsList/PostsList";
import PostInput from "../../components/PostInput/PostInput";
import PostInputMode from "../../models/PostInputMode";
import PostData from "../../models/PostData";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import useFetching from "../../hooks/useFetching";
import JsonPlaceholder from "../../services/JsonPlaceholder";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

function PostsContainer() {
    const postsKey = "posts";

    const [posts, _setPosts] = useState<Post[]>(loadPosts());
    const [newPostModalIsActive, setNewPostModalIsActive] = useState(false);
    // const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [setFetchedPosts, isPostsLoading] = useFetching(async () => {
        const fetchedPosts = await JsonPlaceholder.getPosts();
        setPosts(fetchedPosts);
    });
    const bottomIntersectionDiv = useRef<HTMLDivElement>(null);
    useIntersectionObserver(bottomIntersectionDiv, entry => {
        console.log("LOAD MORE ITEMS");
    });

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

    useEffect(() => {
        if (!posts.length) {
            setFetchedPosts()
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
            {
                isPostsLoading
                    ? <Loader/>
                    : (
                        <div>
                            <PostsList posts={posts} removePost={removePost}/>
                            <div ref={bottomIntersectionDiv}/>
                        </div>
                    )
            }
        </div>
    );
}

export default PostsContainer;
