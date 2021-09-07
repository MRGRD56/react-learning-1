import React, {useMemo, useState} from 'react';
import Post from "../../models/Post";
import PostComponent from "../PostComponent/PostComponent";
import PostsCriteria from "../PostsCriteria/PostsCriteria";
import PostSortCriterion from "../../models/PostSortCriterion";
import * as stream from "stream";
import {strict} from "assert";

interface Props {
    posts: Post[],
    removePost: (post: Post) => void
}

function PostsList({posts, ...props}: Props) {
    function getSortedPosts(posts: Post[]): Post[] {
        let result = [...posts];
        switch (state.sortCriterion) {
            case PostSortCriterion.title:
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case PostSortCriterion.content:
                result.sort((a, b) => a.content.localeCompare(b.content));
                break;
        }
        return result;
    }

    function getFilteredPosts(posts: Post[]): Post[] {
        const searchQuery = state.searchQuery.toLowerCase().trim();
        const isSearchQueryEmpty = !searchQuery;
        if (isSearchQueryEmpty) return posts;
        return posts.filter(p => {
            return p.title.toLowerCase().includes(searchQuery)
                || p.content.toLowerCase().includes(searchQuery);
        });
    }

    function getPostsByCriteria(): Post[] {
        const sortedPosts = getSortedPosts(posts);
        const filteredPosts = getFilteredPosts(sortedPosts);
        return filteredPosts;
    }

    const [state, setState] = useState({
        sortCriterion: PostSortCriterion.default,
        searchQuery: ""
    });

    const displayablePosts = useMemo(() => getPostsByCriteria(),
        [posts, state.sortCriterion, state.searchQuery]);

    function onSort(sortCriterion: PostSortCriterion) {
        setState({
            ...state,
            sortCriterion: sortCriterion
        })
    }

    function onSearch(searchQuery: string) {
        setState({
            ...state,
            searchQuery: searchQuery
        });
    }

    return (
        <div>
            <PostsCriteria onSort={onSort} onSearch={onSearch}/>
            <div>
                {posts.length
                    ? (displayablePosts.length
                        ? displayablePosts.map(post => (
                            <PostComponent post={post} key={post.id} removePost={props.removePost}/>
                        ))
                        : (<div className="m-2 text-secondary">No posts found</div>))
                    : (
                        <div className="m-2 text-secondary">No posts</div>
                    )}
            </div>
        </div>
    );
}

export default PostsList;