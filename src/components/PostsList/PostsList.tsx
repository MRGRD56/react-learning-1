import React from 'react';
import Post from "../../models/Post";
import PostComponent from "../PostComponent/PostComponent";
import PostsCriteriaComponent from "../PostsCriteriaComponent/PostsCriteriaComponent";
import PostSortCriterion from "../../models/PostSortCriterion";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./PostsList.scss";
import usePosts from "../../hooks/usePosts";
import PagesNavigator from "../PagesNavigator/PagesNavigator";
import usePagination from "../../hooks/usePagination";

interface Props {
    posts: Post[],
    removePost: (post: Post) => void
}

function PostsList({posts, ...props}: Props) {
    const [criteria, setCriteria, displayablePosts] = usePosts(posts);
    const pagination = usePagination(displayablePosts, 10);

    function onSort(sortCriterion: PostSortCriterion) {
        setCriteria({
            ...criteria,
            sortCriterion: sortCriterion
        })
    }

    function onSearch(searchQuery: string) {
        setCriteria({
            ...criteria,
            searchQuery: searchQuery
        });
    }

    return (
        <div>
            <PostsCriteriaComponent onSort={onSort} onSearch={onSearch}/>
            <div>
                {posts.length
                    ? (displayablePosts.length
                        ? (
                            <div className="d-flex flex-column">
                                <TransitionGroup>
                                    {pagination.currentPageItems.map(post => (
                                        <CSSTransition key={post.id} timeout={200} classNames="post">
                                            <PostComponent post={post} removePost={props.removePost}/>
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                                <div className="align-self-center">
                                    <PagesNavigator pagination={pagination}/>
                                </div>
                            </div>
                        )
                        : (<div className="m-2 text-secondary">No posts found</div>))
                    : (
                        <div className="m-2 text-secondary">No posts</div>
                    )}
            </div>
        </div>
    );
}

export default PostsList;