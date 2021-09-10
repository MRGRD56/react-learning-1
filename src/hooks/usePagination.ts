import {useMemo, useState} from "react";
import Pagination from "./models/Pagination";
import Range from "../models/Range";

export default function usePagination<T>(items: T[], initialPageItemsCount: number): Pagination<T> {
    const [_currentPage, setCurrentPage] = useState<number>(1);
    //const [items, setItems] = useState<T[]>(ite);
    const [pageItemsCount, setPageItemsCount] = useState(initialPageItemsCount);

    const pagesCount = useMemo(() => {
        return Math.ceil(items.length / pageItemsCount);
    }, [items, pageItemsCount]);

    const currentPage = useMemo(() => {
        return Math.min(_currentPage, pagesCount);
    }, [_currentPage, pagesCount]);

    const currentPageItemsIndexesRange = useMemo(() => {
        const from = (currentPage - 1) * pageItemsCount;
        return new Range(
            from,
            from + pageItemsCount - 1
        );
    }, [currentPage, pageItemsCount]);

    const currentPageItems = useMemo(() => {
        const range = currentPageItemsIndexesRange;
        return items.filter((item, index) => range.isNumberWithin(index));
    }, [currentPageItemsIndexesRange, items]);

    return {
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        pageItemsCount: pageItemsCount,
        setPageItemsCount: setPageItemsCount,
        pagesCount: pagesCount,
        currentPageItems: currentPageItems
    };
}