import React from "react";
import PropTypes from "prop-types";
import styles from "../../scss/components/sortSelect.module.scss";

const SortSelect = ({ value, options, onSort }) => {
    return (
        <select className={styles.sortSelect} value={value} onChange={onSort}>
            {options.map((option) => (
                <option
                    className={styles.option}
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

SortSelect.propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            sort: PropTypes.func.isRequired
        })
    ).isRequired,
    onSort: PropTypes.func.isRequired
};
export default SortSelect;
