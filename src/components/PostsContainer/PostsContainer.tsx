import React, {useState} from 'react';
import Post from "../../models/Post";
import PostsList from "../PostsList/PostsList";
import PostInput from "../PostInput/PostInput";
import PostInputMode from "../../models/PostInputMode";

function PostsContainer(props: {}) {
    const [posts, setPosts] = useState<Post[]>([
        new Post("JavaScript", "It's JavaScript language"),
        new Post("TypeScript",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet " +
            "aperiam blanditiis consequatur dolor dolores, doloribus enim in labore neque nisi " +
            "perferendis quidem quo ratione suscipit, voluptas, voluptatibus? Facilis, quod?")
    ]);

    return (
        <div className="my-2">
            <PostInput mode={PostInputMode.edit}/>
            <PostsList posts={posts}/>
        </div>
    );
}

export default PostsContainer;