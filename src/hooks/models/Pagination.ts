import React from "react";

export default interface Pagination<T> {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

    // items: T[];
    // setItems: React.Dispatch<React.SetStateAction<T[]>>;

    pageItemsCount: number;
    setPageItemsCount: React.Dispatch<React.SetStateAction<number>>;

    pagesCount: number;

    currentPageItems: T[];
}