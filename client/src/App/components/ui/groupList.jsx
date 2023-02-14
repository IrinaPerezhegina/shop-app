import React from "react";
import PropTypes from "prop-types";
import styles from "../../scss/components/groupList.module.scss";

const GroupList = ({ onItemSelect, category, selectedItem, onClearSelect }) => {
    return (
        <div className={styles.content__setupСategory}>
            <input
                className={
                    selectedItem === "ALL SNEAKERS"
                        ? styles.content__setupСategoryActive
                        : styles.content__setupСategoryInactive
                }
                key={"ALL SNEAKERS"}
                type={"button"}
                onClick={() => onItemSelect("ALL SNEAKERS")}
                value={"ALL SNEAKERS"}
            />
            {category.map((item) => (
                <input
                    className={
                        selectedItem === item
                            ? styles.content__setupСategoryActive
                            : styles.content__setupСategoryInactive
                    }
                    key={item}
                    type={"button"}
                    onClick={() => onItemSelect(item)}
                    value={item}
                />
            ))}
        </div>
    );
};

GroupList.propTypes = {
    onItemSelect: PropTypes.func,
    category: PropTypes.array,
    selectedItem: PropTypes.string,
    onClearSelect: PropTypes.func
};

export default GroupList;
