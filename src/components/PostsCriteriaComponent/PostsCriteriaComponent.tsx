import React from 'react';
import PostSortCriterion from "../../models/PostSortCriterion";

interface Props {
    defaultSortCriterion?: PostSortCriterion,
    onSort?: (sortCriterion: PostSortCriterion) => void,
    onSearch?: (searchQuery: string) => void
}

function PostsCriteriaComponent(props: Props) {
    return (
        <div className="d-flex justify-content-between mb-2">
            <div>
                <input placeholder="Search..." onChange={e => props.onSearch?.(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="posts-sort-select">Sort by</label>
                <select id="posts-sort-select" className="mx-1"
                        defaultValue={props.defaultSortCriterion ?? PostSortCriterion.default}
                        onChange={e =>props.onSort?.(+e.target.value)}>
                    <option value={PostSortCriterion.default}>Default</option>
                    <option value={PostSortCriterion.title}>Title</option>
                    <option value={PostSortCriterion.content}>Content</option>
                    <option value={PostSortCriterion.time}>Creation time</option>
                </select>
            </div>
        </div>
    );
}

export default PostsCriteriaComponent;