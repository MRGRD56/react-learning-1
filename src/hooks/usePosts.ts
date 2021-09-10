import Post from "../models/Post";
import PostsCriteria from "../models/PostsCriteria";
import PostSortCriterion from "../models/PostSortCriterion";
import React, {useMemo, useState} from "react";

export default function usePosts(posts: Post[]): [PostsCriteria, React.Dispatch<React.SetStateAction<PostsCriteria>>, Post[], ] {
    const [criteria, setCriteria] = useState<PostsCriteria>({
        sortCriterion: PostSortCriterion.default,
        searchQuery: ""
    });

    function getSortedPosts(posts: Post[]): Post[] {
        let result = [...posts];
        switch (criteria.sortCriterion) {
            case PostSortCriterion.title:
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case PostSortCriterion.content:
                result.sort((a, b) => a.content.localeCompare(b.content));
                break;
            case PostSortCriterion.time:
                result.sort((a, b) => b.creationTime.diff(a.creationTime));
                break;
        }
        return result;
    }

    function getFilteredPosts(posts: Post[]): Post[] {
        const searchQuery = criteria.searchQuery.toLowerCase().trim();
        const isSearchQueryEmpty = !searchQuery;
        if (isSearchQueryEmpty) return posts;
        return posts.filter(p => {
            return p.title.toLowerCase().includes(searchQuery)
                || p.content.toLowerCase().includes(searchQuery);
        });
    }

    function getPostsByCriteria(): Post[] {
        const sortedPosts = getSortedPosts(posts);
        return getFilteredPosts(sortedPosts);
    }

    const displayablePosts = useMemo(() => getPostsByCriteria(),
        [posts, criteria.sortCriterion, criteria.searchQuery]);

    return [criteria, setCriteria, displayablePosts];
}