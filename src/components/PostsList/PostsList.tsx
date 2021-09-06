import React from 'react';
import Post from "../../models/Post";
import PostComponent from "../PostComponent/PostComponent";

interface Props {
    posts: Post[]
}

function PostsList({posts, ...props}: Props) {
    return (
        <div>
            {posts.map(post => (
                <PostComponent post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default PostsList;