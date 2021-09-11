import React, {useMemo} from 'react';
import Pagination from "../../hooks/models/Pagination";
import {classes} from "mg-values";

interface Props<T> {
    pagination: Pagination<T>
}

function PagesNavigator<T>({pagination, ...props}: Props<T>) {
    const pagesNumbers = useMemo(() => {
        const pages = [];
        for (let page = 1; page <= pagination.pagesCount; page++) {
            pages.push(page);
        }
        return pages;
    }, [pagination.pagesCount]);

    return (
        <div className="d-flex flex-wrap">
            {pagesNumbers.map(page => (
                <button key={page} className={classes({
                    "btn-outline-primary": page === pagination.currentPage,
                    "btn-outline-secondary": page !== pagination.currentPage
                }, "btn")} onClick={() => pagination.setCurrentPage(page)}>
                    {page}
                </button>
            ))}
        </div>
    );
}

export default PagesNavigator;
