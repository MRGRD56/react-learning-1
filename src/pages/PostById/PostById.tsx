import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import JsonPlaceholder from "../../services/JsonPlaceholder";
import Post from "../../models/Post";
import PostComment from "../../models/PostComment";
import Loader from "../../components/UI/Loader/Loader";

function PostById() {
    const params = useParams<{id: string}>();

    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<PostComment[]>();

    const [fetchPost, isPostFetching, postFetchingError] = useFetching(async () => {
        const post = await JsonPlaceholder.getPost(+params.id);
        setPost(post);
    }, true);
    const [fetchComments, isCommentsFetching, commentsFetchingError] = useFetching(async () => {
        const comments = await JsonPlaceholder.getPostComments(+params.id);
        setComments(comments);
    }, true);

    useEffect(() => {
        fetchPost().then(() => {
            fetchComments();
        });
    }, []);

    return (
        <div className="mt-2">
            {postFetchingError && <div className="text-danger">{postFetchingError}</div>}
            {commentsFetchingError && <div className="text-danger">{commentsFetchingError}</div>}
            {isPostFetching
                ? <Loader/>
                : (
                    <div>
                        <div className="card">
                            <div className="card-header">{post?.title}</div>
                            <div>{post?.content}</div>
                        </div>
                        <hr/>
                        {isCommentsFetching
                            ? <Loader/>
                            : (
                                <div>
                                    <h3>Comments ({comments?.length})</h3>
                                    <div>
                                        {comments?.map(comment => (
                                            <div className="card mb-3">
                                                <b className="d-block">{comment.name}</b>
                                                <div>{comment.body}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                )}
        </div>
    );
}

export default PostById;