import React from 'react';
import Post from "../../models/Post";
import "./PostComponent.scss";
import moment from "moment";

interface Props {
    post: Post,
    removePost: (post: Post) => void
}

function PostComponent({post, ...props}: Props) {
    return (
        <div className="card mb-2 post-card">
            <div className="d-flex w-100">
                <div className="w-100 position-relative">
                    <div className="d-flex justify-content-between">
                        <div className="card-header">{post.title}</div>
                        <div className="d-flex text-secondary toolbar">
                            <button className="material-icons m-1 p-0 post-delete-button">edit</button>
                            <button className="material-icons m-1 p-0 post-delete-button"
                                    onClick={() => props.removePost(post)}>
                                close
                            </button>
                        </div>
                    </div>
                    <div>
                        {post.content}
                    </div>
                    <div className="post-time">
                        {post.creationTime.fromNow()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostComponent;