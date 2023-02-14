import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import styles from "./Paginate.module.scss";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className={styles.paginateWrapper}>
                {pages.map((page) => (
                    <li
                        className={
                            page === currentPage
                                ? styles.paginateWrapper__active
                                : styles.paginateWrapper
                        }
                        key={"page_" + page}
                    >
                        <button
                            className={styles.paginateWrapper}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
